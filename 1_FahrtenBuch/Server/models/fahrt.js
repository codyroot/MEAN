var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create DB Model Schema
var FahrtSchema = new Schema({
    // This Object will be created be MongoDB
    created: {
        type: Date,
        default: Date.now
    },
    // Custom Object in the DB
    von: Date,
    bis: Date,
    kmStart: Number,
    kmEnde: Number,
    strecke: String,
    zweck: String,
    privat: Boolean,
    fahrer: String,
    fahrzeug: String
});

// Statics: Object that can be extended with methods for the Model
FahrtSchema.statics = {
    load: function (id, cb) {
        // Query
        this.findOne({_id: id}).exec(cb);
    }
};

// Register Model in Mongoose
mongoose.model("Fahrt", FahrtSchema);