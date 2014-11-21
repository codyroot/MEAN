var mongoose = require("mongoose"),
    crypto = require("crypto");

/**
 * Hash PW
 */
var createSalt = function () {
        return crypto.randomBytes(128).toString("base64");
    },
    /**
     *
     * @param salt randomly generated number
     * @param pwd
     * @returns {*}
     */
    hashPwd = function (salt, pwd) {
        // Hash Message Authentication Code (algorithm, salt)
        var hmac = crypto.createHmac("sha1", salt);

        return hmac.update(pwd).digest("hex");
    };

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
            username: String,
            salt: String,
            hashed_pw: String
        }),
        User;

    /**
     * Add Custom Methods to the schema
     * @type {{}}
     */
    userSchema.methods = {
        /**
         * Compares the hashed_pw
         *
         * @param passwordToMatch
         * @returns {boolean}
         */
        authenticate: function (passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pw;
        }
    };

    /**
     * Model, which its based on the Schema
     */
    User = mongoose.model('User', userSchema);

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
        console.dir(db);
    });

    /**
     * findOne() --> Return the first Document in the Collection
     */
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;

            salt = createSalt();
            hash = hashPwd(salt, "Buddy");
            User.create({firstName: "Bud", lastName: "Spencer", username: "Buddy", salt: salt, hashed_pw: hash});

            salt = createSalt();
            hash = hashPwd(salt, "007");
            User.create({firstName: "James", lastName: "Bond", username: "007", salt: salt, hashed_pw: hash});

            salt = createSalt();
            hash = hashPwd(salt, "bobo");
            User.create({firstName: "John", lastName: "Sheppard", username: "bobo", salt: salt, hashed_pw: hash});
        }
    });
};