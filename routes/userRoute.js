const express = require('express')
const userController = require('../controllers/userController')
const bodyParser = require('body-parser')
const userRoute = express()
const logger = require('morgan')
const session = require('express-session')
const config  = require('../config/config')
const auth = require('../middlewares/auth')
const nocache = require('nocache')

// using---
userRoute.use(logger('dev'))
userRoute.use(bodyParser.json())
userRoute.use(bodyParser.urlencoded({extended:true}))
userRoute.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:true
}))
userRoute.use(nocache())

// setting ---
userRoute.set('view engine','ejs')
userRoute.set('views','./views/users')

// Routes for Users---
userRoute.get('/register',auth.isLogout,userController.loadRegister)
userRoute.post('/register',userController.insertUser)

userRoute.get('/',auth.isLogout,userController.loadLogin)
userRoute.get('/login',auth.isLogout,userController.loadLogin);
userRoute.post('/login',auth.isLogout,userController.verifyLogin)
userRoute.get('/home',auth.isLogin,userController.loadHome)
userRoute.get('/logout',auth.isLogin,userController.userLogout)


// Routes for admin-------

userRoute.get('/admin')



module.exports = userRoute;

