const teachersService = require("../services/teachersService");

let getAllTeachers = async (req, res) => {
    try {
      console.log("get all teachers controller")
      const { rateach, fullname, email, } = req.query;
      const teachers = await teachersService.getAllTeachers(
        rateach,
        fullname,
        email,
      );
      res.json(teachers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  let getTeacherByRatech = async (req, res) => {
    console.log("req chegou")
    const { rateach } = req.params;
    console.log(rateach)

    try {
      const clas = await teachersService.getTeacherByRatech(rateach);
      if (clas) {
        res.json(clas);
      } else {
        res.status(404).json({ message: "Teachers not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Teachers Server Error" });
    }
  };

let createTeacher = async (req, res) => {
    const { rateach, fullname, email, } = req.body;
    try {
      const createdTeacher = await teachersService.createTeacher(
        fullname,
        email
      );

      console.log(createdTeacher);
      console.log(fullname + "fullname controller")
      console.log(email + "email controller")
      res
        .status(201)
        .json({ message: "Class Teachers successfully", id: createdTeacher });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

let updateTeacher = async (req, res) => {
    const { rateach } = req.params;
    const { fullname, email } = req.body;
    console.log("entrou em update teacher")
    console.log(rateach, fullname, email)
    try {
      const updated = await teachersService.updateTeacher(
        rateach,
        fullname,
        email
      );
      if (updated) {
        res.json({ message: "Teacher updated successfully" });
      } else {
        res.status(404).json({ message: "Teacher not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

let deleteTeacher = async (req, res) => {
    const { rateach } = req.params;
    console.log("entrou em delete teacher")

    console.log(rateach)
    try {
      const deleted = await teachersService.deleteTeacher(rateach);
      if (deleted) {
        res.json({ message: "Teacher deleted successfully" });
      } else {
        res.status(404).json({ message: "Teacher not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

 module.exports = {
    getAllTeachers: getAllTeachers,
    getTeacherByRatech: getTeacherByRatech,
    createTeacher: createTeacher,
    updateTeacher: updateTeacher,
    deleteTeacher: deleteTeacher,
  };