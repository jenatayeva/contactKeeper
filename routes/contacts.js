const express = require('express');

const router = express.Router();//creates route
//get- for fetch data geting data
//post - for submiting smth 

// router.get('/', (req, res) => {
//   res.send('HELLO FROM USERS API')
// })

//@route  GET api/contacts 
// @desc  Get all users contacts
// access   Private

router.get('/', (req, res) => {
  res.send('Get all users contacts')
})

//@route  POST api/contacts/ 
// @desc  Add new contacts
// access   Private
 
router.post('/', (req, res) => {
  res.send('Add contact')
})

//@route  POST api/contacts/:id 
// @desc  Update contact
// access   Private
 
router.put('/:id', (req, res) => {
  res.send('Update contact')
})

//@route  POST api/contacts/:id 
// @desc  Delete contact
// access   Private
 
router.put('/:id', (req, res) => {
  res.send('Delete contact')
})
module.exports = router;