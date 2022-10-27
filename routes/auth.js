const router = express.Router();//creates route
//get- for fetch data geting data
//post - for submiting smth 



//@route  Get api/auth 
// @desc  get logged in user
// access   Private

router.get('/', (req, res) => {
  res.send('Get logged in user')
})

//@route  Post api/auth 
// @desc  Auth user get token
// access   public

router.post('/', (req, res) => {
  res.send('Log in user')
})
module.exports = router;