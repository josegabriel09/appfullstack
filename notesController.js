const notesService = require("../services/notesService");

let getAllNotes = async (req, res) => {
  try {
    const { RASTUD } = req.query;
    const notes = await notesService.getAllNotes(RASTUD);
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let getNoteByRASTUD = async (req, res) => {
  const { RASTUD } = req.params;
  try {
    const note = await notesService.getNoteByRASTUD(RASTUD);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let createNote = async (req, res) => {
  const {
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
  } = req.body;
  try {
    const createdNote = await notesService.createNote(
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
    );
    res
      .status(201)
      .json({ message: "Nota adicionada com sucesso!", id: createdNote });
      console.log(res.message)
  } catch (error) {
    if (error.code === 'ER_BAD_NULL_ERROR' || error.errno === 1048) {
      return res.status(400).json({ error: "É necessário escolher um estudante!" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let updateNote = async (req, res) => {
  const { RASTUD } = req.params;
  const { ID } = req.params;

  console.log(RASTUD)
  console.log(ID)
  const {
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
  } = req.body;
  try {
    const updated = await notesService.updateNote(
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
    );
    if (updated) {
      res.json({ message: "Note updated successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let deleteNote = async (req, res) => {
  const { RASTUD } = req.params;
  try {
    const deleted = await notesService.deleteNote(RASTUD);
    if (deleted) {
      res.json({ message: "Note deleted successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllNotes: getAllNotes,
  getNoteByRASTUD: getNoteByRASTUD,
  createNote: createNote,
  updateNote: updateNote,
  deleteNote: deleteNote,
};
