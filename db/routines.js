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
async function getAllRoutines(id) {
  try {
    const {rows} = await client.query(`
      SELECT rountines.id, creatorId, isPublic FROM routines;
    `)
    return rows;
  } catch (err) {
    console.log('trouble in getRoutinesWithoutActivities!', err);
  }
}

