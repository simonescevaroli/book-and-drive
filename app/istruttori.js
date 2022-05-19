const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');

router.get('/visualizzaImpegni', async (req,res)=>{
    //Visualizza le guide prenotate con me (istruttore)
    const query = req.query;
    const istr = query.id;

    try{
        let prenotazioni = await Prenotazione.find({username_istruttore:istr}); //array of prenotazione with id_istruttore equal to istr
        if(prenotazioni.length == 0){
            res.status(200).json({
                confirm: 'fail',
                description: 'Nessuna prenotazione trovata'
        })
        } else {
            prenotazioni = prenotazioni.map((prenot)=>{
                return {
                    self: "api/v1/prenotazioni/" + prenot.id,
                    slot: prenot.slot.toISOString(),
                    studente: prenot.nominativo_studente,
                    presenza: prenot.presenza
                };
            })
            res.status(200).json(prenotazioni);
        }
    }
    catch(err){
        res.status(400).json({
            confirm: 'fail',
            error: err.message,
            description: 'Impossibile caricare dati personali'
        })
    }

});

router.get('/verificaDiponibilita',(req,res)=>{
    //vierifica disponibilità degli istruttori
});
    

module.exports = router;