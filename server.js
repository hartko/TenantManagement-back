/*This file contains the imports used in the application*/

// import express
const express = require('express');

// import cors, API
const cors = require('cors');
// import mongoose, for schemas
const mongoose = require('mongoose');
// handles json
const bodyParser = require('body-parser');

// import Database
// global.Tenant = require('./app/models/Tenant');
// import routes
const routes = require('./app/routes/tenantRoutes');

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);


// Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/Tenant';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
// var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(clientListener()); // checks and identify valid clients
// app.use(setclientdb());// sets db for valid clients
// Create models using mongoose connection for use in controllers
//Import the mongoose module

routes(app);

// // require your models directory
// var models = require('./app/models');
//



app.listen(port);

console.log(`Server started on port ${port}`);
