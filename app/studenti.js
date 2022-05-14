const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');


// visualizza dati personali studente
router.get('/me',(req,res)=>{
    const query = req.query;
    const id = query.id

    Studente.findById(id)
    .then(profile =>{

        res.status(200).json({
            foglio_rosa: profile.username,
            nome: profile.nome,
            cognome: profile.cognome,
            dataNascita: profile.dataNascita.toLocaleString('it-IT'),   // time zone locale
            telefono: profile.telefono,
            email: profile.email
        })
    })
    .catch(err =>{
        res.status(400).json({
            confirm: 'fail',
            error: err.message,
            description: 'Impossibile caricare dati personali'
        })
    })
});


module.exports = router;