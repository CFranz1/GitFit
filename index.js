// create the express server here
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const server = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors');
const { client } = require('./db/client');
server.use(morgan('dev'));
server.use(cors());

client.connect();
server.use(express.json())

server.use(bodyParser.json())
server.use((req,res,next) =>{
  console.log("Body is now", req.body);
  next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

//404 handler to be fixed at some point
// server.get("*",(req,res)=>{
//   res.send("Worlds Best 404 page")
// })

server.use((err, req, res, next) => {
  //console.log(error)
  res.status(500).send({'error' : err.stack});
  
  
});

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});