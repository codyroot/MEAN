var express = require('express'),
    stylus = require('stylus'),
    passport = require("passport"),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require("cookie-parser"),
    session = require('express-session');

/**
 * Config of Express
 *
 * @param app
 * @param config
 */
module.exports = function (app, config) {
    /**
     * Viewpath and Engine
     */
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    /**
     * Middleware::
     * Logger
     * Cookieparser
     * Bodyparser
     * Session
     * Passport Initialize
     * Passport Use Sessions
     */
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({
        secret: 'multi vita ale',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Stylus Middleware Compiler
     */
    app.use(stylus.middleware({
            src: config.rootPath + '/public'//,
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
    app.use(express.static(config.rootPath + '/public'));
};