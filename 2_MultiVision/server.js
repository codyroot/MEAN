var express = require('express'),
    mongoose = require('mongoose'),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    app = express(),
    expressConfig = require("./server/config/express"),
    routeHandler = require("./server/config/routeHandler"),
    db = require("./server/config/db"),
    config = {
        rootPath: __dirname
    },
    User;

/**
 * Express Config
 */
expressConfig(app, config);

/**
 * Init DB
 */
db(mongoose);

/**
 * Login Auth
 */
User = mongoose.model("User");
/**
 * Tell passport to use a local strategy
 * The User + PW comes from the own DB
 * its also possible to use a Facebook or Twitter Login
 */
passport.use(new LocalStrategy(function (username, password, done) {
    console.log("USE");
    User.findOne({username: username}).exec(function (err, user) {
        if (user) {
            console.dir(user);
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

// Tell passport to serialize an User
passport.serializeUser(function (user, done) {
    console.log("serializeUser");
    if (user) {
        return done(null, user._id);
    }
});

// Tell passport to deserialize an User
passport.deserializeUser(function (id, done) {
    console.log("deserializeUser");
    User.findOne({_id: id}).exec(function (err, user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});


/**
 * Init Routing(with the Data)
 */
routeHandler(app);

/**
 * Export Module
 */
module.exports = app;