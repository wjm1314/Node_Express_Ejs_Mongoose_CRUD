var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
/*When no collection argument is passed, Mongoose uses the model name. If you don't like this behavior,
either pass a collection name, use mongoose.pluralize(), or set your schemas collection name option.*/
var Product = new Schema({
    title: {
        type: String
    },
    price: {
        type: String
    },
    fee: {
        type: String
    },
    pic: {
        type: String
    },
    description: {
        type: String
    }
},{
    collection: 'product'
});

module.exports = mongoose.model('Product',Product);