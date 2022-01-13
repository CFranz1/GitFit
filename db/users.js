const {client} = requrie('.index');

export async function createUser(userInfo){
    let {username, password} = userInfo;

    try{
        const { rows } = await client.query(`
        INSERT INTO users(username, password) 
        VALUES($1, $2) 
        ON CONFLICT (username) DO NOTHING;
      `, [username, password]);
    }catch(err){
        console.log('trouble in createUser!',err)
    }
}