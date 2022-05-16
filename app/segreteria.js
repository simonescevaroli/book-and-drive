const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');

router.get('/guideStudenti',async (req,res)=>{
    //Visualizza le guide prenotate di tutti gli studenti
    let prenotazioni = await Prenotazione.find({});
    prenotazioni = prenotazioni.map((prenot)=>{
        return {
            self: "api/v1/prenotazioni/" + prenot.id,
            slot: prenot.slot,
            id_studente: prenot.id_studente,
            id_istruttore: prenot.id_istruttore,
            presenza: prenot.presenza
        };
    })
    res.status(200).json(prenotazioni);
    
});



// Visualizza dati personali di tutti gli studenti
router.get('/resocontoStudenti', async (req,res)=>{
    elenco_studenti = await Studente.find({});

    elenco_studenti = elenco_studenti.map( (stud) => {
        return {
            self: '/api/v1/studenti/' + stud.id,
            foglio_rosa: stud.username,
            nome: stud.nome,
            cognome: stud.cognome,
            dataNascita: stud.dataNascita.toLocaleString('it-IT'),
            email: stud.email,
            telefono: stud.telefono
        };
    });
    res.status(200).json(elenco_studenti);
});


module.exports = router;