const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');



router.post('/prenotaGuida',async (req,res)=>{
    //Prenota una guida
    var id_studente=req.loggedUser.username_studente;
    if( req.body.slot[10]!=="T" || req.body.slot[23]!=="Z"){
        res.status(400).json({error: "slot temporale non fornito in formato ISO 8601"});
        return;
    }
    
    var slot = new Date(req.body.slot);
    if(!slot.getDate() || !slot.getTime()){
        res.status(400).json({error: "data o ora non fornite"});
        return;
    }

    //controllo se studente esiste
    //constrollo se istruttore esiste
    var studente= await Studente.findOne({_id:id_studente},{nome:1,cognome:1}).exec();
    if(!studente){
        res.status(400).json({error: "username studente non esiste"});
        return;
    }

    var username_istruttore= req.body.username_istruttore;
    var istruttore= await Istruttore.findOne({_id:username_istruttore}).exec();
    if(!istruttore){
        res.status(400).json({error: "username istruttore non esiste"});
        return;
    }

    var nominativo_studente=studente.nome+" "+studente.cognome;
    
    //cotrollo se la prenotazione è già stata effettuata
    var check=await Prenotazione.find({slot:slot,username_istruttore:req.body.username_istruttore, username_studente:id_studente}).exec();
    if(check.length>0){
        res.status(208).json({
            message:"prenotazione esiste già",
            self:"/api/v1/Prenotazioni/"+check[0]._id.toString()
        })
        return;
    }
    var prenotazione = new Prenotazione({
        slot: slot,
        username_studente:id_studente ,
        nominativo_studente:nominativo_studente,
        username_istruttore: req.body.username_istruttore,
    });
     prenotazione.save()
    .then((prenotazione)=>{
        res.status(201).json({
            
            message: "Guida prenotata con successo!",
            self:'/api/v1/Prenotazioni/'+prenotazione._id,
            prenotazione: prenotazione
        });
    })
    .catch((err)=>{
        res.status(404).json({error: ''+err});
    });

});

router.delete('/annullaGuida', async (req,res)=>{
    //annulla una prenotazione
    var prenotazione = await Prenotazione.findOne({_id: req.query._id})
    if(prenotazione.username_studente!=req.loggedUser.username_studente){
        res.status(401).json({
            error: "non puoi cancellare una guida non tua"
        });
        return;
    }
    Prenotazione.deleteOne({_id: req.query._id})
    .then(()=>{
        res.status(200).json({message: "guida cancellata con successo"});
    })
    .catch((err)=>{
        res.status(500).json({
            error: ''+err})
    })
});


router.get('/mieGuide', async(req,res)=>{
    //Richiesta guide studente
    const user_stud = req.loggedUser.username_studente;
    if (!user_stud){
        res.status(400).json({ error: 'Studente non specificato' });
        return;
    }
    let student = null;
    try {
        student = await Studente.findById(user_stud);
    } catch (error) {
        res.status(500).json({error: "Qualcosa non è andato a buon fine"})
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


router.post('/modificaPresenza',(req,res)=>{

    const username_istruttore = req.loggedUser.username_istruttore;
    const id_guida= req.query.id_guida;
    var guida=Prenotazione.findOne({_id:id_guida}).exec();
    if(!guida){
        res.status(404).json({
            seccess: false,
            error: "guida non trovata"

        })
        return;
    }
    if(!username_istruttore){
        res.status(404).json({
            seccess: false,
            error: "username istruttore non trovato"
        })
        return;
    }
    if(guida.username_istruttore!=username_istruttore){
        res.status(401).json({
            success: false,
            error: "non puoi cambiare la presenza di una guida di un altro istruttore"
        })
        return;
    }
    Prenotazione.updateOne({_id:id_guida},{$set: {presenza:!guida.presenza}}).exec()
    .then((data)=>{
        res.status(200).json({
            success:true,
            data:data,
            message: "modifica riuscita"
        })
    })
    .catch((err)=>{
        res.status(404).json({
            success: false,
            error: "update aborted"
        })
    })

});

module.exports = router;