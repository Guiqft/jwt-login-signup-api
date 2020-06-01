//connection with database
const connection = require('../database/connection');

//package that we will need in order to salt and hash users passwords.
const bcrypt = require('bcrypt');

//function to list all the registered users
const list = async (request, response) => {
    const users = await connection('users').select('*');
    return response.json(users);
};

//make a new user register
const save = async (user) => {
    const { name, surname, email, password, type } = user;

    return await connection('users')
        .insert({
            createdAt: new Date().toISOString(),
            name,
            surname,
            email,
            password: await hashPassword(password),
            type,
        })
        .then((response) => response) //returning the 'response' back
        .catch((err) => { console.log(err); throw err });
};

//function to make a hash to password, so can be stored safely in our database.
const hashPassword = async (plaintextPassword) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plaintextPassword, salt);
}

//function to get the user in the database that email matches with the requested email
const getUserByEmail = (email) => 
    connection('users')
        .where({ email })
        .first()
        .catch(err => { console.log(err); throw err });

//export modules for external use
module.exports = { save, list, getUserByEmail }