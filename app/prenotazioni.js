const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');


router.post('/prenotaGuida', (req,res)=>{
    //Prenota una guida
    var slot = new Date(req.body.slot);//YYYY-MM-DDTHH:mm
    slot.setHours(slot.getHours() + 2);
    console.log("prenotazione guida in data:",slot);//qui stampa 2 ore in meno
    var prenotazione = new Prenotazione({
        slot: slot,
        id_studente: req.query.id_studente,
        id_istruttore: req.body.id_istruttore,
    });
    console.log(prenotazione);
    
    prenotazione.save()
    .then((prenotazione)=>{
        res.status(201).json({
            self: '/api/v1/prentoazioni/:'+prenotazione._id,
            message: "guida prenotata con successo"
        });
    })
    .catch((err)=>{ 
        console.log("errore:"+err);
        res.status(404).json({error: ''+err});
    });
});

router.delete('/annullaGuida', (req,res)=>{
    console.log("annulla guida");
    Prenotazione.deleteOne({_id: req.query._id})
    .then(()=>{
        console.log(res.status(200).json({message: "guida cancellata con successo"}));
    })
    .catch((err)=>{
        res.status(500).json({
            error: ''+err})
    })
});


router.get('/mieGuide', (req,res)=>{
    //Richiesta guide studente
});


module.exports = router;