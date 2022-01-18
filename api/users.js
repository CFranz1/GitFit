const express = require('express');
const { getUserByUsername, createUser } = require('../db');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

usersRouter.post('/register', async (req, res, next) => {
  const {username, password} = req.body;

  // if (username && password) {
  //   console.log("========>", username, password);
  //   if (password.length < 7) {
  //     throw new Error('Password must be at least 8 characters');
  //   }
  //   try {
  //     console.log("username and password % =======>", username, password);
  //     const user = await getUserByUsername(username);
  //     if (user) {
  //       throw new Error('Username already exists');
  //     } else {
  //       await createUser(username, password);
  //       res.send({message: 'Account created successfully, please log in!'})
  //     }

  //   } catch (error) {
  //     throw error;
  //   }
  // } else {
  //   throw new Error('Must provide a username and password');
  // }
})

module.exports = usersRouter;