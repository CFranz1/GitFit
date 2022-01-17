// create the express server here
require('dotenv').config();
const { PORT = 3000 } = process.env
const express = require('express');
const server = express();
const morgan = require('morgan');
const cors = require('cors');
const { client } = require('./db/client');
server.use(morgan('dev'));
server.use(cors());

server.use(express.json())

const apiRouter = require('./api');
server.use('/api', apiRouter);


client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});