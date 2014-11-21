var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    mongoose = require("mongoose");
/**
 * Login Auth with DB Query
 */
module.exports = function (app) {
    var User = mongoose.model("User");
    /**
     * Tell passport to use a local strategy
     * The User + PW comes from the own DB
     * its also possible to use a Facebook or Twitter  etc. Login
     *
     * Callstack of passport::
     * 1. User changed --> deserializeUser
     * 2. USE
     * 3. Authenticate
     * 4. serializeUser
     */
    passport.use(new LocalStrategy(function (username, password, done) {
        console.log("passport.use");
        // Custom code zo verify username + password
        User.findOne({username: username}).exec(function (err, user) {
            if (user && user.authenticate(password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    /**
     * Custom Middleware
     */
    app.use(function (req, res, next) {
        console.log(req.user);
        next();
    });

// Tell passport to serialize an User || Session Cookie
    passport.serializeUser(function (user, done) {
        console.log("passport.serializeUser");
        if (user) {
            return done(null, user._id);
        }
    });

// Tell passport to deserialize an User ||Drop Session Cookie, if user changes
    passport.deserializeUser(function (id, done) {
        console.log("passport.deserializeUser");
        User.findOne({_id: id}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
};