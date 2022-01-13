const {client} = require('./client.js');

async function getRoutineById(id) {
  try {
    const {rows} = await client.query(`
      SELECT * FROM routines
      WHERE id=${id};
    `)
    return rows;
  } catch (err) {
    console.log('trouble in getRoutineById!', err);
  }
}

async function getRoutinesWithoutActivities(id) {
  try {
    const {rows} = await client.query(`
      SELECT * FROM routines;
    `)
    return rows;
  } catch (err) {
    console.log('trouble in getRoutinesWithoutActivities!', err);
  }
}
//async function getAllRoutines(id) {
//   try {
//     const {rows} = await client.query(`
//       SELECT rountines.id, creatorId, isPublic FROM routines;
//     `)
//     return rows;
//   } catch (err) {
//     console.log('trouble in getRoutinesWithoutActivities!', err);
//   }
// }

async function createRoutine({creatorId,isPublic,name,goal}){
  try {
    const {rows : [routine]} = await client.query(`
      INSERT INTO routines("creatorId","isPublic",name,goal)
      VALUES ($1,$2,$3,$4)
      ON CONFLICT (name) DO NOTHING 
      RETURNING *
    `,[creatorId,isPublic,name,goal])
    return routine;
  }catch(err){
  console.log('trouble in createRoutine', err);
  }
}

module.exports={
  createRoutine,
  getRoutinesWithoutActivities
}