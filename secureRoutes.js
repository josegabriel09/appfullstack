const express = require('express');
const router = express.Router();
const  { authCollaborator } = require("../validation/authCollaborator")
const auth = require("../validation/authValidation")
const { getPageRegister, createNewUser } = require("../controllers/registerController")
const classeController = require("../controllers/classeController");
const teachersController = require("../controllers/teachersController");
const mattersController = require("../controllers/mattersController");
const eventsController = require("../controllers/eventsController");
const noteController = require("../controllers/notesController");
const ConnectDB = require('../configs/connectDB');
var _pix = require('faz-um-pix');
const studentController = require('../controllers/StudentController');


router.get( // remember that the path needs to be preceded by a '/user'
  '/profile',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
    console.log(JSON.stringify(req.user))

  }
);

router.post("/register", [authCollaborator, auth.validateRegister], createNewUser);

// Rota para criar uma nova classe
router.post("/classes", authCollaborator, classeController.createClass);

// Rota para obter todas as classes com filtros
router.get("/classes", authCollaborator, classeController.getAllClasses);

// Rota para atualizar uma classe por ID
router.put("/classes/:id", classeController.updateClass);

// Rota para excluir uma classe por ID
router.delete("/classes/:id", classeController.deleteClass);

// Rota para criar uma nova teacher
router.post("/teachers", teachersController.createTeacher);

// Rota para obter todas as teacher
router.get("/teachers", teachersController.getAllTeachers);

// Rota para obter uma única teacher por RATEACH
router.get("/teachers/:rateach", teachersController.getTeacherByRatech);

router.post("/matters", mattersController.createMatter);

router.post("/events", eventsController.createEvent);

