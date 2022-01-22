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
      res.send( {'error' : 'username and password must be submitted'});
    }
    if (password.length < 8) {
      res.send({'error' : 'Password must be at least 8 characters'});
    }
    const user = await getUserByUsername(username);
    if (user) {
      res.send({'error' : 'Username already exists'});
    } else {      
      let user = await createUser(req.body);
      res.send({'success' : user})
    }
  } catch (error) {
    next(error);
  }
})
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  console.log('login post is getting called')
  if (!username || !password) {
    res.send({'error' : 'username and password must be submitted'})
  }
  try {
    const user = await getUser(req.body);
    if (user) {
      const token = jwt.sign({ id: user.id , username: user.username}, process.env.JWT_SECRET)
      res.send({ message: `Welcome back ${username}!`, token: token });
    } else {
      res.send({'error' : 'Username or Password Incorrect!'})
    }
  } catch(err) {
    next(err)
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