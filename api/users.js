const express = require('express');
const { getUserByUsername, createUser, getUser, getPublicRoutinesByUser } = require('../db');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { requireUser } = require('./utils');

usersRouter.post('/register', async (req, res, next) => {
  const {username, password} = req.body;
  try {
    if (!username || !password) {
      throw new Error('username and password must be submitted')
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    const user = await getUserByUsername(username);
    if (user) {
      throw new Error('Username already exists');
    } else {      
      let user = await createUser(req.body);
      res.send({'user' : user})
    }
  } catch (error) {
    next(error);
  }
})
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error('username and password must be submitted')
  }
  try {
    const user = await getUser(req.body);
    if (user) {
      const token = jwt.sign({ id: user.id , username: user.username}, process.env.JWT_SECRET)
      res.send({ message: "you're logged in!", token: token });
    } else {
      throw new Error('password incorrect')
    }
  } catch(error) {
    next(error);
  }
});
usersRouter.get('/me', requireUser, async (req,res,next)=>{
  let {username} = req.user;
  try{
    let userInfo= await getUserByUsername(username);
    res.send(userInfo);
  }catch(error) {
    next(error);
  }
})
usersRouter.get('/:username/routines', async (req,res,next)=>{
  try{
    let publicRoutines = await getPublicRoutinesByUser({'username' : req.params.username});
    res.send(publicRoutines);
  }catch(error) {
    next(error);
  }
})

module.exports = usersRouter;