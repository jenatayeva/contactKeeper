const express = require('express');

const router = express.Router();//creates route
//get- for fetch data geting data
//post - for submiting smth 

// router.get('/', (req, res) => {
//   res.send('HELLO FROM USERS API')
// })

//@route  POST api/users 
// @desc  Register a user
// access   Public

router.post('/', (req, res) => {
  res.send('Register a user')
})
module.exports = router;