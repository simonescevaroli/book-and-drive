var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a model named Studente
module.exports = mongoose.model('Studente', new Schema({ 
        username: String,
        password: String,
        nome: {type:String, trim:true, default:'mario'},
        cognome: {type:String, trim:true, default:'rossi'},
        dataNascita: {type:Date, trim:true, default:new Date('2000-01-01T00:00:00')},
        telefono:{type:String, trim:true, default:'98765'},
        email: {type:String, trim:true, default:'mario.rossi@gmail.com'}
}));
