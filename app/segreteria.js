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
            slot: prenot.slot.toISOString(),
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
            dataNascita: profile.dataNascita.toISOString(),
            telefono: profile.telefono,
            email: profile.email
        }
    })
    res.status(200).json(studenti);
});



router.put('/modificaStudente', async (req, res)=>{
    // Modifica dati personali studente

    var id_studente = req.body.foglio_rosa
    var toChange = req.body.toChange
    var value = req.body.newValue

    // Check if student exists
    var studente= await Studente.findById(id_studente).exec();
    if(!studente){
        res.status(404).json({error: "Non sono stati trovati studenti con questo ID"});
        return;
    }

    // Check if 'toChange' is a valid field
    if(!["nome", "cognome", "telefono", "email"].includes(toChange)){
        res.status(404).json({error: "Campo selezionato non valido"})
        return;
    }

    // Update student
    var filter = {_id: id_studente}
    var update = {}
    update[toChange] = value
    Studente.findOneAndUpdate(filter, update, {returnOriginal:false})
    .then((updated) => {
        res.status(200).json({
            self: '/api/v1/studente/'+id_studente, 
            message: 'Studente modificato con successo'
        })
    })
    .catch((err)=>{
        res.status(400).json({
            message: 'Ops! Si è verificato un errore imprevisto'
        })
    })
});

module.exports = router;