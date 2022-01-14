const {client} = require('./client.js')

async function getAllActivities(id) {

    try{
      const { rows } = await client.query(`
      SELECT * FROM activities;
      `, []);
      return rows
  }catch(err){
      console.log('trouble in getAllActivities!',err)
  }
}
async function getActivityById(id) {

    try{
      const { rows : [activity] } = await client.query(`
      SELECT *
      FROM activities
      WHERE ID=($1);
      `, [id]);
      return activity
  }catch(err){
      console.log('trouble in getActivityById!',err)
  }
}

async function createActivity ({ name, description }) {

    try{
      const { rows : [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES ($1, $2)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
      `, [name, description]);
      return activity;
  }catch(err){
      console.log('trouble in createActivity!',err)
  }
}
async function updateActivity ({ id, name, description }) {
    try{
      const { rows: [activities]} = await client.query(`
        UPDATE activities
        SET name = $1, description = $2
        WHERE id=${id}
        RETURNING *;
        `, [name, description]);
      return activities
  }catch(err){
      console.log('trouble in updateActivity!',err)
  }
}







module.exports = {
  getActivityById,
  getAllActivities,
  createActivity,
  updateActivity
}