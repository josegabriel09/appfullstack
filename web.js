const express = require("express")
const mysql = require('mysql2/promise');
const {checkLoggedIn, getLoginPage, checkLoggedOut, postLogOut } = require("../controllers/loginController")
const { getPageRegister, createNewUser, editUserPassword } = require("../controllers/registerController")
const { getHomePage } = require("../controllers/homePageController")
const auth = require("../validation/authValidation")
const passport = require("passport")
const  { initPassportLocal }  = require("../controllers/passportLocalController")
const jwt = require('jsonwebtoken')
let router = express.Router();
const classeController = require("../controllers/classeController");
const teachersController = require("../controllers/teachersController")
const noteController = require("../controllers/notesController");
const eventsController = require("../controllers/eventsController");
const mattersController = require("../controllers/mattersController");
const invoiceController = require('../controllers/invoiceController');
const classuploadController = require('../controllers/classuploadController');
const noteuploadController = require('../controllers/noteuploadController');
const studentUploadController = require('../controllers/StudentUploadController');
const studentController = require('../controllers/StudentController');
const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Diretório onde os comprovantes serão armazenados
const multerConfig = multer();
const ConnectDB = require('../configs/connectDB');
var _pix = require('faz-um-pix');




initPassportLocal()

let initWebRoutes = (app) => {
    router.get("/", [checkLoggedIn, getHomePage]);
    router.get("/login", [checkLoggedOut, getLoginPage]);
    router.post("/login", (req, res, next) => {
        console.log(req.body); // Log request body
        console.log(req.flash('error')); // Log error flash messages
        console.log(req.flash('success')); // Log success flash messages
        next();
    }, passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true
    }));

    router.post(
    '/signin',
    async (req, res, next) => {
        passport.authenticate(
        'login',
        { id: req.body.id }, // Specify the key-value pair for the user id
        async (err, user, info) => {
            try {
            if (err || !user) {
                const error = new Error('An error occurred.');
                console.log(user)
                console.log(err)
                console.log(info)

                return next(error);
            }

            req.login(
                user,
                { session: false },
                async (error) => {
                if (error) return next(error);
                console.log("signin route "+ JSON.stringify(user))

                const body = { id: (user.RASTUD || user.RACOLLAB), email: user.EMAIL, role: req.body.role, name:user.FULLNAME, idclass: user.ID_CLASS, occupation: user.ROLE };
                console.log(JSON.stringify(body))
                console.log(req.user.role)
                const token = jwt.sign({ user: body }, 'TOP_SECRET'); 
                //You should not store sensitive information such as the user’s password in the token.

                return res.json({ token });
                }
            );
            } catch (error) {
            return next(error);
            }
        }
        )(req, res, next);
    }
    );
// Rota para obter todas as classes com filtros
router.get("/classes", classeController.getAllClasses);

// Rota para obter uma única classe por ID
router.get("/classes/:id", classeController.getClassById);

// Rota para criar uma nova classe
router.post("/classes", classeController.createClass);

// Rota para atualizar uma classe por ID
router.put("/classes/:id", classeController.updateClass);

// Rota para excluir uma classe por ID
router.delete("/classes/:id", classeController.deleteClass);


// Rota para obter todas as teacher
router.get("/teachers", teachersController.getAllTeachers);

// Rota para obter uma única teacher por RATEACH
router.get("/teachers/:rateach", teachersController.getTeacherByRatech);

// Rota para criar uma nova teacher
router.post("/teachers", teachersController.createTeacher);

// Rota para atualizar uma teacher por RATEACH
router.put("/teachers/:rateach", teachersController.updateTeacher);

