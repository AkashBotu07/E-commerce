const mongoose = require('mongoose');
const { route } = require('../routers/products');

//for the mongoose  to know about the structures of rows and column
const categorySchema = mongoose.Schema({
    name:{
      type:String,
      required: true
    },
    icon:{
      type:String
    },
    color:{
      type:String
    }
  })

//it is a model of nodejs to create the collections
exports.Category = mongoose.model('Category',categorySchema);