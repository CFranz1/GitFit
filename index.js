// create the express server here
require('dotenv').config();
const path = require('path');

const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;

const morgan = require('morgan');
server.use(morgan('dev'));

const bodyParser = require('body-parser')
const cors = require('cors');
const { client } = require('./db/client');

server.use(cors());

const path = require("path");
server.use(express.static(path.join(__dirname, "build")));



client.connect();
server.use(express.json())

server.use(bodyParser.json())
server.use((req, res, next) => {
  console.log("Body is now", req.body);
  next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.use((err, req, res, next) => {
  //console.log(error)
  res.status(500).send({ 'error': err.stack });


});


server.listen(PORT, async () => {
  console.log('The server is up on port', PORT)
});