// Rota para excluir uma teacher por RATEACH
router.delete("/teachers/:rateach", teachersController.deleteTeacher);


    // Rota para obter todas as notas com filtros
    router.get("/notes", noteController.getAllNotes);

    // Rota para obter uma única nota por RASTUD
    router.get("/notes/:RASTUD", noteController.getNoteByRASTUD);

    // Rota para criar uma nova nota
    router.post("/notes", noteController.createNote);

    // Rota para atualizar uma nota por RASTUD
    router.put("/notes/:RASTUD", noteController.updateNote);

    // Rota para excluir uma nota por RASTUD
    router.delete("/notes/:RASTUD", noteController.deleteNote);

    router.get("/events", eventsController.getAllEvents);

    router.get("/events/:rateach", eventsController.getEventByRaTeacher);

    router.post("/events", eventsController.createEvent);

    router.put("/events/:id", eventsController.updateEvent);

    router.delete("/events/:id", eventsController.deleteEvent);

    router.get("/matters", mattersController.getAllMatters);

    router.get("/matters/:idclass", mattersController.getMatterByRaTeacher);

    router.post("/matters", mattersController.createMatter);

    router.put("/matters/:idclass", mattersController.updateMatter);

    router.delete("/matters/:idclass", mattersController.deleteMatter);

    // router.get("/register", getPageRegister);

    router.post("/register", auth.validateRegister, createNewUser);

    // router.post("/register", createNewUser);
    router.put("/editpassword/:ID", auth.validatePasswordUpdate, editUserPassword); //when the student creates its own password
    router.post("/logout", postLogOut)

    router.get("/students/:ID_CLASS", classeController.getAllStudentsOfClass);

    router.delete("/students/:ID_CLASS", studentController.deleteStudentsByClassId);


    router.get('/pix', async (req, res) => {
        try {
          const [rows] = await ConnectDB.query('SELECT * FROM PIX');
          connection.release();
          res.json(rows);
        } catch (error) {
          console.error('Error fetching PIX entries:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });

      // GET endpoint to fetch PIX entries by RASTUD
        router.get('/pix/rastud/:rastud', async (req, res) => {
            const rastud = req.params.rastud;
            try {
            const [rows] = await ConnectDB.query('SELECT * FROM PIX WHERE RASTUD = ?', [rastud]);
            connection.release();
            res.json(rows);
            } catch (error) {
            console.error('Error fetching PIX entries by RASTUD:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        
        // GET endpoint to fetch PIX entries by IDCLASS
        router.get('/pix/idclass/:idclass', async (req, res) => {
            const idclass = req.params.idclass;
            try {
            const [rows] = await ConnectDB.query('SELECT * FROM PIX WHERE IDCLASS = ?', [idclass]);
            connection.release();
            res.json(rows);
            } catch (error) {
            console.error('Error fetching PIX entries by IDCLASS:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            }
        });
  
      
      // POST endpoint to create a new PIX entry
      router.post('/pix', async (req, res) => {
        const { IDCLASS, RASTUD, PIXKEY, DESCRIPTION, BENEFICIADO, AMOUNT, CITY, DUE_DATE } = req.body;
        try {

            // PIX_CODE = await _pix.Pix("mvitoriapereirac@gmail.com", "MARIA VITORIA PEREIRA CORDEIRO", "RECIFE", "1.00", "Pedido #1");
            
            PIX_CODE = await _pix.Pix(PIXKEY, BENEFICIADO, CITY, AMOUNT, DESCRIPTION);


          const [result] = await ConnectDB.query('INSERT INTO PIX (IDCLASS, RASTUD, PIXKEY, DESCRIPTION, BENEFICIADO, AMOUNT, CITY, DUE_DATE, PIX_CODE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [IDCLASS, RASTUD, PIXKEY, DESCRIPTION, BENEFICIADO, AMOUNT, CITY, DUE_DATE, PIX_CODE]);
          connection.release();
          res.json({ id: result.insertId, message: 'PIX entry created successfully' });
        } catch (error) {
          console.error('Error creating PIX entry:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
      
      // PUT endpoint to update a PIX entry by ID
      router.put('/pix/:id', async (req, res) => {
        const id = req.params.id;
        const { IDCLASS, RASTUD, PIXKEY, DESCRIPTION, BENEFICIADO, AMOUNT, CITY, DUE_DATE, PIX_CODE } = req.body;
        try {
          await ConnectDB.query('UPDATE PIX SET IDCLASS = ?, RASTUD = ?, PIXKEY = ?, DESCRIPTION = ?, BENEFICIADO = ?, AMOUNT = ?, CITY = ?, DUE_DATE = ?, PIX_CODE = ? WHERE ID = ?', [IDCLASS, RASTUD, PIXKEY, DESCRIPTION, BENEFICIADO, AMOUNT, CITY, DUE_DATE, PIX_CODE, id]);
          connection.release();
          res.json({ message: 'PIX entry updated successfully' });
        } catch (error) {
          console.error('Error updating PIX entry:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
      
      // DELETE endpoint to delete a PIX entry by ID
      router.delete('/pix/:id', async (req, res) => {
        const id = req.params.id;
        try {
          await ConnectDB.query('DELETE FROM PIX WHERE ID = ?', [id]);
          connection.release();
          res.json({ message: 'PIX entry deleted successfully' });
        } catch (error) {
          console.error('Error deleting PIX entry:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });

      // Rota para buscar a turma de um aluno por meio do RASTUD (Registro Aluno)
        router.get("/:rastud/class", async (req, res) => {
            const rastud = req.params.rastud;

            console.log(rastud);

            console.log('get idclass por rastud');

        
            try {
            // Executa a consulta para obter a turma do aluno
            const [results] = await DBConnection.query("SELECT RASTUD, FULLNAME, CLASSNAME, LETTER, MODALITY FROM STUDENT INNER JOIN CLASS ON ID_CLASS = IDCLASS WHERE RASTUD = ?", [rastud]);
        
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

        router.get("/teacher/matters/:ID", async (req, res) => {
          const { ID } = req.params;
          try {
            const [results] = await ConnectDB.query(
              "SELECT TEACHER.FULLNAME, TEACHER.EMAIL, MATTER.MATTER, CLASS.CLASSNAME, CLASS.LETTER FROM TEACHER INNER JOIN MATTER ON TEACHER.RATEACH = MATTER.RA_TEACH INNER JOIN CLASS ON MATTER.ID_CLASS = CLASS.IDCLASS WHERE CLASS.IDCLASS = ?",
              [ID]
            );
        
            if (results.length > 0) {
              res.status(200).json(results);
            } else {
              res.status(404).json({ message: 'No teacher, matter, class information found' });
            }
          } catch (error) {
            console.error('Error retrieving teacher, matter, class information:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
        });
        

    return app.use("/", router);



    
};


router.get("/invoices", invoiceController.getAllInvoices);

router.get("/invoices/:id", invoiceController.getInvoiceById);

router.post("/invoices", invoiceController.createInvoice);

router.put("/invoices/:id", invoiceController.updateInvoice);

router.delete("/invoices/:id", invoiceController.deleteInvoice);

router.post("/invoices/:id/payment", upload.single('comprovante'), invoiceController.sendPaymentConfirmation);

router.post("/uploadstudent", multerConfig.single("file"), studentUploadController.uploadStudentFile);

router.post("/uploadnote", multerConfig.single("file"), noteuploadController.uploadNoteFile);

router.post("/uploadclass", multerConfig.single("file"), classuploadController.uploadClassFile);



module.exports = router;
module.exports = initWebRoutes;