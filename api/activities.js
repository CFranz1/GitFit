const express = require('express');
const { getAllActivities, createActivity, updateActivity, getPublicRoutinesByActivity } = require('../db');
const activitiesRouter = express.Router();
const { requireUser } = require('./utils');

activitiesRouter.get('/', async (req,res,next)=>{
    try{
        let activites = await getAllActivities();
        res.send(activites);
    }catch(error){
        next(error);
    }
})
activitiesRouter.post('/', requireUser, async (req,res,next)=>{
    try{
        let newActivity = await createActivity(req.body);
        res.send(newActivity);
    }catch(error){
        next(error);
    }
})
activitiesRouter.patch('/:activityId', requireUser, async (req,res,next)=>{
    let info=req.body;
    info['id']=req.params.activityId;
    try{
        let updatedActivity = await updateActivity(info);
        res.send(updatedActivity);
    }catch(error){
        next(error);
    }
})
activitiesRouter.get('/:activityId/routines', async (req,res,next)=>{
    try{
        let publicRoutines = await getPublicRoutinesByActivity(req.params.activityId);
        res.send(publicRoutines);
    }catch(error){
        next(error);
    }
})


module.exports = activitiesRouter;