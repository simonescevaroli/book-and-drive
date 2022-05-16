const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');
const istruttore = require('./models/istruttore.js');


router.post('/prenotaGuida', (req,res)=>{
    //Prenota una guida
});

router.delete('/annullaGuida', (req,res)=>{
    //annulla una prenotazione
});


router.get('/mieGuide', async(req,res)=>{
    //Richiesta guide studente
});


module.exports = router;