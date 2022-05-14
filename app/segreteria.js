const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/guideStudenti',(req,res)=>{
    //Visualizza le guide prenotate di tutti gli studenti
});

router.get('/resocontoStudenti',(req,res)=>{
    //Visualizza i dati personali di tutti gli studenti
});


module.exports = router;