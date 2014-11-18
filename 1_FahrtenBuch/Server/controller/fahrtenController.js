// Import Model
require("../models/fahrt");
var mongoose = require("mongoose");
var _ = require("underscore");

// GET the Reference from Model Fahrt, its registered in ../models/fahrt
var Fahrt = mongoose.model("Fahrt");

// POST Controller
exports.post = function (req, res) {
    /**
     * Create a new Fahrt
     * The Base is the Model Schema
     * Initialize the Data from the req.body
     *
     * @type {Fahrt}
     */
    var fahrt = new Fahrt(req.body);

    // ID will be created by save()
    fahrt.save();

    // Return the Result
    res.jsonp(fahrt);
};

// GET all Controller
exports.get = function (req, res) {
    // GET all Data
    Fahrt.find().exec(function (err, fahrten) {
        res.jsonp(fahrten);
    });
};

// GET a single Item Controller
exports.show = function (req, res) {
    // Custom load method which is defined in FahrtSchema.statics
    Fahrt.load(req.params.fahrtId, function (err, fahrt) {
        res.json(fahrt);
    });
};

// PUT Controller
exports.put = function (req, res) {
    /**
     * 1. Load the Item which should be edited
     * 2. Extend the fahrt Object with the data from req.body
     * 3. Save the edited Item to the DB
     */
    Fahrt.load(req.params.fahrtId, function (err, fahrt) {

        fahrt = _.extend(fahrt, req.body);

        fahrt.save(function (err) {
            res.jsonp(fahrt);
        });
    });
};

// DELETE a single Item 
exports.delete = function (req, res) {
    /**
     * 1. Load the Item which should be deleted
     * 2. Call the remove method
     */
    Fahrt.load(req.params.fahrtId, function (err, fahrt) {
        fahrt.remove(function (err) {
            res.jsonp(fahrt);
        });
    });
};




