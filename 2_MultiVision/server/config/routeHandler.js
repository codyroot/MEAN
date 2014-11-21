var passport = require("passport");

/**
 * Configuration of the Routing
 *
 * @param app
 * @param mongoMsg
 */
module.exports = function (app) {
    /**
     * Basic Routing
     * This route allows the usage of jade for the different Views
     */
    app.get('/partials/*', function (req, res) {
        console.log("Partial Route");
        res.render('../../public/app/' + req.params["0"]);
    });


    app.post("/login", function (req, res, next) {
        console.log("Login");
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                res.send({success: false});
            }

            req.logIn(user, function (err) {
                console.log(user);
                if (err) {
                    return next(err);
                }
                res.send({success: true, user: user});
            });
        })(req, res, next);
    });

    /**
     * The *-Route für SPA Client-Site Routing
     *                                4
     * !!!IMPORTANT: Diesen Routenaufruf als letztes deklarieren
     * Jede Anfrage durchläuft diese Route
     * Die Route * dient dabei  als  Platzhalter und bewirkt, dass  der angegebene
     * Callback für jede  eingehende Anfrage  aufgerufen  wird
     * Das Ziel ist das bereitstellen von JS,CSS,Bildern ..., deshalb soll immer die index Seite ausgeliefert werden
     *
     */
    app.get('*', function (req, res) {
        console.log("Star Route");
        res.render('index');
    });

    /**
     * Error Handling
     * catch 404 and forward to error handler
     */
        //
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /**
     *  development error handler
     *  will print stacktrace
     */
    if (app.get('env') === 'development') {
        app.use(function (err, req, res/*, next*/) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    /**
     * production error handler
     * no stacktraces leaked to user
     */
    app.use(function (err, req, res/*, next*/) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    console.log("Route Modul")
};