router.get("/students/:ID_CLASS", classeController.getAllStudentsOfClass);
router.get("/events", eventsController.getAllEvents);
router.post('/pix', async (req, res) => {
  const { IDCLASS, RASTUD, PIXKEY, DESCRIPTION, BENEFICIADO, AMOUNT, CITY, DUE_DATE } = req.body;
  try {
    console.log('PIXKEY:', PIXKEY);
    console.log('DESCRIPTION:', DESCRIPTION);
    console.log('BENEFICIADO:', BENEFICIADO);
    console.log('CITY:x', CITY);
    console.log('AMOUNT:', AMOUNT);
    console.log('DUE_DATE:', DUE_DATE);

      // PIX_CODE = await _pix.Pix("mvitoriapereirac@gmail.com", "MARIA VITORIA PEREIRA CORDEIRO", "RECIFE", "1.00", "Pedido #1");
      
      PIX_CODE = await _pix.Pix(PIXKEY, BENEFICIADO, CITY, AMOUNT, DESCRIPTION);
      console.log(PIX_CODE)


    const [result] = await ConnectDB.query('INSERT INTO PIX (IDCLASS, RASTUD, PIXKEY, DESCRIPTION, BENEFICIADO, AMOUNT, CITY, DUE_DATE, PIX_CODE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [IDCLASS, RASTUD, PIXKEY, DESCRIPTION, BENEFICIADO, AMOUNT, CITY, DUE_DATE, PIX_CODE]);
    res.json({ id: result.insertId, message: 'PIX entry created successfully' });
  } catch (error) {
    console.error('Error creating PIX entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 // GET endpoint to fetch PIX entries by IDCLASS
 router.get('/pix/idclass/:idclass', async (req, res) => {
  const idclass = req.params.idclass;
  try {
  const [rows] = await ConnectDB.query('SELECT * FROM PIX WHERE IDCLASS = ?', [idclass]);
  res.json(rows);
  } catch (error) {
  console.error('Error fetching PIX entries by IDCLASS:', error);
  res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET endpoint to fetch all PIX entries
router.get('/pix', async (req, res) => {
  console.log("entrou em get all pix")
  try {
  const [rows] = await ConnectDB.query('SELECT * FROM PIX');
  console.log(JSON.stringify(rows));
  res.json(rows);
  } catch (error) {
  console.error('Error fetching PIX entries:', error);
  res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/pix/:ID', async (req, res) => {
  console.log("entrou em delete pix")
  const { ID } = req.params
  console.log(ID + " aqui o ID")
  try {
  const [rows] = await ConnectDB.query('DELETE FROM PIX WHERE ID = ?', [ID]);
  console.log(JSON.stringify(rows));
  if (rows.affectedRows > 0) {
    res.json(rows);

    return true;
  } else {
    return false;
  }
// } catch (error) {
//   throw error;
// }
  } catch (error) {
  console.error('Error deleting PIX entry:', error);
  res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rota para buscar a turma de um aluno por meio do RASTUD (Registro Aluno)
router.get("/:rastud/class", async (req, res) => {
  const rastud = req.params.rastud;
  console.log(rastud);
  console.log('rastud');


  try {
    // Executa a consulta para obter a turma do aluno
    const [results] = await ConnectDB.query("SELECT RASTUD, FULLNAME, CLASSNAME, LETTER, MODALITY, ID_CLASS FROM STUDENT INNER JOIN CLASS ON ID_CLASS = IDCLASS WHERE RASTUD = ?", [rastud]);

    if (results.length > 0) {
      const classDetails = results[0];
      res.status(200).json(classDetails);
    } else {
      res.status(404).json({ message: 'Student not found or not assigned to a class' });
    }
  } catch (error) {
    console.error('Error retrieving student class:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/notes", noteController.createNote);

 // Rota para atualizar uma nota por RASTUD
 router.put("/notes/:RASTUD/:ID", noteController.updateNote);

 router.delete("/notes/:RASTUD", noteController.deleteNote);

 router.delete("/students/:ID_CLASS", studentController.deleteStudentsByClassId);

 router.put("/matters/:idclass", mattersController.updateMatter);

 router.put("/mattersById/:ID", mattersController.updateMatterById);

  router.delete("/matters/:ra_teacher", mattersController.deleteMatter);

  router.delete("/mattersById/:ID", mattersController.deleteMatterById);

  router.delete("/eventsById/:ID", eventsController.deleteEventById);

  router.put("/eventsById/:ID", eventsController.updateEventById);


  router.delete("/events/:ra_teacher", eventsController.deleteEvent);
// Rota para excluir uma teacher por RATEACH
router.delete("/teachers/:rateach", teachersController.deleteTeacher);

// Rota para atualizar uma teacher por RATEACH
router.put("/teachers/:rateach", teachersController.updateTeacher);


router.get('/collaborators', async (req, res) => {
  try {
    const [rows] = await ConnectDB.query("SELECT * FROM COLLABORATOR WHERE RACOLLAB <> 'dev'");
    res.json(rows);
  } catch (error) {
    console.error('Error fetching collaborators:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT endpoint to update a collaborator by RACOLLAB
router.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { fullname, role, email } = req.body;
 
  try {
    const [rows] = await ConnectDB.query('UPDATE STUDENT SET FULLNAME = ?, EMAIL = ? WHERE RASTUD = ?', [fullname, email, id]);
    res.json(rows);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE endpoint to delete a collaborator by RACOLLAB
router.delete('/studentsById/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id + "passou em delete")
  try {
    const [rows] = await ConnectDB.query('DELETE FROM STUDENT WHERE RASTUD = ?', [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.json({ message: 'Collaborator deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting Student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT endpoint to update a collaborator by RACOLLAB
router.put('/collaborators/:racollab', async (req, res) => {
  const { racollab } = req.params;
  const { fullname, role, email } = req.body;
 
  try {
    const [rows] = await ConnectDB.query('UPDATE COLLABORATOR SET FULLNAME = ?, ROLE = ?, EMAIL = ? WHERE RACOLLAB = ?', [fullname, role, email, racollab]);
    res.json(rows);
  } catch (error) {
    console.error('Error updating collaborator:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE endpoint to delete a collaborator by RACOLLAB
router.delete('/collaborators/:racollab', async (req, res) => {
  const { racollab } = req.params;
  console.log(racollab + "passou em delete")
  try {
    const [rows] = await ConnectDB.query('DELETE FROM COLLABORATOR WHERE RACOLLAB = ?', [racollab]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ message: 'Collaborator not found' });
    } else {
      res.json({ message: 'Collaborator deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting collaborator:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/matters", mattersController.getAllMatters);

// Rota para obter uma única classe por ID
router.get("/classes/:id", classeController.getClassById);


module.exports = router;