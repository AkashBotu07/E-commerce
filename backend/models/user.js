const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    image:{
        type:String,
        default:''
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number, // Fixed the typo here
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    country: {
        type: String, // Changed the type to String if it's meant for string values
        default: ''
    }
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', { virtuals: true });


exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
