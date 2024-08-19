const mysql = require('mysql2/promise');

async function insertStudents(students) {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '122428',
            database: 'demotutorial'
        });

        for (const student of students) {
            await connection.query('INSERT INTO STUDENT (RASTUD, ID_CLASS, FULLNAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?, ?)', [
                student.rastud,
                student.classname,
                student.fullname,
                student.email,
                student.password
            ]);
        }

        await connection.end();

        console.log("Inserção dos alunos no banco de dados concluída.");
        return students;
    } catch (error) {
        console.error("Erro durante a inserção dos alunos no banco de dados:", error);
        throw new Error("Erro durante a inserção dos alunos no banco de dados.");
    }
}

module.exports = {
    insertStudents
};
