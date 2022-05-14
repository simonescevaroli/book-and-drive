const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');


router.post('/prenotaGuida', (req,res)=>{
    //Prenota una guida
    var slot = new Date(req.body.slot);
    slot.setTime( slot.getTime() - new Date().getTimezoneOffset()*60*1000);
    var prenotazione = new Prenotazione({
        slot: slot,
        id_studente: req.query.id_studente,
        id_istruttore: req.body.id_istruttore,
    });
    console.log(prenotazione);
    
    prenotazione.save()
    .then(()=>{
        res.status(201).json({message: "guida prenotata con successo"});
    })
    .catch((err)=>{ 
        console.log("errore:"+err);
        res.status(404).json({error: ''+err});
    });
});

router.delete('/annullaGuida', (req,res)=>{
    //Annulla una guida
});


router.get('/mieGuide', (req,res)=>{
    //Richiesta guide studente
});


module.exports = router;