
const classeService = require("../services/classeService");

let getAllClasses = async (req, res) => {
  console.log("chamou classes")
  try {
    const { classname, letter, modality, minId, maxId } = req.query;
    const classes = await classeService.getAllClasses(
      classname,
      letter,
      modality,
      minId,
      maxId
    );
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let getClassById = async (req, res) => {
  const { id } = req.params;
  console.log(id + "id get class")
  try {
    const classe = await classeService.getClassById(id);
    if (classe) {
      res.json(classe);
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let createClass = async (req, res) => {
  const { classname, letter, modality } = req.body;
  try {
    const createdClassId = await classeService.createClass(
      classname,
      letter,
      modality
    );
    res
      .status(201)
      .json({ message: "Class created successfully", id: createdClassId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let updateClass = async (req, res) => {
  const { id } = req.params;
  const { classname, letter, modality } = req.body;

  console.log("entrou em update class")

  try {
    const updated = await classeService.updateClass(
      id,
      classname,
      letter,
      modality
    );
    if (updated) {
      res.json({ message: "Class updated successfully" });
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await classeService.deleteClass(id);
    if (deleted) {
      res.json({ message: "Class deleted successfully" });
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
 
}

let getAllStudentsOfClass = async (req, res) => {
  const { ID_CLASS } = req.params;
  try {
    const students = await classeService.getStudentsFromClass(ID_CLASS);
    if (students) {
      res.json({ students });
    } else {
      res.status(404).json({ message: students });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  getAllClasses: getAllClasses,
  getClassById: getClassById,
  createClass: createClass,
  updateClass: updateClass,
  deleteClass: deleteClass,
  getAllStudentsOfClass: getAllStudentsOfClass,
};