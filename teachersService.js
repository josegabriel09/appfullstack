const DBConnection = require("../configs/connectDB");

// let getAllTeachers = async (
//   rateach,
//   fullname,
//   email,
// ) => {
//   try {
//     let filterQuery = "SELECT * FROM TEACHER WHERE 1=1";
//     const queryParams = [];

//     if (rateach) {
//       filterQuery += " AND RATEACH = ?";
//       queryParams.push(rateach);
//     }

//     if (fullname) {
//       filterQuery += " AND FULLNAME = ?";
//       queryParams.push(fullname);
//     }

//     if (email) {
//       filterQuery += " AND EMAIL = ?";
//       queryParams.push(email);
//     }
//     const [results] = await DBConnection.query(filterQuery, queryParams);
//     return results;
//   } catch (error) {
//     throw error;
//   }
// };

let getAllTeachers = async (
  rateach,
  fullname,
  email,
) => {
  console.log("entrou no get all teachers")
  try {
    let filterQuery = "SELECT * FROM TEACHER WHERE 1=1";
    const queryParams = [];

    if (rateach !== null && rateach !== undefined && rateach !== '') {
      filterQuery += " AND RATEACH = ?";
      queryParams.push(rateach);
    }

    if (fullname !== null && fullname !== undefined && fullname !== '') {
      filterQuery += " AND FULLNAME = ?";
      queryParams.push(fullname);
    }

    if (email !== null && email !== undefined && email !== '') {
      filterQuery += " AND EMAIL = ?";
      queryParams.push(email);
    }

    const [results] = await DBConnection.query(filterQuery, queryParams);
    console.log(results);
    return results;
  } catch (error) {
    throw error;
  }
};

let getTeacherByRatech = async (rateach) => {
  console.log(rateach + "rateach service")
  try {
    const [results] = await DBConnection.query(
      "SELECT * FROM TEACHER WHERE RATEACH = ?",
      [rateach]
    );
    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

let createTeacher = async ( fullname, email) => {
  console.log(fullname + "fullname")
  console.log(email + "email")
  try {
    const [results] = await DBConnection.query(
      "INSERT INTO TEACHER (fullname, email) VALUES (?, ?)",
      [fullname, email]
    );
    return results.insertId;
  } catch (error) {
    throw error;
  }
};

let updateTeacher = async (rateach, fullname, email) => {

  console.log(rateach)
  console.log(fullname)
  console.log(email)
    try {
    const [results] = await DBConnection.query(
      "UPDATE TEACHER SET FULLNAME = ?, EMAIL = ? WHERE RATEACH = ?",
      [fullname, email, rateach]
    );
    if (results.affectedRows > 0) {
      console.log(true)
      return true;
    } else {
      console.log(false)

      return false;
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
};

let deleteTeacher = async (rateach) => {
  try {
    const [results] = await DBConnection.query(
      "DELETE FROM TEACHER WHERE RATEACH = ?",
      [rateach]
    );
    if (results.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getAllTeachers: getAllTeachers,
  getTeacherByRatech: getTeacherByRatech,
  createTeacher: createTeacher,
  updateTeacher: updateTeacher,
  deleteTeacher: deleteTeacher,
};