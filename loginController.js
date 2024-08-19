// const { get } = require("express/lib/response");

let getLoginPage = (req, res) => {
    if(req.isAuthenticated()) {
        return res.redirect("/");
        
    }    return res.render("login.ejs", {
        errors: req.flash("errors")
    })
    // res.send("hello data login from controller ")
};

let checkLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/login");
    }
    next();
};

let checkLoggedOut = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect("/");
        
    }
    next()
};

let postLogOut = (req, res) => {
    req.session.destroy(function(err){
        return res.redirect("/login");
    })

};

module.exports = {
    getLoginPage: getLoginPage,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};