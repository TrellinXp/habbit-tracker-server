// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();
const session = require('express-session');
const passport = require('passport');

// Passport initial setup
require('./config/passport');

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Session settings: allows our app to maintain the sessions and our users in it
app.use(
    session({
      secret: 'some secret goes here',
      resave: true,
      saveUninitialized: false
    })
  );

// To allow our app to use passport for auth
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
const projectName = "habbit-tracker-server";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const habitRouter = require("./routes/habit.routes"); 
app.use('/api', habitRouter); 

const authRouter = require("./routes/auth.routes"); 
app.use('/api', authRouter); 

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
