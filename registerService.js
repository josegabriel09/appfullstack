
// const DBConnection = require("../configs/connectDB");
// const bcryptjs = require("bcryptjs");
// const classeService = require("../services/classeService")

// function generateRandomNumber() {
//     return Math.floor(10000 + Math.random() * 90000);
// }

// let createNewUser = async (data) => {
//     try {
//         console.log("Creating a new user...");
        
//         // Check if class provided exists
        
//         if (data.isStudent === "true") {
//             let studentIsInClass = await classeService.getClassById(data.idClass)
//             console.log("data.idClass " + JSON.stringify(data.idClass))

//             if (!studentIsInClass) {
//                 throw new Error(`This class "${data.idClass}" is not registered. Please choose another class.`);
//             }
//         }
        

//         console.log("Class ID exists. Proceeding with user creation...");

//         let salt = bcryptjs.genSaltSync(10);

//         let userItem = {
//             fullname: data.fullname,
//             email: data.email,
//             password: bcryptjs.hashSync(generateRandomNumber().toString(), salt)
//         };

//         let randomValue;
//         let inserted = false;

//         while (!inserted) {
//             randomValue = generateRandomNumber();

//             if (data.isStudent === "false") {
//                 userItem.RACOLLAB = randomValue.toString().padStart(5, '0');
//                 userItem.role = data.role;
//             }
            
//             if (data.isStudent === "true") {
//                 userItem.RASTUD = randomValue.toString().padStart(5, '0');
//             }

//             console.log("Generated random value:", randomValue);
//             console.log("Attempting to insert user with data:", userItem);

//             try {
//                 const query = data.isStudent === "true" ?
//                     'INSERT INTO STUDENT SET ?' :
//                     'INSERT INTO COLLABORATOR SET ?';

//                 const [rows, fields] = await DBConnection.query(query, userItem);

//                 if (rows.affectedRows > 0) {
//                     inserted = true;
//                     console.log("User inserted successfully!");

//                      // Construct the newUser object
//                     const newUser = {
//                         fullname: userItem.fullname,
//                         email: userItem.email,
//                         id: data.isStudent === "true" ? userItem.RASTUD : userItem.RACOLLAB,
//                         role: data.isStudent === "false" ? userItem.role : undefined // Include role only if isStudent is "false"
//                     };

//                     console.log("User creation successful.");
//                     return newUser;
//                 }
//             } catch (error) {
//                 if (error.code === 'ER_DUP_ENTRY') {
//                     console.log("Duplicate entry error. Trying again...");
//                     continue;
//                 } else {
//                     throw error;
//                 }
//             }
//         }

//         const message = data.isStudent === "true" ?
//             "Create a new student successful" :
//             "Create a new collaborator successful";

//         console.log("User creation successful.");
//         return message;
//     } catch (error) {
//         console.error("Error creating a new user:", error);
//         throw new Error(`Error creating a new user: ${error}`);
//     }
// };

// let checkExistEmail = async (email, isStudent) => {
//     try {
//         console.log("Checking if email exists...");
        
//         let query = isStudent === "true" ?
//             'SELECT COUNT(*) AS count FROM STUDENT WHERE EMAIL = ?' :
//             'SELECT COUNT(*) AS count FROM COLLABORATOR WHERE EMAIL = ?';

//         const [rows] = await DBConnection.query(query, [email]);
//         const emailExists = rows[0].count > 0;

//         console.log("Email exists:", emailExists);
//         return emailExists;
//     } catch (error) {
//         console.error("Error checking email existence:", error);
//         throw new Error(`Error checking email existence: ${error}`);
//     }
// };

// module.exports = {
//     createNewUser
// };


const DBConnection = require("../configs/connectDB");
const bcryptjs = require("bcryptjs");
const classeService = require("../services/classeService")

function generateRandomNumber() {
    return Math.floor(10000 + Math.random() * 90000);
}

let createNewUser = async (data) => {
    try {
        console.log("Creating a new user...");
        
        // Check if class provided exists
        
        if (data.isStudent === "true") {
            let studentIsInClass = await classeService.getClassById(data.idClass)
            console.log("data.idClass " + JSON.stringify(data.idClass))

            if (!studentIsInClass) {
                throw new Error(`This class "${data.idClass}" is not registered. Please choose another class.`);
            }
        }
        

        console.log("Class ID exists. Proceeding with user creation...");

        let salt = bcryptjs.genSaltSync(10);

        let userItem = {
            fullname: data.fullname,
            email: data.email,
            password: bcryptjs.hashSync(generateRandomNumber().toString(), salt)
        };

        let randomValue;
        let inserted = false;

        while (!inserted) {
            randomValue = generateRandomNumber();

            if (data.isStudent === "false") {
                userItem.RACOLLAB = randomValue.toString().padStart(5, '0');
                userItem.role = data.role;
            }
            
            if (data.isStudent === "true") {
                userItem.RASTUD = randomValue.toString().padStart(5, '0');
                userItem.id_class = data.idClass

                // userItem.ID_CLASS = data.idClass;
            }

            console.log("Generated random value:", randomValue);
            console.log("Attempting to insert user with data:", userItem);

            try {
                const query = data.isStudent === "true" ?
                    'INSERT INTO STUDENT SET ?' :
                    'INSERT INTO COLLABORATOR SET ?';

                const [rows, fields] = await DBConnection.query(query, userItem);

                if (rows.affectedRows > 0) {
                    inserted = true;
                    console.log("User inserted successfully!");

                     // Construct the newUser object
                    const newUser = {
                        fullname: userItem.fullname,
                        email: userItem.email,
                        id: data.isStudent === "true" ? userItem.RASTUD : userItem.RACOLLAB,
                        role: data.isStudent === "false" ? userItem.role : undefined // Include role only if isStudent is "false"
                    };

                    console.log("User creation successful.");
                    return newUser;
                }
            } catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    console.log("Duplicate entry error. Trying again...");
                    continue;
                } else {
                    throw error;
                }
            }
        }

        const message = data.isStudent === "true" ?
            "Create a new student successful" :
            "Create a new collaborator successful";

        console.log("User creation successful.");
        return message;
    } catch (error) {
        console.error("Error creating a new user:", error);
        throw new Error(`Error creating a new user: ${error}`);
    }
};

let checkExistEmail = async (email, isStudent) => {
    try {
        console.log("Checking if email exists...");
        
        let query = isStudent === "true" ?
            'SELECT COUNT(*) AS count FROM STUDENT WHERE EMAIL = ?' :
            'SELECT COUNT(*) AS count FROM COLLABORATOR WHERE EMAIL = ?';

        const [rows] = await DBConnection.query(query, [email]);
        const emailExists = rows[0].count > 0;

        console.log("Email exists:", emailExists);
        return emailExists;
    } catch (error) {
        console.error("Error checking email existence:", error);
        throw new Error(`Error checking email existence: ${error}`);
    }
};

module.exports = {
    createNewUser
};
