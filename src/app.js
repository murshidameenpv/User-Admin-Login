const express = require("express");
const dotenv = require("dotenv").config({ path: '.env' });
const morgan = require("morgan")
const path = require('path');
const noCache = require('nocache');
const session = require("express-session");
const { v4:uuidv4 } = require("uuid");  
const bodyParser = require("body-parser");
require("./db/mongodb")


const app = express();
const port = process.env.PORT || 3000;

app.use(session({ //This uuid method will make a random string for hiding from user
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

//logs all http requests
app.use(morgan("tiny"));

app.use(noCache());

//Parse request to body-parser
app.use(bodyParser.json());//body parser is a middleware responsible for parsing incoming request bodies
app.use(express.urlencoded({extended:false}))

//set view engine
app.set('view engine', 'ejs');

//load assets
app.use(express.static('public'));

//Load routers
app.use('/',require('./routes/routes'))


app.listen(port, () => {
    console.log(`Server Listening on port http://localhost:${port}`);
});