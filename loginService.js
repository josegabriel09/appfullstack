

const DBConnection = require("../configs/connectDB");
const bcryptjs = require("bcryptjs");

let findUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("email parametro find by email" + email)
      console.log('tentando conectar com student e procurar por email');
      const [rows] = await DBConnection.query(
        'SELECT * FROM `STUDENT` WHERE `EMAIL` = ?',
        [email]
      );
      

      let user = rows[0];
     
      resolve(user);
      console.log("printando o user recuperado pela find by email"+ user)
      console.log(JSON.stringify(user))

    } catch (err) {
      reject(err);
      console.log(err.message);
    }
  });
};

let comparePasswordUser = (user, password) => {
  return new Promise(async (resolve, reject) => {
    console.log("PASSWORD" + password)
    console.log("PASSWORD  11" + JSON.stringify(user))

    try {
      let isMatch = await bcryptjs.compare(password, user.PASSWORD);
      if (isMatch) resolve(true);
      resolve("The password you've entered is incorrect");
    } catch (e) {
      reject(e);
      console.log(e.message);
    }
  });
};

let findStudentById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await DBConnection.query(
        "SELECT * FROM student WHERE RASTUD = ?",
        [id]
      );

      let user = rows[0];
      console.log(JSON.stringify(user) + "vitoria")
      resolve(user);
    } catch (e) {
      reject(e);
      console.log(e.message);
    }
  });
};

let findCollaboratorById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await DBConnection.query(
        "SELECT * FROM COLLABORATOR WHERE RACOLLAB = ?",
        [id]
      );

      let user = rows[0];
      resolve(user);
    } catch (e) {
      reject(e);
      console.log(e.message);
    }
  });
}

module.exports = {
  findUserByEmail: findUserByEmail,
  comparePasswordUser: comparePasswordUser,
  findStudentById: findStudentById,
  findCollaboratorById: findCollaboratorById
};
