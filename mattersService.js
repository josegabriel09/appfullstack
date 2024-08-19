const DBConnection = require("../configs/connectDB");

let getAllMatters = async (matter, ra_teacher, id_class) => {
  try {
    let filterQuery = "SELECT * FROM MATTER WHERE 1=1";
    const queryParams = [];

    if (matter) {
      filterQuery += " AND MATTER = ?";
      queryParams.push(matter);
    }

    if (ra_teacher) {
      filterQuery += " AND RA_TEACH = ?";
      queryParams.push(ra_teacher);
    }

    if (id_class) {
      filterQuery += " AND ID_CLASS = ?";
      queryParams.push(id_class);
    }

    const [results] = await DBConnection.query(filterQuery, queryParams);
    return results;
  } catch (error) {
    throw error;
  }
};

let getMatterByRaTeacher = async (ra_teacher) => {
  try {
    const [results] = await DBConnection.query(
      "SELECT * FROM MATTER WHERE RA_TEACH = ?",
      [ra_teacher]
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

let createMatter = async (matter, ra_teacher, id_class) => {
  try {
    const [results] = await DBConnection.query(
      "INSERT INTO MATTER (MATTER, RA_TEACH, ID_CLASS) VALUES (?, ?, ?)",
      [matter, ra_teacher, id_class]
    );
    return results.insertId;
  } catch (error) {
    throw error;
  }
};

let updateMatter = async (ra_teacher, matter, id_class) => {
  try {
    const [results] = await DBConnection.query(
      "UPDATE MATTER SET MATTER = ?, ID_CLASS = ? WHERE RA_TEACH = ?",
      [matter, id_class, ra_teacher]
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
let updateMatterById = async (id, ra_teacher, matter, id_class) => {
  console.log("edit by id")
  console.log(id, ra_teacher, matter, id_class)
  try {
    const [results] = await DBConnection.query(
      "UPDATE MATTER SET MATTER = ?, ID_CLASS = ?, RA_TEACH = ? WHERE ID = ?",
      [matter, id_class, ra_teacher, id]
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

let deleteMatter = async (ra_teacher) => {
  try {
    const [results] = await DBConnection.query(
      "DELETE FROM MATTER WHERE RA_TEACH = ?",
      [ra_teacher]
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

let deleteMatterById = async (ID) => {
  try {
    const [results] = await DBConnection.query(
      "DELETE FROM MATTER WHERE ID = ?",
      [ID]
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
  getAllMatters: getAllMatters,
  getMatterByRaTeacher: getMatterByRaTeacher,
  createMatter: createMatter,
  updateMatter: updateMatter,
  deleteMatter: deleteMatter,
  deleteMatterById,
  updateMatterById
};
