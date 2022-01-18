const {client} = require('./client.js');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createUser({username, password}){
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    try{
        const { rows : [user] } = await client.query(`
        INSERT INTO users(username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, hashedPassword]);
        delete user.password;
        return user
    }catch(err){
        console.log('trouble in createUser!',err)
    }
}
async function getUser({username,password}){
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;    
    const result = await bcrypt.compare(password, hashedPassword)
    if (result) {
        delete user.password;
        return user;
    } else 
        return false;
    
}


async function getUserById(id){

    try{
        const { rows : [user] } = await client.query(`
        SELECT ID,username
        FROM users
        WHERE ID=($1);
        `, [id]);
        return user
    }catch(err){
        console.log('trouble in createUser!',err)
    }
}

async function getUserByUsername(username){
    
    try{
        const { rows : [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=($1);
        `, [username]);
        return user
    }catch(err){
        console.log('trouble in getUserByUsername!',err)
    }
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
}