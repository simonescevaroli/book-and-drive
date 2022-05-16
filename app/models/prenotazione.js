var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a model named Prenotazione
module.exports = mongoose.model('Prenotazione', new Schema({ 
        slot: {type:Date},
        username_studente:{type:String},
        nominativo_studente: {type:String},
        username_istruttore: {type:String},
        presenza: {type:Boolean}
    }));
