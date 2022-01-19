const {client} = require('./client.js')

async function getRoutineActivityById(id){
    try{
        const {rows : [RoutineActivity]} = await client.query(`
            SELECT *
            FROM routineActivities
            WHERE Id = ${id};
        `)

        return RoutineActivity;
    }catch(err)
    {
        console.log('trouble in getRoutineActivityById', err);
    }
}
async function addActivityToRoutine({routineId, activityId, count, duration}){
    try{
        const {rows : [routineActivities]} = await client.query(`
        INSERT INTO routineActivities("routineId","activityId",count,duration)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
        `,[routineId, activityId, count, duration])
        return routineActivities;
    }catch(err){
        console.log('trouble in addActivityToRoutine!',err)
    }
}
async function updateRoutineActivity({ id, count, duration }){
    let setString;
    if(count)
    {
        if (setString)
            setString = setString + ", " + `"count"='${count}'`;
    else
      setString = `"count"='${count}'`;
    }
    if(duration)
    {
        if (setString)
            setString = setString + ", " + `"duration"='${duration}'`;
    else
      setString = `"duration"='${duration}'`;
    }
    try {
        const {rows: [UpdatedActivity]} = await client.query(`
        UPDATE routineActivities
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `)
        return UpdatedActivity
    }catch (err){
        console.log('trouble in updateRoutineActivity!',err)
    }
}
async function destroyRoutineActivity(id){
    try {
        let {rows : [deletedActivity]} = await client.query(`
        DELETE FROM routineActivities
        WHERE Id=${id}
        RETURNING *;
        `)
        return deletedActivity
      }catch(err){
      console.log('trouble in destroyRoutine', err);
      }
}
async function getRoutineActivitiesByRoutine({id}){
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM routineActivities
        WHERE "routineId"=${id};
        `)
        return rows
      }catch(err){
      console.log('trouble in destroyRoutine', err);
      }
}

module.exports = {
    addActivityToRoutine,
    getRoutineActivityById,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine
}