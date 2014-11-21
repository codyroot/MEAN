var mongoose = require("mongoose");
/**
 * DB Module
 */
module.exports = function () {
    mongoose.connect('mongodb://localhost/multivision');
    /**
     * Connection String
     */
    var db = mongoose.connection,
        /**
         * Create a Schema & describe the Schema of this Collection
         */
        userSchema = mongoose.Schema({
            firstName: String,
            lastName: String,
            username: String
        }),
        /**
         * Model, which its based on the Schema
         */
        User = mongoose.model('User', userSchema);

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    /**
     * findOne() --> Return the first Document in the Collection
     */
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            User.create({firstName: "Bud", lastName: "Spencer", username: "Buddy"});
            User.create({firstName: "James", lastName: "Bond", username: "007"});
            User.create({firstName: "John", lastName: "Sheppard", username: "bobo"});
        }
    });
};