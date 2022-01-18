// require and re-export all files in this db directory (users, activities...)
const {createUser, getUser,  getUserById, getUserByUsername} = require('./users.js');
const {getActivityById, getAllActivities, createActivity, updateActivity} = require('./activities.js');
const {createRoutine, getRoutinesWithoutActivities, getAllRoutines, getAllPublicRoutines, getAllRoutinesByUser,getPublicRoutinesByUser,getPublicRoutinesByActivity,getRoutineById,updateRoutine,destroyRoutine} = require('./routines');
const {addActivityToRoutine, getRoutineActivityById, updateRoutineActivity, destroyRoutineActivity, getRoutineActivitiesByRoutine} = require('./routine_activities');



module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivity,
    createRoutine,
    getRoutinesWithoutActivities,
    addActivityToRoutine,
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    getRoutineById,
    updateRoutine,
    destroyRoutine,
    getRoutineActivityById,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine
  }