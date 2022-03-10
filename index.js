// create the express server here
require('dotenv').config();

const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json());

const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

const apiRouter = require('./api');
server.use('/api', apiRouter);



server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const { client } = require('./db/client');


server.use((err, req, res, next) => {
  res.status(500).send({ 'error': err.stack });
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});

