var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a model named Istruttore
module.exports = mongoose.model('Istruttore', new Schema({ 
        _id: String, //nome.cognome
        password: String,
        telefono: String
    }));
