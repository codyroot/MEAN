var
    express = require('express'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    app = express(),
    expressConfig = require("./server/config/express"),
    db = require("./server/config/db"),
    passportHandler = require("./server/config/passportHandler"),
    routeHandler = require("./server/config/routeHandler"),
    config = {
        rootPath: __dirname
    };

/**
 * Express Config
 */
expressConfig(app, config);

/**
 * Init DB
 */
db();

/**
 * Init Passport auth
 */
passportHandler(app);

/**
 * Init Routing(with the Data)
 */
routeHandler(app);

/**
 * Export Module for usage in bin
 */
module.exports = app;