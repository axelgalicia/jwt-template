//Based on this project
// https://scotch.io/tutorials/authenticate-a-node-es6-api-with-json-web-tokens#toc-plan-of-attack

const result = require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

//Routes
const routes = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



if(environment !== 'production') {
    const logger = require('morgan');
    app.use(logger('dev'));
}

app.use('/api/v1',routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost: ${stage.port}`);
});

module.exports = app;