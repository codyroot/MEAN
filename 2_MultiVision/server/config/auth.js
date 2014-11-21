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