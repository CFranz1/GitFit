const {client} = require('./client.js')

async function getRoutineActivityById(){}
async function addActivityToRoutine({routineId, activityId, count, duration}){
    try{
        //do i need to add do nothings for routineID and activityId
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
async function updateRoutineActivity(){}
async function destroyRoutineActivity(){}
async function getRoutineActivitiesByRoutine(){}

module.exports = {
    addActivityToRoutine
}