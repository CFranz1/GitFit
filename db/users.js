const {client} = require('./client.js');
const bcrypt = require('bcrypt');

async function createUser({username, password}){
    // they gave us this code in https://learn.fullstackacademy.com/workshop/5eb185416a449000046b2bf9/content/5eb187176a449000046b2c56/text
    // i dont understand it yet
    // const SALT_COUNT = 10;
    // bcrypt.hash(password, SALT_COUNT, function(err, hashedPassword) {
    // createUser({
    // username,
    // password: hashedPassword // not the plaintext
    // });
    // });
    try{
        const { rows } = await client.query(`
        INSERT INTO users(username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password]);
        return rows
    }catch(err){
        console.log('trouble in createUser!',err)
    }
}
// async function getUser({username,password}){
// const user = await getUserByUserName(username);
// const hashedPassword = user.password;

// bcrypt.compare(password, hashedPassword, function(err, passwordsMatch) {
//   if (passwordsMatch) {
//     // return the user object (without the password)
//   } else {
//     throw SomeError;
//   }
// });
// }
async function getUserById(id){
    //did not test yet

    try{
        const { rows } = await client.query(`
        SELECT ID,username
        FROM users
        WHERE ID=($1);
        `, [id]);
        return rows
    }catch(err){
        console.log('trouble in createUser!',err)
    }
}

async function getUserbyUserName(username){
    //did not test yet
    try{
        const { rows } = await client.query(`
        SELECT *
        FROM users
        WHERE username=($1);
        `, [username]);
        return rows
    }catch(err){
        console.log('trouble in createUser!',err)
    }
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
}