const editUserService = require("../services/editUserService")


let deleteStudentsByClassId = async (req, res) => {
    const { ID_CLASS } = req.params;
    console.log(ID_CLASS)

    console.log("delete studends by class id")
  
    try {
        const deleted = await editUserService.deleteStudentsByClassId(ID_CLASS);
        if (deleted) {
          res.json({ message: "Students deleted successfully" });
        } else {
          res.status(404).json({ message: "Student not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    
  };
  
  module.exports = {
      deleteStudentsByClassId

  }