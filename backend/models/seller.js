const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
      },
      
    description: {
        type: String,
        required:true
      },
    imageurls:[{
        type: String,
        default:''
      }],
    brand:{
        type: String,
        default:''
      },
    price:{
        type: Number,
        default:0
      },
    quantity:{
        type:Number,
        required: true,
        min:0,
        max:250
      },
    dateCreated:{
        type:Date,
        default:Date.now
      }
    })

sellerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

sellerSchema.set('toJSON', { virtuals: true });


exports.Seller = mongoose.model('seller', sellerSchema);
exports.SellerSchema = sellerSchema;
 