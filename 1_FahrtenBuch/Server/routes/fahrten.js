var express = require('express');
var router = express.Router();

var fahrten = require("../controller/fahrtenController");

/**
 * Save a new Fahrt
 * POST /fahrten
 */
router.post('/', fahrten.post);

/**
 * Read all data from Fahrt
 * GET /fahrten
 */
router.get("/", fahrten.get);

/**
 * Read a specific Fahrt
 * GET /fahrten/544f8b80c7a2f4d81ab1c52f
 */
router.get("/:fahrtId", fahrten.show);

/**
 * Edit a specific Item
 * PUT /fahrten/544f8b80c7a2f4d81ab1c52f --> body: new DataObject
 */
router.put("/:fahrtId", fahrten.put);

/**
 * Delete a specific Fahrt
 * DELETE /fahrten/544f8b80c7a2f4d81ab1c52f
 */
router.delete("/:fahrtId", fahrten.delete);

module.exports = router;
