//middle ware just the funcion that access to req and res cycle
//chech the token in the header
const jwt = require('jsonwebtoken');
const config = require('config');

//next- move on what is next to the mdwe
module.exports = function(req, res, next){
  //Get the token from header
  const token = req.header('x-auth-token')//key to take token

  //check if no token
  if(!token){
    return res.status(401).json({ msg: 'No Token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({msg: 'Token is not valid'})
  }
}