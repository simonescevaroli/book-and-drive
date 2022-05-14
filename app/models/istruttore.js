var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a model named Istruttore
module.exports = mongoose.model('Istruttore', new Schema({ 
        username: String,
        password: String,
        nome: {type:String, trim:true, default:'Elon'},
        cognome: {type:String, trim:true, default:'Musk'},
        telefono:{type:String, trim:true, default:'123456789'}
    }));