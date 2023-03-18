const { getUserByUsername } = require("../services/user");
const isLogged = async (req, res, next) => {
    const user = await getUserByUsername(req.session?.user);
    if(user){
        next()
    }else{
        res.redirect('user/login')
    }
}

module.exports = isLogged