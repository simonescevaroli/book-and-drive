const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.post('/prenotaGuida', (req,res)=>{
    //Prenota una guida
});

router.delete('/annullaGuida', (req,res)=>{
    //Annulla una guida
});


router.get('/mieGuide', (req,res)=>{
    //Richiesta guide studente
});


module.exports = router;