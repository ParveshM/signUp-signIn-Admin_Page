const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const nocache=require('nocache')


// DATABASE-------
mongoose.connect("mongodb://127.0.0.1:27017/signup");
let db=mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.log(err);
});
//------------------
app.use(express.static('public'));

// for userRoute
app.use('/',userRoute)

// for adminRoute--
app.use('/admin',adminRoute)


app.use(nocache())

// Server-->
app.listen(3000, () =>{
    console.log(`Server Started on http://localhost:3000`)})