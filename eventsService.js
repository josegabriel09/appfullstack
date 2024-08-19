const DBConnection = require("../configs/connectDB");

let getAllEvents = async (description, data, ra_teacher) => {
  try {
    let filterQuery = "SELECT * FROM EVENT WHERE 1=1";
    const queryParams = [];

    if (description) {
      filterQuery += " AND DESCRIPTION = ?";
      queryParams.push(description);
    }

    if (data) {
      filterQuery += " AND DATA = ?";
      queryParams.push(data);
    }

    if (ra_teacher) {
      filterQuery += " AND RA_TEACH = ?";
      queryParams.push(ra_teacher);
    }

    const [results] = await DBConnection.query(filterQuery, queryParams);
    return results;
  } catch (error) {
    throw error;
  }
};

let getEventByRaTeacher = async (ra_teacher) => {
  try {
    const [results] = await DBConnection.query(
      "SELECT * FROM EVENT WHERE RA_TEACH = ?",
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

let createEvent = async (description, data, ra_teacher) => {
  try {
    const [results] = await DBConnection.query(
      "INSERT INTO EVENT (DESCRIPTION, DATA, RA_TEACH) VALUES (?, ?, ?)",
      [description, data, ra_teacher]
    );
    return results.insertId;
  } catch (error) {
    throw error;
  }
};

let updateEvent = async (ra_teacher, description, data) => {
  try {
    const [results] = await DBConnection.query(
      "UPDATE EVENT SET DESCRIPTION = ?, DATA = ? WHERE RA_TEACH = ?",
      [description, data, ra_teacher]
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

let updateEventById = async (id, description, data) => {
  try {
    const [results] = await DBConnection.query(
      "UPDATE EVENT SET DESCRIPTION = ?, DATA = ? WHERE ID = ?",
      [description, data, id]
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

let deleteEvent = async (ra_teacher) => {
  try {
    const [results] = await DBConnection.query(
      "DELETE FROM EVENT WHERE RA_TEACH = ?",
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

let deleteEventById = async (id) => {
  try {
    const [results] = await DBConnection.query(
      "DELETE FROM EVENT WHERE ID = ?",
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

module.exports = {
  getAllEvents: getAllEvents,
  getEventByRaTeacher: getEventByRaTeacher,
  createEvent: createEvent,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  deleteEventById,
  updateEventById
};
