const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');

router.get('/guideStudenti', async (req,res)=>{
    //Visualizza le guide prenotate di tutti gli studenti
    let prenotazioni = await Prenotazione.find({}).exec();
    prenotazioni = prenotazioni.map((prenot)=>{
        return {
            self: "api/v1/prenotazioni/" + prenot.id,
            studente: prenot.nominativo_studente,
            slot: prenot.slot.toLocaleString('it-IT'),
            istruttore: prenot.username_istruttore,
            presenza: prenot.presenza
        }
    })
    res.status(200).json(prenotazioni);
});



router.get('/resocontoStudenti', async (req,res)=>{
    // Visualizza dati personali di tutti gli studenti
    let studenti = await Studente.find({}).exec();
    studenti = studenti.map((profile) => {
        return{
            self: "api/v1/studenti/" + profile.id,
            foglio_rosa: profile._id,
            nome: profile.nome,
            cognome: profile.cognome,
            dataNascita: profile.dataNascita.toLocaleString('it-IT'),
            telefono: profile.telefono,
            email: profile.email
        }
    })
    res.status(200).json(studenti);
});


module.exports = router;