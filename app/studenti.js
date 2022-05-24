const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');


router.get('/me', async (req,res)=>{
    // visualizza dati personali studente

    try{
        let studente = await Studente.findOne({_id: req.query.id});
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

router.post('/nuovoStudente',async (req,res)=>{
    // Creazione nuovo studente
    const body = req.body;
    let studente = null
    try {
        studente = await Studente.findById(body._id);
    } catch (error) {
        res.status(500).json({error: "Qualcosa non è andato a buon fine"});
    }
    if(studente != null){
        res.status(409).json({ error: 'Questo studente esiste già nel database' });
        return;
    }
    if (body._id == "" || body.password == "" || body.nome == "" || body.cognome == "" || body.dataNascita == "" || body.telefono == "" || body.email == ""){
        res.status(406).json({error: "Ops, hai dimenticato di riempire dei campi!" });
        return;
    }
    studente = new Studente({
        _id: body._id,
        password: body.password ,
        nome: body.nome,
        cognome: body.cognome,
        dataNascita: body.dataNascita,
        telefono: body.telefono,
        email: body.email
    });
    studente.save()
    .then((profile)=>{
        res.status(201).json({message: "Registrazione andata a buon fine, verrai redirezionato alla pagina di login..."});
        return;
    })
    .catch((err)=>{ 
        res.status(406).json({error: "Ops, qualcosa è andato storto, probabilmente hai inserito la data di nascita nel formato sbagliato" });
        return;
    });
});


module.exports = router;