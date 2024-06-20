const express = require('express');
const router = express.Router();
const { Seller } = require('../models/seller');
const mongoose = require('mongoose');
const multer = require('multer')
const authJwt = require('../helper/jwt');
const { User } = require('../models/user');
const secret = process.env.secret;

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
  
        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})
  
const uploadOptions = multer({ storage: storage })
  
router.get('/', async (req, res) => {

    try {
      const sellerList = await Seller.find();
      
      if (!sellerList) {
        res.status(404).json({ success: false, message: 'No seller found' });
      }
      res.send(sellerList);
      }
    catch (err) {
      res.status(500).json({ success: false, message: err.name });
    }
});

router.get('/:Id',async(req, res)=>{
    const seller = await Seller.findById(req.params.Id).select('-password');
  
    if(!seller){
      res.status(500).json({message:'the seller with the given id is not found'})
    } res.status(200).send(seller);
});


router.post('/', uploadOptions.array('imageurls', 10), async (req, res) => {
  try {
      if (!req.files || req.files.length === 0) {
          return res.status(400).send('No files were uploaded.');
      }

      const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
      const imagesPaths = req.files.map(file => `${basePath}${file.filename}`);

      const seller = new Seller({
          name: req.body.name,
          description: req.body.description,
          imageurls: imagesPaths, // Save as an array of strings
          brand: req.body.brand,
          price: req.body.price,
          quantity: req.body.quantity,
          dateCreated: req.body.dateCreated,
      });

      const savedSeller = await seller.save();

      if (!savedSeller) {
          return res.status(400).send('The seller could not be created.');
      }

      res.status(200).send(savedSeller);
  } catch (error) {
      console.error(error);
      res.status(500).send(`Error creating seller: ${error.message}`);
  }
});

router.delete('/:Id',(req,res)=>{
  Seller.findByIdAndRemove(req.params.Id).then(seller=>{
    if(seller){
      return res.status(200).json({success:true,message:'the seller is deleted'})
    }
    else{
      return res.status(404).json({success:false,message:'seller not found'})
    }
  }).catch(err=>{
    return res.status(400).json({success:false,error:err})
  })
})




module.exports = router;