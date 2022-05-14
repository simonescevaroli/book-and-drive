const express = require('express');
const app = express();
const istruttori = require('./istruttori.js')
const prenotazioni = require('./prenotazioni.js')
const segreteria = require('./segreteria.js')
const studenti = require('./studenti.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('static'));

app.use('/api/v1/istruttori', istruttori);
app.use('/api/v1/prenotazioni', prenotazioni);
app.use('/api/v1/segreteria', segreteria);
app.use('/api/v1/studenti', studenti);

app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;