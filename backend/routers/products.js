const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');
const {Category} = require("../models/category");
const mongoose = require('mongoose')
const multer = require('multer')



// for get request
router.get('/', async (req, res) => {

  try {
    const productList = await Product.find().populate('category');
    
    if (!productList) {
      res.status(404).json({ success: false, message: 'No products found' });
    }
    res.send(productList);
    }
  catch (err) {
    res.status(500).json({ success: false, message: err.name });
  }
});

//FOR search of single instance
router.get('/:Id',async(req, res)=>{
  let product=await Product.findById(req.params.Id);       //await is a keyword 
  const categoryid= product.category.toString();
  const category = await Category.findById(categoryid);
  product.category = category;
  if(!product){
    res.status(400).json({sucess: false});
  }
  
  res.send(product);
});
// for post request
// Your route handler for the POST request
router.post(`/`,  async (req, res) =>{
const category = await Category.findById(req.body.category);
if(!category) return res.status(400).send('invalid category')
const file = req.file;

let product = new Product({
  name: req.body.name,
  description:req.body.description,
  richDescription:req.body.richDescription,
  imageurl:req.body.imageurl,
  brand: req.body.brand,
  price: req.body.price,
  category: req.body.category,
  quantity: req.body.quantity,
  isFeatured: req.body.isFeatured,
  dateCreated: req.body.dateCreated
});

product = await product.save();

if(!product)  
return res.status(500).send('the product cannto be created')  ;

res.send(product);

});


// for update request
router.put('/:Id',async(req,res)=>{
  if(!mongoose.isValidObjectId(req.params.Id)){
    res.status(400).send('invalid product id')
  }

  const category = await Category.findById(req.body.category);
 if(!category) return res.status(400).send('invalid category')


  const product = await Product.findByIdAndUpdate(req.params.Id,{
    name: req.body.name,
    description:req.body.description,
    richDescription:req.body.richDescription,
    imageurl:req.body.imageurl,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    quantity: req.body.quantity,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated
    },
    {new:true}           // it is written because in nodejs we get the old data
  )
  if(!product){
    return res.status(500).send('the product cannot be updated');
  }
  res.send(product);
});


router.delete('/:Id',(req,res)=>{
  Product.findByIdAndRemove(req.params.Id).then(product=>{
    if(product){
      return res.status(200).json({success:true,message:'the product is deleted'})
    }
    else{
      return res.status(404).json({success:false,message:'product not found'})
    }
  }).catch(err=>{
    return res.status(400).json({success:false,error:err})
  })
})

// to get count the no of documents
router.get('/get/count', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.json({ success: true, count: productCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// isFeatured that means it is recomended to homepage
router.put('/change-image/:id',  async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid product ID');
  }

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid category');

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { new: true }
    );

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.send(product);
  } catch (error) {
    return res.status(500).send('Error updating product image');
  }
});





module.exports=router;