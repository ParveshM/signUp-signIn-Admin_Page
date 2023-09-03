const isLogin = async (req, res, next) => {
    try {

        if (!req.session.user_id) {
            
            res.redirect('/')
        }
        else {
            next()
           
        }

    } catch (error) {
        console.log(error.message);
    }
}

const isLogout = async (req, res, next) => {
    try {

        if (req.session.user_id) {
            res.redirect('/home')
        }else{
            next()
        }

    } catch (error) {
        onsole.log(error.message);
    }
}
module.exports = { isLogin, isLogout }

