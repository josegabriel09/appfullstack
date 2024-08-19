// const { validationResult } = require("express-validator");
// const registerService = require("../services/registerService");
// const editUserService = require("../services/editUserService");
// const nodemailerConfig = require("../configs/nodemailerConfig");

// let getPageRegister = (req, res) => {
//     return res.render("register.ejs", {
//         errors: req.flash("errors")
//     });
// };

// let createNewUser = async (req, res) => {
//     //validate required fields
//     let errorsArr = [];
//     let validationErrors = validationResult(req);
//     if (!validationErrors.isEmpty()) {
//         let errors = Object.values(validationErrors.mapped());
//         errors.forEach((item) => {
//             errorsArr.push(item.msg);
//         });
//         req.flash("errors", errorsArr);
//         return res.json({
//             message: 'Signup error',
//             errors: errorsArr
//         });
//     }

//     //create a new user
//     let newUser = {
//         rastud: req.body.rastud,
//         fullname: req.body.fullName,
//         email: req.body.email,
//         password: req.body.password,
//         isStudent: req.body.isStudent,
//         idClass: req.body.idClass,
//         role: req.body.role
//     };
//     try {
//         let user = await registerService.createNewUser(newUser);
//         console.log("New user created:" + JSON.stringify(newUser));

//         // Send email to the newly registered user
//         await nodemailerConfig.sendEmail(user.email, (newUser.isStudent === "true"));

//         return res.json({
//             message: 'Signup successful',
//             fullname: newUser.fullname, 
//             password: newUser.password
//         });
//     } catch (err) {
//         req.flash("errors", err);
//         return res.json({
//             message: 'Signup failed',
//             errors: err
//         });
//     }
// };

// let editUserPassword = async (req, res) => { 
//     const { ID } = req.params;

//     let validationErrors = validationResult(req);
//     if (!validationErrors.isEmpty()) {
//         let errorsArr = [];

//         let errors = Object.values(validationErrors.mapped());
//         errors.forEach((item) => {
//             errorsArr.push(item.msg);
//         });
//         req.flash("errors", errorsArr);
//         return res.json({
//             message: 'Erro no registro da senha',
//             errors: errorsArr
//         });
//     }
//     let PASSWORD = req.body.password;
//     let ISSTUDENT = req.body.isStudent;

//     try {
//        await editUserService.updatePassword(ID, PASSWORD, ISSTUDENT);
//        res.json({ message: 'Password updated successfully' });
//     } catch (err) {
//         res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
//     }
// }

// module.exports = {
//     getPageRegister: getPageRegister,
//     createNewUser: createNewUser,
//     editUserPassword: editUserPassword
// };
const { validationResult } = require("express-validator");
const registerService = require("../services/registerService");
const editUserService = require("../services/editUserService");
const nodemailerConfig = require("../configs/nodemailerConfig");

let getPageRegister = (req, res) => {
    return res.render("register.ejs", {
        errors: req.flash("errors")
    });
};

let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.json({
            message: 'Signup error',
            errors: errorsArr
        });
    }

    //create a new user
    let newUser = {
        rastud: req.body.rastud ,
        fullname: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        isStudent: req.body.isStudent,
        idClass: req.body.idClass,
        role: req.body.role
    };
    try {
        let user = await registerService.createNewUser(newUser);
        console.log("New user created:" + JSON.stringify(newUser));
        console.log("New user created:" + JSON.stringify(user));


        // const id = JSON.stringify(newUser.user)

        // Send email to the newly registered user
        await nodemailerConfig.sendEmail(user.id, user.email);

        return res.json({
            message: 'Signup successful',
            fullname: newUser.fullname, 
            password: newUser.password
        });
    } catch (err) {
        req.flash("errors", err);
        return res.json({
            message: 'Signup failed',
            errors: err
        });
    }
};

let editUserPassword = async (req, res) => { 
    const { ID } = req.params;

    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errorsArr = [];

        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.json({
            message: 'Erro no registro da senha',
            errors: errorsArr
        });
    }
    let PASSWORD = req.body.password;
    let ISSTUDENT = req.body.isStudent;

    try {
       await editUserService.updatePassword(ID, PASSWORD, ISSTUDENT);
       res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
    }
}

module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser,
    editUserPassword: editUserPassword
};
