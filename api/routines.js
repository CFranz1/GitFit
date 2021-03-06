const express = require('express');
const { getAllPublicRoutines, createRoutine, getRoutineById, updateRoutine, destroyRoutine, addActivityToRoutine, getRoutineActivitiesByRoutine, getRoutinebyName } = require('../db');
const routinesRouter = express.Router();
const { requireUser } = require('./utils');

routinesRouter.get('/', async (req,res,next)=>{
    try{
        let routines = await getAllPublicRoutines();
        res.send(routines);
    }catch(error){
        next(error);
    }
})
routinesRouter.post('/', requireUser, async (req,res,next)=>{
    let info = req.body;
    info['creatorId'] = req.user.id;
    try{
        //need to see if routine already exists by that name
        let isNameConflict= await getRoutinebyName(info.name)
        if (isNameConflict)
            res.send({'error': "A routine by that name already exists"})
        let newRoutine = await createRoutine(info);
        console.log(newRoutine)
        res.send({'success' : 'New Routine Created!'});
    }catch(error){
        next(error);
    }
})
routinesRouter.patch('/:routineId', requireUser, async (req,res,next)=>{
    try{
        console.log(req.params.routineId)
        let routineToBeUpdated = await getRoutineById(req.params.routineId);
        if (req.user.id != routineToBeUpdated.creatorId)
            res.send({'error' : `Can't update routines you did not create`});
        let info = req.body;
        info['id'] = req.params.routineId;
        let updatedRoutine = await updateRoutine(info);
        res.send({success : "Post edited successfully!"});
    }catch(error){
        next(error);
    }
})
routinesRouter.delete('/:routineId', requireUser, async (req,res,next)=>{
    try{
        let routineToBeDeleted = await getRoutineById(req.params.routineId);
        if (req.user.id != routineToBeDeleted.creatorId)
            res.send({ error : `Can't delete routines you did not create`});
        await destroyRoutine(req.params.routineId);
        res.send({success: "Routine susessfully deleted"});
    }catch(error){
        next(error);
    }
})
routinesRouter.post('/:routineId/activities', async (req,res,next)=>{
    
    let routineId= req.params.routineId;
    let {activityId, count, duration} = req.body;
    let info ={}
    info['activityId']=activityId;
    info['routineId']=routineId;
    info['count']=count;
    info['duration']=duration;    
    try{
        //preventing duplicates
        let check = await getRoutineActivitiesByRoutine({ 'id' : routineId});
        check.forEach((element) =>{
            if (element.activityId == activityId)
                throw new Error('Activity already added to Routine');
        })            
        let updatedRoutineActivity = await addActivityToRoutine(info);
        res.send(updatedRoutineActivity);
    }catch(error){
        next(error);
    }
})




module.exports = routinesRouter;