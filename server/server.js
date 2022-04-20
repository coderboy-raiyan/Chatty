/* eslint-disable import/no-extraneous-dependencies */
const app = require('express')();
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 5000;
const routes = require('./routes/index');
const connectDb = require('./db/connectDb');

app.use(express.json());
app.use(cors());

// db connect
connectDb();

app.get('/', (req, res) => {
    res.send('hello world');
});

// all routes
app.use('/api', routes);

app.listen(port, () => {
    console.log('listen on port....');
});
