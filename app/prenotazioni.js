const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');



router.post('/prenotaGuida',async (req,res)=>{
    //Prenota una guida
    var id_studente=req.query.username_studente;
    var slot = new Date(req.body.slot);
    
    /*if((slot.getMonth()>9 && slot.getMonth()<=11 && slot.getDay>=30) || (slot.getMonth()>0 && slot.getMonth()<=2 && slot.getDay<=26)) {
        slot.setHours(slot.getHours() + 1);
    }
    else{
        slot.setHours(slot.getHours() + 2);
    }*/
    var studente= await Studente.find({_id:id_studente},{noem:1,cognome:1}).exec();
    var nominativo_studente=studente.nome+" "+studente.cognome;
    var prenotazione = new Prenotazione({
        slot: slot,
        username_studente:id_studente ,
        nominativo_studente:nominativo_studente,
        username_istruttore: req.body.username_istruttore,
    });
    prenotazione.save()
    .then((prenotazione)=>{
        res.status(201).json({
            message: "guida prenotata con successo",
            self:'/api/v1/'+prenotazione._id
        });
    })
    .catch((err)=>{ 
        console.log("errore:"+err);
        res.status(404).json({error: ''+err});
    });

});

router.delete('/annullaGuida', (req,res)=>{
    //annulla una prenotazione
    console.log("annulla guida");
    Prenotazione.deleteOne({_id: req.query._id})
    .then(()=>{
        console.log(res.status(200).json({message: "guida cancellata con successo"}));
    })
    .catch((err)=>{
        res.status(500).json({
            error: ''+err})
    })
});


router.get('/mieGuide', async(req,res)=>{
    //Richiesta guide studente
});


module.exports = router;