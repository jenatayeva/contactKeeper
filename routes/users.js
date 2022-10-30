const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();//creates route
//get- for fetch data geting data
//post - for submiting smth 
const User = require('../modules/User')

// router.get('/', (req, res) => {
//   res.send('HELLO FROM USERS API')
// })

//@route  POST api/users 
// @desc  Register a user
// access   Public

router.post('/',[
  body('name', 'Please add name').not().isEmpty(),
  body('email', 'Please Include a valid emil').isEmail(),
  body('password', 'Please Enter a password with 6 or more charecters').isLength({min: 6})
], async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const {name, email, password} = req.body
  try {
    let user = await User.findOne({email});

    if(user){
      return res.status(400).json({msg:'User is already exist'});
    }

    user = new User({
      name,
      email, 
      password
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err;
      res.json ({token})
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})
module.exports = router;