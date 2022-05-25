const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');


router.get('/me', async (req,res)=>{
    // visualizza dati personali studente
    var username_studente= req.loggedUser.username_studente;
    try{
        let studente = await Studente.findOne({_id: username_studente});
        res.status(200).json({
            self: '/api/v1/studenti/' + studente.id,
            foglio_rosa: studente._id,
            nome: studente.nome,
            cognome: studente.cognome,
            dataNascita: studente.dataNascita.toISOString(),
            telefono: studente.telefono,
            email: studente.email
        });
    }
    catch(err){
        res.status(400).json({
            confirm: 'fail',
            error: err.message,
            description: 'Impossibile caricare dati personali'
        })
    }
});

module.exports = router;