const express = require('express');
var cors = require('cors')
const app = express();
const istruttori = require('./istruttori.js')
const prenotazioni = require('./prenotazioni.js')
const segreteria = require('./segreteria.js')
const studenti = require('./studenti.js')


const Studente = require('./models/studente.js');
const Istruttore = require('./models/istruttore.js');
const Prenotazione = require('./models/prenotazione.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/', express.static('static'));

app.use('/api/v1/istruttori', istruttori);
app.use('/api/v1/prenotazioni', prenotazioni);
app.use('/api/v1/segreteria', segreteria);
app.use('/api/v1/studenti', studenti);



app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});
inserimentoDatiTest();
module.exports = app;


async function inserimentoDatiTest (){

    let studente = new Studente({
        _id : "foglio_rosa0",
        password : "pass",
        nome: "andrea",
        cognome: "lorenzetti",
        dataNascita: new Date("04-03-2000"),
        telefono: "3490901908",
        email: "lorenzetti889@gmail.com"    
    });
    studente = await studente.save();
   // console.log("studente inserito", studente);
   studente = new Studente({
        _id : "foglio_rosa1",
        password : "pass",
        nome: "alberto",
        cognome: "gusmeroli",
        dataNascita: new Date("04-03-2000"),
        telefono: "3490901508",
        email: "lorenzetti189@gmail.com"    
    });
    studente = await studente.save();

    studente = new Studente({
        _id : "foglio_rosa2",
        password : "pass1",
        nome: "simone",
        cognome: "scevaroli",
        dataNascita: new Date("02-01-2000"),
        telefono: "3490901108",
        email: "lorenzetti139@gmail.com"    
    });

    let istruttore1 = new Istruttore({
        _id : "elon.musk",
        password : "pass1",
        telefono: "3458910227"   
    });
    istruttore1 = await istruttore1.save();
    console.log("istruttore inserito", istruttore1._id);
    
    
    let istruttore2 = new Istruttore({
        _id : "luca.zeni",
        password : "passs2",
        telefono: "3458110227"   
    });
    istruttore2 = await istruttore2.save();


    //console.log("istruttore inserito", istruttore2);

}


module.exports = app;