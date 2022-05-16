var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a model named Studente
module.exports = mongoose.model('Studente', new Schema({ 
        _id: String, //foglio rosa
        password: String,
        nome: {type:String},
        cognome: {type:String},
        dataNascita: {type:Date},
        telefono:{type:String},
        email: {type:String}
}));