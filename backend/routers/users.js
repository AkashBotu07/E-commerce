const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/',async(req, res)=>{
    const userList=await User.find().select('-password');           //await is a keyword , .select is used to sselect a particluar attribute,('-password') will hide the password
    if(!userList){
      res.status(500).json({sucess: false});
    }
    res.status(200).send(userList);
});

router.get('/:Id',async(req, res)=>{
  const user = await User.findById(req.params.Id).select('-password');

  if(!user){
    res.status(500).json({message:'the user with the given id is not found'})
  } res.status(200).send(user);
});

router.post('/', async (req, res) => {
    let user = new User({
      image:req.body.image,
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        isSeller:req.body.isSeller,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country
    });
console.log(user)
    user = await user.save();

    if (!user) {
        return res.status(404).send('The user cannot be created');
    }

    res.send(user);
});

router.put('/:id',async (req, res)=> {

  const userExist = await User.findById(req.params.id);
  let newPassword
  if(req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10)
  } else {
      newPassword = userExist.password;
  }

  const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        image:req.body.image,
          name: req.body.name,
          email: req.body.email,
          password: newPassword,
          phone: req.body.phone,
          isAdmin: req.body.isAdmin,
          isSeller:req.body.isSeller,
          street: req.body.street,
          apartment: req.body.apartment,
          zip: req.body.zip,
          city: req.body.city,
          country: req.body.country,
      },
      { new: true}
  )

  if(!user)
  return res.status(400).send('the user cannot be created!')

  res.send(user);
})


//login

router.post('/login', async(req,res)=>{
  const user = await User.findOne({email: req.body.email})
  const secret = process.env.secret;

  if(!user )
  {
    return res.status(400).send('the user not found')
  }

  if(user && bcrypt.compareSync(req.body.password,user.password))
  {
    const token = jwt.sign(
      {
        userId:user.id,
        isAdmin:user.isAdmin
      },
      secret
    )

    res.status(200).send({user:user.email,token:token,isAdmin:user.isAdmin,isSeller:user.isSeller,user})
  }
  else
  {
    res.status(400).send('password is wrong')
  }

})


router.post('/register', async (req, res) => {
  const email = req.body.email;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      // Email is already in use, send a message indicating that
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Create a new user since the email doesn't exist
    let user = new User({
      image:req.body.image,
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      isSeller: req.body.isSeller,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });

    user = await user.save();

    if (!user) {
      return res.status(400).send('The user cannot be created!');
    }

    res.send(user);
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).send('Internal server error');
  }
});




router.delete('/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id).then(user =>{
      if(user) {
          return res.status(200).json({success: true, message: 'the user is deleted!'})
      } else {
          return res.status(404).json({success: false , message: "user not found!"})
      }
  }).catch(err=>{
     return res.status(500).json({success: false, error: err}) 
  })
})

router.get('/get/count', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ success: true, count: userCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});




module.exports = router;