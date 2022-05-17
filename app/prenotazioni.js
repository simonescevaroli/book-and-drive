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
    console.log(id_studente);

    var studente= await Studente.findOne({_id:id_studente},{nome:1,cognome:1}).exec();
    console.log(studente);
    var nominativo_studente=studente.nome+" "+studente.cognome;
    console.log("nominativo studente:"+nominativo_studente);
    
    //cotrollo se la prenotazione è già stata effettuata
    var check=await Prenotazione.find({slot:slot,username_istruttore:req.body.username_istruttore, username_studente:id_studente}).exec();
    if(check.length>0){
        console.log("prenotazione esiste già")
        res.status(208).json({
            message:"prenotazione esiste già",
            self:"/api/v1/Prenotazioni/"+check._id
        })
    }
    var prenotazione = new Prenotazione({
        slot: slot,
        username_studente:id_studente ,
        nominativo_studente:nominativo_studente,
        username_istruttore: req.body.username_istruttore,
    });
     prenotazione.save()
    .then((prenotazione)=>{
        console.log("prenotazione effettuata");
        res.status(201).json({
            
            message: "guida prenotata con successo",
            self:'/api/v1/Prenotazioni/'+prenotazione._id
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
    const query = req.query;
    const user_stud = query.username_stud;
    if (!user_stud){
        res.status(400).json({ error: 'Studente non specificato' });
        return;
    }
    let student = null;
    try {
        student = await Studente.findById(user_stud);
    } catch (error) {
        res.status(400).json({error: "Qualcosa non è andato a buon fine"})
    }
    if(student == null) {
        res.status(404).json({ error: 'Questo studente non esiste' });
        return;
    };
    guide = await Prenotazione.find({username_studente: user_stud}).exec();
    guide = guide.map((guida)=>{
        return {
            self: "api/v1/prenotazioni/" + guida.id,
            slot: guida.slot.toISOString(),
            id_guida: guida.id,
            studente: guida.nominativo_studente,
            istruttore: guida.username_istruttore,
            presenza: guida.presenza
        };
    })
    res.status(200).json(guide);
});


module.exports = router;