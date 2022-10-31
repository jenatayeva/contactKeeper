const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../modules/User')
const Contact = require('../modules/contact')
const Auth = require('../middleware/auth');
const contact = require('../modules/contact');

const router = express.Router();//creates route

//get- for fetch data geting data
//post - for submiting smth 

// router.get('/', (req, res) => {
//   res.send('HELLO FROM USERS API')
// })

//@route  GET api/contacts 
// @desc  Get all users contacts
// access   Private

router.get('/', Auth, async(req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({ date: -1})
    res.json(contacts)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error')
  }
})

//@route  POST api/contacts/ 
// @desc  Add new contacts
// access   Private
 
router.post('/', [Auth, [
  body('name', 'name is requiere').not().isEmpty()
]],async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {name, email, phone, type} = req.body;
  try {
    const newContact = new Contact({
      name,
      email, 
      phone,
      type, 
      user: req.user.id
    })
    const contact = await newContact.save();
    res.json(contact)
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server error ')
  }
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
 
router.delete('/:id', (req, res) => {
  res.send('Delete contact')
})
module.exports = router;