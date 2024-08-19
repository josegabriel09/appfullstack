const DBConnection = require("../configs/connectDB");
const bcryptjs = require("bcryptjs");

let updatePassword = (id, password, isStudent) => {
    return new Promise(async(resolve, reject) => {

        // Hash password
        let salt = bcryptjs.genSaltSync(10);
            
        try {
            // Hash the new password
            const hashedPassword =  bcryptjs.hashSync(password, salt); // 10 is the salt rounds

            // Check if the user exists before updating their password
            const userQuery = isStudent === "true" ?
                'SELECT * FROM STUDENT WHERE RASTUD = ?' :
                'SELECT * FROM COLLABORATOR WHERE RACOLLAB = ?';

            console.log("User query:", userQuery); // Log the user query

            const userResult = await DBConnection.query(userQuery, [id]);

            console.log("User result:", userResult); // Log the user query result

            // Check if the user exists
            if (userResult.length === 0 || userResult[0].length === 0) {
                console.log("User not found:", id); // Log that user is not found
                return reject({ status: 404, message: 'User not found' });
            }

            // Update user's password in the database with the hashed password
            const updateQuery = isStudent === "true" ?
                'UPDATE STUDENT SET PASSWORD = ? WHERE RASTUD = ?' :
                'UPDATE COLLABORATOR SET PASSWORD = ? WHERE RACOLLAB = ?';

            console.log("Update query:", updateQuery); // Log the update query

            const updateResult = await DBConnection.query(updateQuery, [hashedPassword, id]);

            // Check if the update operation succeeded
            if (updateResult.affectedRows === 0) {
                console.log("Password update failed for user:", id); // Log that password update failed
                return reject({ status: 500, message: 'Failed to update password' });
            }

            resolve({ message: 'Password updated successfully' });
        } catch (error) {
            console.error('Error updating password:', error); // Log any errors
            reject({ status: 500, message: 'Internal server error' });
        }
    });

};

let deleteStudentsByClassId = (id) => {
    console.log("delete studends by class id service")
    console.log(JSON.stringify(id))

    try {
        // SQL query to delete students by class ID
        const sql = 'DELETE FROM STUDENT WHERE ID_CLASS = ?';

        // Execute the SQL query
        const results = DBConnection.query(sql, [id]);

        if (results.affectedRows > 0) {

            return true; // Deletion successful
        } else {
            return false; // No students deleted (maybe class ID not found)
        }
    } catch (error) {
        throw error;
    }
}


// let deleteStudentsByClassId = (id) => {
//     try {
//         // SQL query to delete students by class ID
//     const sql = 'DELETE FROM students WHERE ID_CLASS = ?';
  
//     // Execute the SQL query
//     const [results] = DBConnection.query(sql, [id], (err, result) => {
//     //   if (err) {
//     //     console.error('Error deleting students: ' + err.message);
//     //     res.status(500).json({ error: 'Internal Server Error' });
//     //     return;
//     //   }
  
//     //   // Respond with success message
//     //   res.json({ message: 'Students deleted successfully' });
//     // });

//     // }catch (e) {
//     //     console.error('Error deleting students: ' + err.message);
//     //     res.status(500).json({ error: 'Internal Server Error' });

//     }
//     if (results.affectedRows > 0) {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       throw error;
//     }
// }

module.exports = {
    updatePassword,
    deleteStudentsByClassId
};
