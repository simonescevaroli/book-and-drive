var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a model named Segreteria
module.exports = mongoose.model('Segreteria', new Schema({ 
        username: String,
        password: String
    }));