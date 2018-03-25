var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
/*When no collection argument is passed, Mongoose uses the model name. If you don't like this behavior,
either pass a collection name, use mongoose.pluralize(), or set your schemas collection name option.*/
var User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
},{
    collection: 'user'
});

module.exports = mongoose.model('User',User);
