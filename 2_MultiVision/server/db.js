/**
 * DB Module
 *
 * @param mongoose  {mongoose<Object>}
 * @param cb {Function}
 */
module.exports = function (mongoose, cb) {
    mongoose.connect('mongodb://localhost/multivision');
    /**
     * Connection String
     */
    var db = mongoose.connection,
        /**
         * Create a Schema & describe the Schema of this Collection
         */
        messageSchema = mongoose.Schema({message: String}),
        /**
         * Model, which its based on the Schema
         */
        Message = mongoose.model('Message', messageSchema);

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    /**
     * findOne() --> Return the first Document in the Collection
     */
    Message.findOne().exec(function (err, messageDoc) {
        mongoMsg = messageDoc.message;
        cb(mongoMsg);
    });
};