var auth = require("./auth"),
    mongoose = require("mongoose");

/**
 * Configuration of the Routing
 *
 * @param app
 */
module.exports = function (app) {
    var User = mongoose.model("User");

    /**
     * Get all Users Route
     * check if User is authorized to look into the URL
     * The first function is the middleware to handle this behavior
     * Should be the first Route!!!
     */
    app.get("/api/users", auth.requiresRole("admin"), function (req, res) {
        User.find({}).exec(function (err, collection) {
            res.send(collection);
        });
    });

    /**
     * Basic Routing
     * This route allows the usage of jade for the different Views
     */
    app.get('/partials/*', function (req, res) {
        console.log("Partial Route");
        res.render('../../public/app/' + req.params["0"]);
    });

    /**
     * Login Route
     */
    app.post("/login", function (req, res, next) {
        auth.authenticate(req, res, next);
    });

    /**
     * Logout Route
     */
    app.post("/logout", function (req, res) {
        // passport adds logout to req
        req.logout();
        res.send({yo: "yo"});
        //res.end();
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
        res.render('index', {
            // Is there an User
            bootstrappedUser: req.user
        });
    });

    /**
     * Error Handling
     * catch 404 and forward to error handler
     */
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
