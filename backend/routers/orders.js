const express = require('express');
const router = express.Router();
const {Order} = require('../models/order');
const {OrderItem} = require('../models/order-item')

router.get('/', async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate('user', 'name')
      .sort('dateOrdered')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          populate: 'category'
        }
      });

    if (!orderList || orderList.length === 0) {
      return res.status(400).json({ success: false, message: 'No orders found' });
    }

    res.send(orderList);
  } catch (err) {
    console.error('Error:', err); // Log the error for debugging purposes
    res.status(500).json({ success: false, message: err.message  });
  }
});

router.get('/:Id',async(req, res)=>{
  try{
    const order=await Order.findById(req.params.Id).populate('user','name').populate({path:'orderItems',populate:{path:'product',populate:'category'}});           //await is a keyword 

    if(!order){
      res.status(400).json({sucess: false,message:'no order available'});
    }
    res.send(order);
  }
  catch (err) {
      res.status(500).json({ success: false, message: err.name });
    }
});


router.post('/', async (req, res) => {
  try {
    const orderItemsIds = await Promise.all(req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product
      });

      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    }));

    // Ensure that orderItemsIds is an array of resolved IDs before assigning it to order
    const resolvedOrderItemsIds = await Promise.all(orderItemsIds);
    const totalPrices = await Promise.all(resolvedOrderItemsIds.map(async (orderItemsIds)=>{
      const orderItem = await OrderItem.findById(orderItemsIds).populate('product','price');
      const totalPrice= orderItem.product.price * orderItem.quantity;
      return totalPrice
    })) 
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    console.log(totalPrice);


    let order = new Order({
      orderItems: resolvedOrderItemsIds, // Assign the resolved IDs
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice:totalPrice,
      user: req.body.user
    });

    order = await order.save();

    if (!order) {
      return res.status(404).send('The order cannot be created');
    }

    res.send(order);
  } catch (error) {
    console.error('Error in order creation:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:Id',async(req,res)=>{
  const order = await Order.findByIdAndUpdate(req.params.Id,{
      status: req.body.status
    },
    {new:true}           // it is written because in nodejs we get the old data
  )
  if(!order){
    return res.status(404).send('the order cannot be updated');
  }
  res.send(order);
})

router.delete('/:id', (req, res)=>{
  Order.findByIdAndRemove(req.params.id).then(async order =>{
      if(order) {
          await order.orderItems.map(async orderItem => {
              await OrderItem.findByIdAndRemove(orderItem)
          })
          return res.status(200).json({success: true, message: 'the order is deleted!'})
      } else {
          return res.status(404).json({success: false , message: "order not found!"})
      }
  }).catch(err=>{
     return res.status(500).json({success: false, error: err}) 
  })
})



//admin to know about the sales etc..

router.get('/get/totalsales', async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ]);

    if (totalSales.length === 0) {
      return res.status(400).send('No order sales found');
    }

    res.send({ totalsales: totalSales.pop().totalsales });
  } catch (err) {
    return res.status(500).send('Error fetching total sales');
  }
});


router.get('/get/count', async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();
    res.json({ success: true, count: orderCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const mongoose = require('mongoose');

router.get(`/get/userorders/:userid`, async (req, res) => {
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.userid);
    if (!isValidObjectId) {
      return res.status(400).json({ success: false, message: 'Invalid user ID.' });
    }

    const userOrderList = await Order.find({ user: req.params.userid })
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          populate: {
            path: 'category'
          }
        }
      })
      .sort({ 'dateOrdered': -1 });

    if (userOrderList.length === 0) {
      return res.status(404).json({ success: false, message: 'No orders found for the user.' });
    }

    res.send(userOrderList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports=router;