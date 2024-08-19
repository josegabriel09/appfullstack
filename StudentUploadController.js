const studentUploadService = require("../services/StudentUploadService");
const { Readable } = require('stream');
const readline = require('readline');
const nodemailerConfig = require('../configs/nodemailerConfig');
const registerService = require('../services/registerService')
async function uploadStudentFile(req, res) {
    try {
        const { file } = req;
        const { buffer } = file;
        const data = req.body;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const studentLine = readline.createInterface({
            input: readableFile
        });

        const students = []; 
        

        studentLine.on('line', (line) => {
            const studentLineSplit = line.split(",");
           

            let student = {
                fullname: studentLineSplit[0],
                email: studentLineSplit[1],
                isStudent: data.isStudent,
                idClass: data.idClass,
                
            };
            students.push(student);
        });

        studentLine.on('close', async () => {
            console.log("Leitura do arquivo de alunos concluída.");

            let insertedStudents = []
            for (let i = 0; i < students.length; i++) {
                const insertedStudent = await registerService.createNewUser(students[i]); //Como o usuário vai saber o IDCLASS daquela turma?
                insertedStudents.push(insertedStudent);
                
                await nodemailerConfig.sendEmail(insertedStudent.id, insertedStudent.email);

            }
            return res.json({ 'students': insertedStudents });
        });
    } catch (error) {
        console.error("Erro durante o processamento do arquivo de alunos:", error);
        return res.status(500).send("Erro durante o processamento do arquivo de alunos.");
    }
}

module.exports = {
    uploadStudentFile
};
