var passport = require("passport");

/**
 * Handles Login Behavior
 *
 * @param req
 * @param res
 * @param next
 */
exports.authenticate = function (req, res, next) {
    var auth = passport.authenticate("local", function (err, user/*, info*/) {
        console.log("passport.authenticate");
        if (err) {
            return next(err);
        }

        // If no user is found send this to the client
        if (!user) {
            res.send({success: false});
        }

        // If user is found + pw ist matching send this to the client
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send({success: true, user: user});
        });
    });
    auth(req, res, next);
};

/**
 * check if User is authorized to look into the URL
 */
exports.requiresApiLogin = function (req, res, next) {
    /**
     * isAuthenticated is a passport fn
     */
    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

/**
 * Check if the User has the right to view a page
 */
exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
};