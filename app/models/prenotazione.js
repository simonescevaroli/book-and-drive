var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a model named Prenotazione
module.exports = mongoose.model('Prenotazione', new Schema({ 
        slot: {type:Date, trim:true, default:new Date('2000-01-01T00:00:00')},
        id_studente: {type:String, trim:true, default:'stud'},
        id_istruttore: {type:String, trim:true, default:'istr'},
        presenza: {type:Boolean, trim:true, default: true}
    }));