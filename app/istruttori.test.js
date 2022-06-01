const request = require('supertest'); const app = require('./app');
const jwt = require('jsonwebtoken'); const mongoose = require('mongoose');
const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');

describe("GET /api/v1/istruttori/visualizzaImpegni", ()=>{
    let connection;

    beforeAll( async () => {
      jest.setTimeout(8000);
      jest.unmock('mongoose');
      connection = await  mongoose.connect(process.env.DB_URL);
      await Prenotazione.deleteMany({})
      await Studente.deleteMany({})
      await Istruttore.deleteMany({})
      await populatesImpegni();
    });
  
    afterAll( async () => {
      await mongoose.connection.close(true);
    });

    var token1 = jwt.sign({
    username_istruttore: "elton.gion",
    role: "istruttore"
    },
    process.env.SUPER_SECRET, {
    expiresIn: 86400
    });

    var token2 = jwt.sign({
    username_istruttore: "topo.gigio",
    role: "istruttore"
    },
    process.env.SUPER_SECRET, {
    expiresIn: 86400
    });

    test('GET /api/v1/istruttori/visualizzaImpegni istruttore esistente', async () => {
        return request(app)
        .get('/api/v1/istruttori/visualizzaImpegni?token=' + token1)
        .expect(200)
        .then( (res) => {
            expect(res.body[0]).toEqual({
                self: 'api/v1/prenotazioni/70062cf7a9ae1c5bed1c4186',
                slot: '2022-05-07T18:00:00.000Z',
                studente: 'Giulio Rossi',
                presenza: true
            });
            expect(res.body[1]).toEqual({
                self: "api/v1/prenotazioni/70162cf7a9ae1c5bed1c4189",
                slot: '2022-02-02T10:00:00.000Z',
                studente: "Giulio Rossi",
                presenza: true
            });
        })
    });

    test('GET /api/v1/istruttori/visualizzaImpegni istruttore inesistente', async () => {
        return request(app)
        .get('/api/v1/istruttori/visualizzaImpegni?token=' + token2)
        .expect(200)
        .then( (res) => {
            expect(res.body).toEqual({
                confirm: 'fail',
                description: 'Nessuna prenotazione trovata'
            });
        })
    });
});

describe("GET /api/v1/istruttori/verificaDiponibilita", ()=>{

});

describe("GET /api/v1/istruttori/prenotazioniIstruttore", ()=>{

});

async function populatesImpegni(){

    var istruttore = new Istruttore({
        _id: "elton.gion",
        password: '123',
        telefono: "123123123", 
    })
    await istruttore.save();

    var istruttore = new Istruttore({
        _id: "topo.gigio",
        password: '321',
        telefono: "0987", 
    })
    await istruttore.save();

    var studente = new Studente({
        _id: "foglio_rosa10",
        nome: "Giulio",
        cognome: "Rossi",
        password: 'pass',
        dataNascita: new Date("2001-10-09T00:00:00.000Z"),
        telefono: "3459905727",
        email: "giulio.rossi@gmail.com"   
    });
    await studente.save();

   studente = new Studente({
        _id : "foglio_rosa11",
        password : "pass",
        nome: "marco",
        cognome: "b",
        dataNascita: new Date("04-03-2002"),
        telefono: "3490901508",
        email: "marco@gmail.com"   
    });
    await studente.save();

    
    var prenotazione = new Prenotazione({
        _id: '70062cf7a9ae1c5bed1c4186',
        username_studente: 'foglio_rosa02',
        slot: '2022-05-07T18:00:00.000Z',
        nominativo_studente: "Giulio Rossi",
        username_istruttore: "elton.gion",
        presenza: true
    });
    await prenotazione.save();

    prenotazione = new Prenotazione({
        _id: "70162cf7a9ae1c5bed1c4189",
        username_studente: 'foglio_rosa02',
        slot: '2022-02-02T10:00:00.000Z',
        nominativo_studente: "Giulio Rossi",
        username_istruttore: "elton.gion",
        presenza: true
     });
    await prenotazione.save();
    }