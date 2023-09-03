const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const adminRoute = require('../routes/adminRoute');
const userController = require('../controllers/userController')

// loading admin login---
const loadLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
    }
}

// verifying  login---
const verifyLogin = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        
        console.log(email);

        const userData = await User.findOne({ email: email })
        if (userData) {
            const passCheck = await bcrypt.compare(password, userData.password)

            if (passCheck) {

                if (userData.is_admin === false) {
                    res.render('login', { message: "You're not an admin" })
                } else {
                    req.session.admin = userData._id;
                    res.redirect('/admin/home')
                }
            }
        } else {
            res.render('login', { message: "Email or password is incorrect" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

// loading home----
const loadHome = async (req, res) => {
    try {
        res.render('home')
    } catch (error) {
        console.log(error.message);
    }
}

// logout of admin --
const logout = async (req, res) => {
    try {
        req.session.admin = null;
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message);
    }
}

// adminDash-----
const adminDashboard = async (req, res) => {
    try {
        const userData = await User.find({ is_admin: 0 })
        res.render('dashboard', { users: userData })
    } catch (error) {
        console.log(error.message);
    }
}

// Add User loading----

const newUserLoad = async (req, res) => {
    try {

        res.render('newUser')

    } catch (error) {
        console.log(error.message);
    }
}

// adding user by Admin------
const addUser = async (req, res) => {
    try {

        const emailCheck = req.body.email;
        const checkData = await User.findOne({ email: emailCheck })
        if (checkData) {
            res.render('newUser', { userCheck: 'user already exists, Please try with new email' })
        } else {

            const sPassword = await userController.securePassword(req.body.password);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: sPassword,
                is_admin: 0
            });
            console.log(req.body);
            const userData = await user.save();

            if (userData) {

                res.render('newUser', { message: "Registered successfully, Please verify your email" })
            }
            else {
                res.render('newUser', { message: "Register failed" })
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

// editing page load------
const editUserLoad = async (req, res) => {
    try {
        const id = req.query.id;

        const userData = await User.findById({ _id: id })

        if (userData) {

            res.render('editUser', { user: userData })
        }
    } catch (error) {
        console.log(error.message);
    }
}
// update user --------
const updateUser = async (req, res) => {
    try {

        const userData = await User.findByIdAndUpdate({ _id: req.body.id },
            { $set: { name: req.body.name, email: req.body.email } })
        if (userData) {

            res.redirect('/admin/dashboard')
        }

    } catch (error) {
        console.log(error.message);
    }
}
// delete user--------
const deleteUser = async (req, res) => {
    try {

        const id = req.query.id;
        await User.findOneAndRemove({ _id: id });
        req.session.user_id = null;     /*clearing the session of user after deletion from admin*/
        res.redirect('/admin/dashboard');
        

    } catch (error) {
        console.log(error.message);
    }
}
// search user--------
const searchUser = async (req, res) => {
    try {

        const name = req.body.name;
     const userData = await User.find({is_admin:0, name:{$regex:name,$options:'i'}}).sort({name:1});
        res.render('dashboard',{users:userData});


    } catch (error) {
        console.log(error.message);
    }
}




module.exports = {
    loadLogin,
    verifyLogin,
    loadHome,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUser,
    deleteUser,
    searchUser
};