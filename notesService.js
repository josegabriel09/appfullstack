const DBConnection = require("../configs/connectDB");

let getAllNotes = async (RASTUD) => {
  try {
    let filterQuery = "SELECT * FROM NOTE WHERE 1=1";
    const queryParams = [];

    if (RASTUD) {
      filterQuery += " AND RASTUD = ?";
      queryParams.push(RASTUD);
    }

    const [results] = await DBConnection.query(filterQuery, queryParams);
    return results;
  } catch (error) {
    throw error;
  }
};

let getNoteByRASTUD = async (RASTUD) => {
  try {
    const [results] = await DBConnection.query(
      "SELECT * FROM NOTE WHERE RASTUD = ?",
      [RASTUD]
    );
    if (results.length > 0) {
      // return results[0];
      return results;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

let createNote = async (
  RASTUD,
  LINGUA_PORTUGUESA,
  ARTES,
  EDUCACAO_FISICA,
  MATEMATICA,
  BIOLOGIA,
  FISICA,
  QUIMICA,
  HISTORIA,
  GEOGRAFIA,
  FILOSOFIA,
  SOCIOLOGIA,
  ELETIVA,
  RESULTADO
) => {
  try {
    const [results] = await DBConnection.query(
      "INSERT INTO NOTE (RASTUD, LINGUA_PORTUGUESA, ARTES, EDUCACAO_FISICA, MATEMATICA, BIOLOGIA, FISICA, QUIMICA, HISTORIA, GEOGRAFIA, FILOSOFIA, SOCIOLOGIA, ELETIVA, RESULTADO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        RASTUD,
        LINGUA_PORTUGUESA,
        ARTES,
        EDUCACAO_FISICA,
        MATEMATICA,
        BIOLOGIA,
        FISICA,
        QUIMICA,
        HISTORIA,
        GEOGRAFIA,
        FILOSOFIA,
        SOCIOLOGIA,
        ELETIVA,
        RESULTADO
      ]
    );
    return results.insertId;
  } catch (error) {
    throw error;
  }
};

let updateNote = async (
  RASTUD,
  ID,
  LINGUA_PORTUGUESA,
  ARTES,
  EDUCACAO_FISICA,
  MATEMATICA,
  BIOLOGIA,
  FISICA,
  QUIMICA,
  HISTORIA,
  GEOGRAFIA,
  FILOSOFIA,
  SOCIOLOGIA,
  ELETIVA,
  RESULTADO
) => {
  try {
    console.log(ID)
    console.log(RASTUD)
    const [results] = await DBConnection.query(
      "UPDATE NOTE SET LINGUA_PORTUGUESA = ?, ARTES = ?, EDUCACAO_FISICA = ?, MATEMATICA = ?, BIOLOGIA = ?, FISICA = ?, QUIMICA = ?, HISTORIA = ?, GEOGRAFIA = ?, FILOSOFIA = ?, SOCIOLOGIA = ?, ELETIVA = ?, RESULTADO = ? WHERE RASTUD = ? AND ID = ?",
      [
        LINGUA_PORTUGUESA,
        ARTES,
        EDUCACAO_FISICA,
        MATEMATICA,
        BIOLOGIA,
        FISICA,
        QUIMICA,
        HISTORIA,
        GEOGRAFIA,
        FILOSOFIA,
        SOCIOLOGIA,
        ELETIVA,
        RESULTADO,
        RASTUD, 
        ID
      ]
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

let deleteNote = async (RASTUD) => {
  try {
    const [results] = await DBConnection.query(
      "DELETE FROM NOTE WHERE RASTUD = ?",
      [RASTUD]
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
  getAllNotes: getAllNotes,
  getNoteByRASTUD: getNoteByRASTUD,
  createNote: createNote,
  updateNote: updateNote,
  deleteNote: deleteNote,
};
