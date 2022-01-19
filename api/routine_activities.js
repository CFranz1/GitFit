const express = require('express');
const { updateRoutineActivity, getRoutineById, getRoutineActivityById, destroyRoutineActivity } = require('../db');
const routine_ActivitiesRouter = express.Router();
const { requireUser } = require('./utils');


routine_ActivitiesRouter.patch('/:routineActivityId', requireUser, async (req,res,next) =>{
    let info = {};
    info['count']= req.body.count;
    info['duration']= req.body.duration;
    info['id']= req.params.routineActivityId;
  try {
    //getting routine id
    let precheck = await getRoutineActivityById(info.id);
    //need creatorId from routines
    let check = await getRoutineById(precheck.routineId);
    if (req.user.id != check.creatorId)
        throw new Error(`Can't update routines you did not create`);
    
    let updatedRoutine = await updateRoutineActivity(info);
    res.send(updatedRoutine);

    }catch(error) {
    next(error);}
})

routine_ActivitiesRouter.delete('/:routineActivityId', requireUser, async (req,res,next) =>{
  try {
    //getting routine id
    let precheck = await getRoutineActivityById(req.params.routineActivityId);
    //need creatorId from routines
    let check = await getRoutineById(precheck.routineId);
    if (req.user.id != check.creatorId)
        throw new Error(`Can't update routines you did not create`);
    
    let deleted = await destroyRoutineActivity(req.params.routineActivityId);
    res.send(deleted);

    }catch(error) {
    next(error);}
})

module.exports = routine_ActivitiesRouter;