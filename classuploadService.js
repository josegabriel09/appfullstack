const mysql = require('mysql2/promise');

async function insertClasses(classes) {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '122428',
            database: 'demotutorial'
        });

        for (const classe of classes) {
            await connection.query('INSERT INTO CLASS (CLASSNAME, LETTER, MODALITY) VALUES (?, ?, ?)', [
                classe.classname, 
                classe.letter, 
                classe.modality
            ]);
        }

        await connection.end();

        console.log("Inserção das informações das classes no banco de dados concluída.");
        return classes;
    } catch (error) {
        console.error("Erro durante a inserção das informações das classes no banco de dados:", error);
        throw new Error("Erro durante a inserção das informações das classes no banco de dados.");
    }
}

module.exports = {
    insertClasses
};
