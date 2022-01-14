// require and re-export all files in this db directory (users, activities...)
const {createUser, /*getUser when it works*/  getUserById, getUserByUsername} = require('./users.js');
const {getActivityById, getAllActivities, createActivity, updateActivity} = require('./activities.js');
const {createRoutine, getRoutinesWithoutActivities, getAllRoutines, getAllPublicRoutines} = require('./routines');
const {addActivityToRoutine} = require('./routine_activities');



module.exports = {
    createUser,
    //get user should go here when it works
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
    getAllPublicRoutines
  }