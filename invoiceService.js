const DBConnection = require("../configs/connectDB");
const admin = require('firebase-admin');

// Inicializar o SDK do Firebase Admin
const serviceAccount = require("../eduvisionbase-b3c8b-firebase-adminsdk-s8qv3-83089d7ce3.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let getAllInvoices = async () => {
  try {
    const [results] = await DBConnection.query("SELECT * FROM INVOICE");
    return results;
  } catch (error) {
    throw error;
  }
};

let getInvoiceById = async (id) => {
  try {
    const [results] = await DBConnection.query(
      "SELECT * FROM INVOICE WHERE ID = ?",
      [id]
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

let createInvoice = async (rastud, amount, dueDate) => {
  try {
    const [results] = await DBConnection.query(
      "INSERT INTO INVOICE (RASTUD, AMOUNT, DUE_DATE) VALUES (?, ?, ?)",
      [rastud, amount, dueDate]
    );
    return results.insertId;
  } catch (error) {
    throw error;
  }
};

let updateInvoice = async (id, amount, dueDate) => {
  try {
    const [results] = await DBConnection.query(
      "UPDATE INVOICE SET AMOUNT = ?, DUE_DATE = ? WHERE ID = ?",
      [amount, dueDate, id]
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

let deleteInvoice = async (id) => {
  try {
    const [results] = await DBConnection.query(
      "DELETE FROM INVOICE WHERE ID = ?",
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
  getAllInvoices: getAllInvoices,
  getInvoiceById: getInvoiceById,
  createInvoice: createInvoice,
  updateInvoice: updateInvoice,
  deleteInvoice: deleteInvoice,
};