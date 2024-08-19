const mysql = require('mysql2/promise');

async function insertNotes(notes) {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '122428',
            database: 'demotutorial'
        });

        for (const note of notes) {
            await connection.query(
                'INSERT INTO NOTE (RASTUD, LINGUA_PORTUGUESA, ARTES, EDUCACAO_FISICA, MATEMATICA, BIOLOGIA, FISICA, QUIMICA, HISTORIA, GEOGRAFIA, FILOSOFIA, SOCIOLOGIA, ELETIVA, RESULTADO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                [
                    note.rastud, 
                    note.lingua_portuguesa, 
                    note.artes, 
                    note.educacao_fisica, 
                    note.matematica,
                    note.biologia,
                    note.fisica,
                    note.quimica,
                    note.historia,
                    note.geografia,
                    note.filosofia,
                    note.sociologia,
                    note.eletiva,
                    note.resultado
                ]
            );
        }

        await connection.end();

        console.log("Inserção das notas no banco de dados concluída.");
        return notes;
    } catch (error) {
        console.error("Erro durante a inserção das notas no banco de dados:", error);
        throw new Error("Erro durante a inserção das notas no banco de dados.");
    }
}

module.exports = {
    insertNotes
};
