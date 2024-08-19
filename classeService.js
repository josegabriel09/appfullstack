// const DBConnection = require("../configs/connectDB");


// let getAllClasses = async (
//   classname,
//   letter,
//   modality,
//   minId,
//   maxId
// ) => {
//   try {
//     let filterQuery = "SELECT * FROM CLASS WHERE 1=1";
//     const queryParams = [];

//     if (classname && classname !== "null") {
//       filterQuery += " AND CLASSNAME = ?";
//       queryParams.push(classname);
//     }

//     if (letter && letter !== "null") {
//       filterQuery += " AND LETTER = ?";
//       queryParams.push(letter);
//     }

//     if (modality && modality !== "null") {
//       filterQuery += " AND MODALITY = ?";
//       queryParams.push(modality);
//     }

//     if (minId && minId !== "null") {
//       filterQuery += " AND IDCLASS >= ?";
//       queryParams.push(minId);
//     }

//     if (maxId && maxId !== "null") {
//       filterQuery += " AND IDCLASS <= ?";
//       queryParams.push(maxId);
//     }

//     // If no parameters are provided or all parameters are "null", execute a basic SELECT * FROM CLASS query
//     if (queryParams.length === 0 || queryParams.every(param => param === null)) {
//       filterQuery = "SELECT * FROM CLASS";
//     }

//     const [results] = await DBConnection.query(filterQuery, queryParams);
//     return results;
//   } catch (error) {
//     throw error;
//   }
// };


// let getClassById = async (id) => {
//   try {
//     const [results] = await DBConnection.query(
//       "SELECT * FROM CLASS WHERE IDCLASS = ?",
//       [id]
//     );
//     if (results.length > 0) {
//       return results[0];
//     } else {
//       return null;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// let createClass = async (classname, letter, modality) => {
//   try {
//     const [results] = await DBConnection.query(
//       "INSERT INTO CLASS (CLASSNAME, LETTER, MODALITY) VALUES (?, ?, ?)",
//       [classname, letter, modality]
//     );
//     return results.insertId;
//   } catch (error) {
//     throw error;
//   }
// };

// let updateClass = async (id, classname, letter, modality) => {
//   try {
//     const [results] = await DBConnection.query(
//       "UPDATE CLASS SET CLASSNAME = ?, LETTER = ?, MODALITY = ? WHERE IDCLASS = ?",
//       [classname, letter, modality, id]
//     );
//     if (results.affectedRows > 0) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// let deleteClass = async (id) => {
//   try {
//     const [results] = await DBConnection.query(
//       "DELETE FROM CLASS WHERE IDCLASS = ?",
//       [id]
//     );
//     if (results.affectedRows > 0) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = {
//   getAllClasses: getAllClasses,
//   getClassById: getClassById,
//   createClass: createClass,
//   updateClass: updateClass,
//   deleteClass: deleteClass,
// };

const DBConnection = require("../configs/connectDB");

// let getAllClasses = async (
//   classname,
//   letter,
//   modality,
//   minId,
//   maxId
// ) => {
//   try {
//     let filterQuery = "SELECT * FROM CLASS WHERE 1=1";
//     const queryParams = [];

//     if (classname) {
//       filterQuery += " AND CLASSNAME = ?";
//       queryParams.push(classname);
//     }

//     if (letter) {
//       filterQuery += " AND LETTER = ?";
//       queryParams.push(letter);
//     }

//     if (modality) {
//       filterQuery += " AND MODALITY = ?";
//       queryParams.push(modality);
//     }

//     if (minId) {
//       filterQuery += " AND IDCLASS >= ?";
//       queryParams.push(minId);
//     }

//     if (maxId) {
//       filterQuery += " AND IDCLASS <= ?";
//       queryParams.push(maxId);
//     }

//     // If no parameters are provided, execute a basic SELECT * FROM CLASS query
//     if (queryParams.length === 0) {
//       console.log("no params provided")
//       filterQuery = "SELECT * FROM CLASS";
//     }

//     const [results] = await DBConnection.query(filterQuery, queryParams);
//     return results;
//   } catch (error) {
//     throw error;
//   }
// };
let getAllClasses = async (
  classname,
  letter,
  modality,
  minId,
  maxId
) => {
  try {
    let filterQuery = "SELECT * FROM CLASS WHERE 1=1";
    const queryParams = [];

    if (classname && classname !== "null") {
      filterQuery += " AND CLASSNAME = ?";
      queryParams.push(classname);
    }

    if (letter && letter !== "null") {
      filterQuery += " AND LETTER = ?";
      queryParams.push(letter);
    }

    if (modality && modality !== "null") {
      filterQuery += " AND MODALITY = ?";
      queryParams.push(modality);
    }

    if (minId && minId !== "null") {
      filterQuery += " AND IDCLASS >= ?";
      queryParams.push(minId);
    }

    if (maxId && maxId !== "null") {
      filterQuery += " AND IDCLASS <= ?";
      queryParams.push(maxId);
    }

    // If no parameters are provided or all parameters are "null", execute a basic SELECT * FROM CLASS query
    if (queryParams.length === 0 || queryParams.every(param => param === null)) {
      filterQuery = "SELECT * FROM CLASS";
    }

    const [results] = await DBConnection.query(filterQuery, queryParams);
    return results;
  } catch (error) {
    throw error;
  }
};


let getClassById = async (id) => {
  console.log(id + "id get class service ")

  try {
    const [results] = await DBConnection.query(
      "SELECT * FROM CLASS WHERE IDCLASS = ?",
      [id]
    );
    if (results.length > 0) {
      console.log(results)

      return results[0];
    } else {
      console.log(results)

      return null;
    }
  } catch (error) {
    throw error;
  }
};

let createClass = async (classname, letter, modality) => {
  try {
    const [results] = await DBConnection.query(
      "INSERT INTO CLASS (CLASSNAME, LETTER, MODALITY) VALUES (?, ?, ?)",
      [classname, letter, modality]
    );
    return results.insertId;
  } catch (error) {
    throw error;
  }
};

let updateClass = async (id, classname, letter, modality) => {
  console.log("entrei em update class service")
  try {
    const [results] = await DBConnection.query(
      "UPDATE CLASS SET CLASSNAME = ?, LETTER = ?, MODALITY = ? WHERE IDCLASS = ?",
      [classname, letter, modality, id]
    );
    if (results.affectedRows > 0) {
      console.log("results: " + JSON.stringify(results) )
      console.log(letter)

      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

let deleteClass = async (id) => {
  try {
    const [results] = await DBConnection.query(
      "DELETE FROM CLASS WHERE IDCLASS = ?",
      [id]
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

let getStudentsFromClass = async (id) => {
  try {
    console.log(JSON.stringify(id))

    const [results] = await DBConnection.query(
      "SELECT * FROM STUDENT WHERE ID_CLASS = ?",
      [id]
    );
    console.log(results)
    if (results && results != []) {
      return results;
    } else {
      return "No students found";
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllClasses: getAllClasses,
  getClassById: getClassById,
  createClass: createClass,
  updateClass: updateClass,
  deleteClass: deleteClass,
  getStudentsFromClass: getStudentsFromClass
};