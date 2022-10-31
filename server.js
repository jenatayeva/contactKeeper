const express = require('express');
const users = require('./routes/users');
const contacts = require('./routes/contacts');
const auth = require('./routes/auth');
const connectDB =  require('./config/db')
const app = express();
const cors = require('cors');
const path = require('path')

app.use(cors()) // Use this after the variable declaration

connectDB();

//Init Middleware
app.use(express.json({ extended: false }))

// //Define Routes
// app.use('/api/users', require('./routes/users'));
// app.use('/api/contacts', require('./routes/contacts'));
// app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', users);
app.use('/api/contacts', contacts);
app.use('/api/auth', auth);

//Serve static assets in production
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`)); 
