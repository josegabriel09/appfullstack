
// Rota para buscar a turma de um aluno por meio do RASTUD (Registro Aluno)
router.get("/:rastud/class", async (req, res) => {
    const rastud = req.params.rastud;
  
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



  
// Get all teachers with filters
router.get("/teachers", async (req, res) => {
    try {
      const { rateach, fullname, email } = req.query;
      let filterQuery = "SELECT * FROM TEACHER WHERE 1=1";
      const queryParams = [];
  
      if (rateach) {
        filterQuery += " AND RATEACH = ?";
        queryParams.push(rateach);
      }
  
      if (fullname) {
        filterQuery += " AND FULLNAME = ?";
        queryParams.push(fullname);
      }
  
      if (email) {
        filterQuery += " AND EMAIL = ?";
        queryParams.push(email);
      }
  
      const [results] = await DBConnection.query(filterQuery, queryParams);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Get a single teacher by RA_TEACH
  router.get("/teachers/:ra", async (req, res) => {
    const { ra } = req.params;
    try {
      const [results] = await DBConnection.query("SELECT * FROM TEACHER WHERE RATEACH = ?", [ra]);
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: "Teacher not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Create a new teacher
  router.post("/teachers", async (req, res) => {
    const { rateach, fullname, email, password } = req.body;
    try {
      const [results] = await DBConnection.query(
        "INSERT INTO TEACHER (RATEACH, FULLNAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)",
        [rateach, fullname, email, password]
      );
      res.status(201).json({ message: "Teacher created successfully", id: results.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Update a teacher by RA_TEACH
  router.put("/teachers/:ra", async (req, res) => {
    const { ra } = req.params;
    const { fullname, email, password } = req.body;
    try {
      const [results] = await DBConnection.query(
        "UPDATE TEACHER SET FULLNAME = ?, EMAIL = ?, PASSWORD = ? WHERE RATEACH = ?",
        [fullname, email, password, ra]
      );
      if (results.affectedRows > 0) {
        res.json({ message: "Teacher updated successfully" });
      } else {
        res.status(404).json({ message: "Teacher not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Delete a teacher by RA_TEACH
  router.delete("/teachers/:ra", async (req, res) => {
    const { ra } = req.params;
    try {
      const [results] = await DBConnection.query("DELETE FROM TEACHER WHERE RATEACH = ?", [ra]);
      if (results.affectedRows > 0) {
        res.json({ message: "Teacher deleted successfully" });
      } else {
        res.status(404).json({ message: "Teacher not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

 // Get all notes with filters
router.get("/notes", async (req, res) => {
    try {
      const {
        rastud,
        lingua_portuguesa,
        artes,
        educacao_fisica,
        matematica,
        biologia,
        fisica,
        quimica,
        historia,
        geografia,
        filosofia,
        sociologia,
        eletiva,
        resultado,
      } = req.query;
      let filterQuery = "SELECT * FROM NOTE WHERE 1=1";
      const queryParams = [];
  
      if (rastud) {
        filterQuery += " AND RASTUD = ?";
        queryParams.push(rastud);
      }
  
      if (lingua_portuguesa) {
        filterQuery += " AND LINGUA_PORTUGUESA = ?";
        queryParams.push(lingua_portuguesa);
      }
  
      if (artes) {
        filterQuery += " AND ARTES = ?";
        queryParams.push(artes);
      }
  
      if (educacao_fisica) {
        filterQuery += " AND EDUCACAO_FISICA = ?";
        queryParams.push(educacao_fisica);
      }
  
      if (matematica) {
        filterQuery += " AND MATEMATICA = ?";
        queryParams.push(matematica);
      }
  
      if (biologia) {
        filterQuery += " AND BIOLOGIA = ?";
        queryParams.push(biologia);
      }
  
      if (fisica) {
        filterQuery += " AND FISICA = ?";
        queryParams.push(fisica);
      }
  
      if (quimica) {
        filterQuery += " AND QUIMICA = ?";
        queryParams.push(quimica);
      }
  
      if (historia) {
        filterQuery += " AND HISTORIA = ?";
        queryParams.push(historia);
      }
  
      if (geografia) {
        filterQuery += " AND GEOGRAFIA = ?";
        queryParams.push(geografia);
      }
  
      if (filosofia) {
        filterQuery += " AND FILOSOFIA = ?";
        queryParams.push(filosofia);
      }
  
      if (sociologia) {
        filterQuery += " AND SOCIOLOGIA = ?";
        queryParams.push(sociologia);
      }
  
      if (eletiva) {
        filterQuery += " AND ELETIVA = ?";
        queryParams.push(eletiva);
      }
  
      if (resultado) {
        filterQuery += " AND RESULTADO = ?";
        queryParams.push(resultado);
      }
  
      const [results] = await DBConnection.query(filterQuery, queryParams);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Get notes by RASTUD
  router.get("/notes/:rastud", async (req, res) => {
    const { rastud } = req.params;
    try {
      const [results] = await DBConnection.query("SELECT * FROM NOTE WHERE RASTUD = ?", [rastud]);
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Create a new note
  router.post("/notes", async (req, res) => {
    const {
      rastud,
      lingua_portuguesa,
      artes,
      educacao_fisica,
      matematica,
      biologia,
      fisica,
      quimica,
      historia,
      geografia,
      filosofia,
      sociologia,
      eletiva,
      resultado,
    } = req.body;
    try {
      const [results] = await DBConnection.query(
        "INSERT INTO NOTE (RASTUD, LINGUA_PORTUGUESA, ARTES, EDUCACAO_FISICA, MATEMATICA, BIOLOGIA, FISICA, QUIMICA, HISTORIA, GEOGRAFIA, FILOSOFIA, SOCIOLOGIA, ELETIVA, RESULTADO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          rastud,
          lingua_portuguesa,
          artes,
          educacao_fisica,
          matematica,
          biologia,
          fisica,
          quimica,
          historia,
          geografia,
          filosofia,
          sociologia,
          eletiva,
          resultado,
        ]
      );
      res.status(201).json({ message: "Note created successfully", id: results.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Update a note by RASTUD
  router.put("/notes/:rastud", async (req, res) => {
    const { rastud } = req.params;
    const {
      lingua_portuguesa,
      artes,
      educacao_fisica,
      matematica,
      biologia,
      fisica,
      quimica,
      historia,
      geografia,
      filosofia,
      sociologia,
      eletiva,
      resultado,
    } = req.body;
    try {
      const [results] = await DBConnection.query(
        "UPDATE NOTE SET LINGUA_PORTUGUESA = ?, ARTES = ?, EDUCACAO_FISICA = ?, MATEMATICA = ?, BIOLOGIA = ?, FISICA = ?, QUIMICA = ?, HISTORIA = ?, GEOGRAFIA = ?, FILOSOFIA = ?, SOCIOLOGIA = ?, ELETIVA = ?, RESULTADO = ? WHERE RASTUD = ?",
        [
          lingua_portuguesa,
          artes,
          educacao_fisica,
          matematica,
          biologia,
          fisica,
          quimica,
          historia,
          geografia,
          filosofia,
          sociologia,
          eletiva,
          resultado,
          rastud,
        ]
      );
      if (results.affectedRows > 0) {
        res.json({ message: "Note updated successfully" });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Delete a note by RASTUD
  router.delete("/notes/:rastud", async (req, res) => {
    const { rastud } = req.params;
    try {
      const [results] = await DBConnection.query("DELETE FROM NOTE WHERE RASTUD = ?", [rastud]);
      if (results.affectedRows > 0) {
        res.json({ message: "Note deleted successfully" });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Get all events
router.get("/events", async (req, res) => {
    try {
      const [results] = await DBConnection.query("SELECT * FROM EVENT");
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Get a single event by DESCRIPTION
  router.get("/events/:description", async (req, res) => {
    const { description } = req.params;
    try {
      const [results] = await DBConnection.query("SELECT * FROM EVENT WHERE DESCRIPTION = ?", [description]);
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Create a new event
  router.post("/events", async (req, res) => {
    const { description, data, ra_teach } = req.body;
    try {
      const [results] = await DBConnection.query(
        "INSERT INTO EVENT (DESCRIPTION, DATA, RA_TEACH) VALUES (?, ?, ?)",
        [description, data, ra_teach]
      );
      res.status(201).json({ message: "Event created successfully", id: results.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Update an event by DESCRIPTION
  router.put("/events/:description", async (req, res) => {
    const { description } = req.params;
    const { data, ra_teach } = req.body;
    try {
      const [results] = await DBConnection.query(
        "UPDATE EVENT SET DATA = ?, RA_TEACH = ? WHERE DESCRIPTION = ?",
        [data, ra_teach, description]
      );
      if (results.affectedRows > 0) {
        res.json({ message: "Event updated successfully" });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Delete an event by DESCRIPTION
  router.delete("/events/:description", async (req, res) => {
    const { description } = req.params;
    try {
      const [results] = await DBConnection.query("DELETE FROM EVENT WHERE DESCRIPTION = ?", [description]);
      if (results.affectedRows > 0) {
        res.json({ message: "Event deleted successfully" });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Get all matters
router.get("/matters", async (req, res) => {
    try {
      const [results] = await DBConnection.query("SELECT * FROM MATTER");
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Get matters by RA_TEACH
  router.get("/matters/:ra_teach", async (req, res) => {
    const { ra_teach } = req.params;
    try {
      const [results] = await DBConnection.query("SELECT * FROM MATTER WHERE RA_TEACH = ?", [ra_teach]);
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ message: "Matters not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Create a new matter
  router.post("/matters", async (req, res) => {
    const { matter, ra_teach, id_class } = req.body;
    try {
      const [results] = await DBConnection.query(
        "INSERT INTO MATTER (MATTER, RA_TEACH, ID_CLASS) VALUES (?, ?, ?)",
        [matter, ra_teach, id_class]
      );
      res.status(201).json({ message: "Matter created successfully", id: results.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Update a matter by ID_CLASS and RA_TEACH
  router.put("/matters/:id_class/:ra_teach", async (req, res) => {
    const { id_class, ra_teach } = req.params;
    const { matter } = req.body;
    try {
      const [results] = await DBConnection.query(
        "UPDATE MATTER SET MATTER = ? WHERE ID_CLASS = ? AND RA_TEACH = ?",
        [matter, id_class, ra_teach]
      );
      if (results.affectedRows > 0) {
        res.json({ message: "Matter updated successfully" });
      } else {
        res.status(404).json({ message: "Matter not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Delete a matter by ID_CLASS and RA_TEACH
  router.delete("/matters/:id_class/:ra_teach", async (req, res) => {
    const { id_class, ra_teach } = req.params;
    try {
      const [results] = await DBConnection.query("DELETE FROM MATTER WHERE ID_CLASS = ? AND RA_TEACH = ?", [
        id_class,
        ra_teach,
      ]);
      if (results.affectedRows > 0) {
        res.json({ message: "Matter deleted successfully" });
      } else {
        res.status(404).json({ message: "Matter not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = router;
