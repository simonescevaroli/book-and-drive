const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/visualizzaImpegni',(req,res)=>{
    //Visualizza le guide prenotate con me (istruttore)
});

router.get('/verificaDiponibilita',(req,res)=>{
    //Visualizza le guide prenotate con tutti gli istruttori
});
    

module.exports = router;