const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');

router.post('/nuovoIstruttore',async (req,res)=>{
    // Creazione nuovo istruttore
    var body = req.body;
    var num = 1;
    var mod_user = false;
    let istruttore = null;
    try {
        istruttore = await Istruttore.findById(body._id);
    } catch (error) {
        res.status(500).json({error: "Qualcosa non è andato a buon fine"});
    }
    // Ciclo su tutti gli istruttori con stesso nome e cognome per dargli un id univoco
    if(istruttore != null){
        mod_user = true;
        var id = body._id + "-"+num;
        while (await Istruttore.findById(id) != null) {
            num++;
            id= body._id + "-"+num;
        }
        body._id = id;
    }
    if (body._id == "" || body.password == "" || body.telefono == ""){
        res.status(406).json({error: "Ops, hai dimenticato di riempire dei campi!" });
        return;
    }
    istruttore = new Istruttore({
        _id: body._id,
        password: body.password,
        telefono: body.telefono
    });
    istruttore.save()
    .then((profile)=>{
        res.status(201).json({mod_user: mod_user, username: istruttore._id, message: "Registrazione andata a buon fine, verrai redirezionato alla pagina di login..."});
        return;
    })
    .catch((err)=>{ 
        res.status(406).json({error: "Ops, qualcosa è andato storto" });
        return;
    });
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