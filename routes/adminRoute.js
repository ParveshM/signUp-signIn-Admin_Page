const express = require('express')
const adminRoute = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
const config = require('../config/config')
const adminController = require('../controllers/adminController')
const adminAuth = require('../middlewares/adminAuth')
 
// using----
adminRoute.use(logger('dev'))
adminRoute.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}))
adminRoute.use(bodyParser.json())
adminRoute.use(bodyParser.urlencoded({ extended: true }))


// setting---------
adminRoute.set('view engine', 'ejs')
adminRoute.set('views', './views/admin')

// Admin routes------
adminRoute.get('/',adminAuth.isLogout, adminController.loadLogin)
adminRoute.post('/',adminController.verifyLogin)

// adminHome----
adminRoute.get('/home',adminAuth.isLogin,adminController.loadHome)
adminRoute.get('/logout',adminAuth.isLogin,adminController.logout)
adminRoute.get('/dashboard',adminAuth.isLogin,adminController.adminDashboard)

// newUser----
adminRoute.get('/newUser',adminAuth.isLogin,adminController.newUserLoad)
adminRoute.post('/addUser',adminController.addUser)

// editUser----
adminRoute.get('/editUser',adminAuth.isLogin,adminController.editUserLoad)
adminRoute.post('/editUser',adminController.updateUser)

// delet user----
adminRoute.get('/deleteUser',adminAuth.isLogin,adminController.deleteUser)
adminRoute.post('/searchUser',adminAuth.isLogin,adminController.searchUser)

adminRoute.get('*', (req, res) => {res.redirect('/admin')})


module.exports = adminRoute