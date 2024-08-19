const classuploadService = require("../services/classuploadService");
const { Readable } = require('stream');
const readline = require('readline');

async function uploadClassFile(req, res) {
    try {
        const { file } = req;
        const { buffer } = file;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const classLine = readline.createInterface({
            input: readableFile
        });

        const classes = []; 

        classLine.on('line', (line) => {
            const classLineSplit = line.split(",");
            const classe = {
                classname: classLineSplit[0],
                letter: classLineSplit[1],
                modality: classLineSplit[2]
            };
            classes.push(classe);
        });

        classLine.on('close', async () => {
            console.log("Leitura do arquivo de classes concluída.");

            const insertedClasses = await classuploadService.insertClasses(classes);
            return res.json(insertedClasses);
        });
    } catch (error) {
        console.error("Erro durante o processamento do arquivo de classes:", error);
        return res.status(500).send("Erro durante o processamento do arquivo de classes.");
    }
}

module.exports = {
    uploadClassFile
};
