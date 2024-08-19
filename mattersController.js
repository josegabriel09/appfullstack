const matterService = require("../services/mattersService");


let getAllMatters = async (req, res) => {
  try {
    const { matter, ra_teacher, id_class } = req.query;
    const matters = await matterService.getAllMatters(
      matter,
      ra_teacher,
      id_class
    );
    res.json(matters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let getMatterByRaTeacher = async (req, res) => {
  const { ra_teacher } = req.params;
  try {
    const matter = await matterService.getMatterByRaTeacher(ra_teacher);
    if (matter) {
      res.json(matter);
    } else {
      res.status(404).json({ message: "Matter not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let createMatter = async (req, res) => {
  const { matter, ra_teacher, id_class } = req.body;
  try {
    const createdMatter = await matterService.createMatter(
      matter,
      ra_teacher,
      id_class
    );
    res
      .status(201)
      .json({ message: "Subject created successfully", id: createdMatter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let updateMatter = async (req, res) => {
  const { ra_teacher } = req.params;
  const { matter, id_class } = req.body;
  try {
    const updated = await matterService.updateMatter(ra_teacher, matter, id_class);
    if (updated) {
      res.json({ message: "Matter updated successfully" });
    } else {
      res.status(404).json({ message: "Matter not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let updateMatterById = async (req, res) => {
  const { ID } = req.params;
  const { ra_teacher, matter, id_class } = req.body;
  console.log("edit by id")
  // console.log(ID, ra_teacher, matter, id_class)

  try {
    const updated = await matterService.updateMatterById(ID, ra_teacher, matter, id_class);
    if (updated) {
      res.json({ message: "Matter updated successfully" });
    } else {
      res.status(404).json({ message: "Matter not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let deleteMatter = async (req, res) => {
  const { ra_teacher } = req.params;
  try {
    const deleted = await matterService.deleteMatter(ra_teacher);
    if (deleted) {
      res.json({ message: "Matter deleted successfully" });
    } else {
      res.status(404).json({ message: "Matter not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let deleteMatterById = async (req, res) => {
  const { ID } = req.params;
  try {
    const deleted = await matterService.deleteMatterById(ID);
    if (deleted) {
      res.json({ message: "Matter deleted successfully" });
    } else {
      res.status(404).json({ message: "Matter not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
