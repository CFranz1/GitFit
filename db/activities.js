const {client} = require('client.js')

async function getActivityById(id) {

    try{
      const { rows } = await client.query(`
      SELECT *
      FROM activities
      WHERE ID=($1);
      `, [id]);
      return rows
  }catch(err){
      console.log('trouble in getActivityById!',err)
  }
}
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
async function createActivity ({ name, description }) {

    try{
      const { rows } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES ($1, $2)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
      `, [name, description]);
      return rows
  }catch(err){
      console.log('trouble in createActivity!',err)
  }
}
async function updateActivity ({ id, name, description }) {

    try{
      const { rows } = await client.query(`
      UPDATE activities(name, description)
      SET ($1, $2)
      WHERE id=${id}
      RETURNING *;
      `, [name, description]);
      return rows
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