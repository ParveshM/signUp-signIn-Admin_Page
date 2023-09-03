const user = require('../models/userModel')
const bcrypt = require('bcrypt')


// password hashing-------
const securePassword = async (password) => {

    try {

        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;

    } catch (error) {
        console.log(error.message);
    }
}

// loading register page----- 
const loadRegister = async (req, res) => {
    try {
        res.render('registration')
    } catch (error) {
        console.log(error.message);
    }
}

// User data inserting-------------
const insertUser = async (req, res) => {
    try {
        const emailCheck = req.body.email;
        const checkData = await user.findOne({email:emailCheck})
        if (checkData) {
            res.render('registration',{userCheck:'user already exists, Please try with new email'})
        }else{

            const sPassword = await securePassword(req.body.password);
            const User = new user({
                name: req.body.name,
                email: req.body.email,
                password:sPassword,
                is_admin: 0
            });
            console.log(req.body);
            const userData = await User.save();
    
            if (userData) {
                res.render('registration', { message: "Registered successfully, Please verify your email" })
            }
             else {
                res.render('registration', { message: "Register failed" })
            }
        }

    } catch (error) {
        console.log(error.message)
        // console.log("error is here in inserting");
    }

}

// Loading Login page----

const loadLogin = async (req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
    }
}

// verify Login----
const verifyLogin = async(req,res)=>{

try { 
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);

    const userData = await user.findOne({email:email})
    
    if (userData) {
     const passwordMatch = await bcrypt.compare(password,userData.password)
        if(passwordMatch){
            req.session.user_id = userData._id
           res.render('home')
        }else{
            res.render('login',{message:"Email or password is incorrect"})
        }
    }else{
        res.render('login',{message:"Email or password is incorrect"})

    }   
} catch (error) {
    console.log(error.message);
}
}

// Load home -------
const loadHome = async (req,res)=>{
try {
    res.render('home')
} catch (error) {
    console.log(error.message);
}
}

// logout -------
const userLogout = async (req,res)=>{
    try {
        req.session.user_id = null;
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
     loadRegister,
     insertUser,
     loadLogin,
     verifyLogin,
     loadHome, 
     userLogout,
     securePassword
}