var express = require('express'),
    stylus = require('stylus'),
    mongoose = require('mongoose'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    routeHandler = require("./server/routeHandler"),
    db = require("./server/db");
//// TODO: Better Solution,
//    mongoMsg = "NO Data";

var blubb = "No";

/**
 * Viewpath and Engine
 */
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

/**
 * Middleware Logger + Bodyparser
 * Stylus
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Stylus Middleware Compiler
 */
app.use(stylus.middleware({
        src: __dirname + '/public'//,
        //compile: function compile(str, path) {

            //var style = stylus(str)
            //    .set('filename', path)
            //    .set('sourcemap', {inline: true});
            //
            //style.render(function (/*err, css*/) {
            //    // generated sourcemap object
            //    //console.log(style.sourcemap);
            //});
            //return style;
        //}
    }
));

/**
 * Static Routing for css,favicon,js ...
 */
app.use(express.static(__dirname + '/public'));

/**
 * Init DB & Routing(with the Data)
 */
db(mongoose, function (mongoMsg) {
    routeHandler(app, mongoMsg);
});

/**
 * Export Module
 */
module.exports = app;