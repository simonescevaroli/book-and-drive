const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');

router.get('/guideStudenti',(req,res)=>{
    //Visualizza le guide prenotate di tutti gli studenti
});

router.get('/resocontoStudenti',(req,res)=>{
    //Visualizza i dati personali di tutti gli studenti
});


module.exports = router;