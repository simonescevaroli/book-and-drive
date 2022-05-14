const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');

router.get('/visualizzaImpegni',(req,res)=>{
    //Visualizza le guide prenotate con me (istruttore)
});

router.get('/verificaDiponibilita',async (req,res)=>{
    //Visualizza le guide prenotate con tutti gli istruttori
    var slot=new Date(req.body.slot);
    
    //recupero gli id di tutti gli istruttori nel db
    var all_istructors= await Istruttore.find({},{_id:1}).exec();
    for(let i=0; i < all_istructors.length; i++){
        all_istructors[i]=all_istructors[i]._id.toString();
    }
    console.log(all_istructors);

    //recupero gli id di tutti gli istruttori già prenotati per quella data e ora
    const booked_istructors= await Prenotazione.find({slot: slot},{_id: 0, id_istruttore:1}).exec();
    for(let i=0; i < booked_istructors.length; i++){
        booked_istructors[i]=booked_istructors[i].id_istruttore;
    }
    console.log(booked_istructors);

    //salvo gli id degli istruttori non occupati per quello slot temporale
    var available_istructors_id = [];
    for(let i=0; i < all_istructors.length;i++){
        if(!booked_istructors.includes(all_istructors[i])){
            available_istructors_id.push(all_istructors[i]);
        }
    };
   

});
    

module.exports = router;