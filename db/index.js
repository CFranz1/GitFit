// require and re-export all files in this db directory (users, activities...)
const {createUser, getUser, getUserById, getUserByUsername} = require('./users.js')
const {getActivityById, getAllActivities, createActivity, updateActivity} = require('./activities.js');



module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivity
  }