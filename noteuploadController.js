const noteuploadService = require("../services/noteuploadService");
const readline = require('readline');
const { Readable } = require('stream');

async function uploadNoteFile(req, res) {
    try {
        const { file } = req;
        const { buffer } = file;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const noteLine = readline.createInterface({
            input: readableFile
        });

        const notes = [];

        noteLine.on('line', (line) => {
            const noteLineSplit = line.split(",");
            const note = {
                rastud: noteLineSplit[0],
                lingua_portuguesa: noteLineSplit[1],
                artes: noteLineSplit[2],
                educacao_fisica: noteLineSplit[3],
                matematica: noteLineSplit[4],
                biologia: noteLineSplit[5],
                fisica: noteLineSplit[6],
                quimica: noteLineSplit[7],
                historia: noteLineSplit[8],
                geografia: noteLineSplit[9],
                filosofia: noteLineSplit[10],
                sociologia: noteLineSplit[11],
                eletiva: noteLineSplit[12],
                resultado: noteLineSplit[13]
            };
            notes.push(note);
        });

        noteLine.on('close', async () => {
            console.log("Leitura do arquivo de notas concluída.");

            const insertedNotes = await noteuploadService.insertNotes(notes);
            return res.json(insertedNotes);
        });
    } catch (error) {

        if (error.code === 'ER_BAD_NULL_ERROR' || error.errno === 1048) {
            return res.status(400).json({ error: "É necessário escolher um estudante!" });
          }
        console.error("Erro durante o processamento do arquivo de notas:", error);
        return res.status(500).send("Erro durante o processamento do arquivo de notas.");
    }
}

module.exports = {
    uploadNoteFile
};
