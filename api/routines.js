const express = require('express');
const { getAllPublicRoutines, createRoutine, getRoutineById, updateRoutine, destroyRoutine } = require('../db');
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
        let newRoutine = await createRoutine(info);
        res.send(newRoutine);
    }catch(error){
        next(error);
    }
})
routinesRouter.patch('/:routineId', requireUser, async (req,res,next)=>{
    try{
        let routineToBeUpdated = await getRoutineById(req.params.routineId);
        if (req.user.id != routineToBeUpdated.creatorId)
            throw new Error(`Can't update routines you did not create`);
        let info = req.body;
        info['id'] = req.params.routineId;
        let updatedRoutine = await updateRoutine(info);
        res.send(updatedRoutine);
    }catch(error){
        next(error);
    }
})
routinesRouter.delete('/:routineId', requireUser, async (req,res,next)=>{
    try{
        let routineToBeDeleted = await getRoutineById(req.params.routineId);
        if (req.user.id != routineToBeDeleted.creatorId)
            throw new Error(`Can't delete routines you did not create`);
        await destroyRoutine(req.params.routineId);
        res.send(routineToBeDeleted);
    }catch(error){
        next(error);
    }
})

module.exports = routinesRouter;