const express = require('express');
const router = express.Router();//creates route
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
//get- for fetch data geting data
//post - for submiting smth 
const User = require('../modules/User');
const Auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');


//get- for fetch data geting data
//post - for submiting smth 
//@route  Get api/auth 
// @desc  get logged in user
// access   Private

router.get('/', Auth, async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error')
  }
})



//@route  Post api/auth 
// @desc  Auth user get token
// access   public
router.post('/',[
  body('email', 'Please include a valid emial').isEmail(),
  body('password', 'Password is required').exists()
] ,async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});

    if(!user){
      return res.status(400).json({ msg: 'Invalid Credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({
        msg: 'Invalid Credentials'
      })
    }
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err;
      console.log({ token })
      return res.status(200).json({ token })
    })
  } catch (err) {
    return res.status(500).send('server error')
  }
})


module.exports = router;