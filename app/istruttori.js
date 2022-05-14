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

router.get('/verificaDiponibilita',(req,res)=>{
    //Visualizza le guide prenotate con tutti gli istruttori
});
    

module.exports = router;