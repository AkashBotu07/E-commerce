const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');

router.get('/',async(req, res)=>{
    const categoryList=await Category.find();           //await is a keyword 

    if(!categoryList){
      res.status(500).json({sucess: false});
    }
    res.status(200).send(categoryList);
});

router.get('/:Id',async(req, res)=>{
  const category = await Category.findById(req.params.Id);

  if(!category){
    res.status(500).json({message:'the category with the given id is not found'})
  } res.status(200).send(category);
});


router.post('/',async(req,res)=>{
  let category = new Category({
    name:req.body.name,
    icon:req.body.icon,
    color:req.body.color
  })
  category = await category.save();

  if(!category){
    return res.status(404).send('the category cannot be created');
  }
  res.send(category);
})


router.put('/:Id',async(req,res)=>{
  const category = await Category.findByIdAndUpdate(req.params.Id,{
      name: req.body.name,
      icon:req.body.icon,
      color:req.body.color
    },
    {new:true}           // it is written because in nodejs we get the old data
  )
  if(!category){
    return res.status(404).send('the category cannot be updated');
  }
  res.send(category);
})

router.delete('/:categoryId',(req,res)=>{
  Category.findByIdAndRemove(req.params.categoryId).then(category=>{
    if(category){
      return res.status(200).json({success:true,message:'the category is deleted'})
    }
    else{
      return res.status(404).json({success:false,message:'category not found'})
    }
  }).catch(err=>{
    return res.status(400).json({success:false,error:err})
  })
})

module.exports=router;