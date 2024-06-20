const mongoose = require('mongoose');

//for the mongoose  to know about the structures of rows and column
const productSchema = mongoose.Schema({
    name:{
      type:String,
      required: true
    },
    
    description: {
      type: String,
      required:true
    },
    richDescription:{
      type: String,
      default:''
    },
    imageurl:{
      type: String,
      default:''
    },
    brand:{
      type: String,
      default:''
    },
    price:{
      type: Number,
      default:0
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to the Category model,
      required: true
    },
    quantity:{
      type:Number,
      required: true,
      min:0,
      max:250
    },
    isFeatured:{
      type:Boolean,
      default:false
    },
    dateCreated:{
      type:Date,
      default:Date.now
    }

  },{strict:false})


  productSchema.virtual('id').get(function () {
    return this._id.toHexString();
  });
  
  productSchema.set('toJSON', { virtuals: true });
//it is a model of nodejs to create the collections
exports.Product = mongoose.model('Product',productSchema);