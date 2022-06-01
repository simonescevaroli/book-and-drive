const request = require('supertest'); const app = require('./app');
const jwt = require('jsonwebtoken'); const mongoose = require('mongoose');
const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');


describe("GET /api/v1/segreteria/guideStudente",()=>{
    let connection;

    beforeAll( async () => {
      jest.setTimeout(8000);
      jest.unmock('mongoose');
      connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
      await Prenotazione.deleteMany({})
      await Studente.deleteMany({})
      await Istruttore.deleteMany({})
      await populatesAnnulla();
    });
  
    afterAll( async () => {
      await mongoose.connection.close(false);
    });
  
    test('GET /api/v1/segreteria/guideStudente senza specificare studente', () => {
        return request(app)
        .get('/api/v1/segreteria/guideStudente?_id=')
        .expect(400, { error: "L'id dello studente non è stato specificato" });
    });
    
    test('GET /api/v1/segreteria/guideStudente studente inesistente', () => {
      return request(app)
        .get('/api/v1/segreteria/guideStudente?_id=fyvygv')
        .expect(404, { error: 'Questo studente non esiste, controlla se lo hai inserito correttamente!' });
    });
    
    test('GET /api/v1/segreteria/guideStudente studente esistente e con prenotazioni, successo', () => {
        return request(app)
          .get('/api/v1/segreteria/guideStudente?_id=foglio_rosa02')
          .expect(200)
            .then( (res) => {
                expect(res.body[0]).toEqual({
                    self: "api/v1/prenotazioni/62962cf7a9ae1c5bed1c4186",
                    slot: '2022-05-07T18:00:00.000Z',
                    studente: "Giulio Rossi",
                    istruttore: "tony.stark",
                    presenza: true
                });
                expect(res.body[1]).toEqual({
                    self: "api/v1/prenotazioni/62962cf7a9ae1c5bed1c4189",
                    slot: '2022-02-02T10:00:00.000Z',
                    studente: "Giulio Rossi",
                    istruttore: "tony.stark",
                    presenza: true
                });
            })
    });

    test('GET /api/v1/segreteria/guideStudente studente senza guide', () => {
        return request(app)
          .get('/api/v1/segreteria/guideStudente?_id=foglio_rosa03')
          .expect(202, { message: 'Questo studente al momento non ha guide prenotate o fatte' });
    });

})

describe("GET /api/v1/segreteria/resocontoStudente",()=>{
  beforeAll( async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    await Prenotazione.deleteMany({})
    await Studente.deleteMany({})
    await Istruttore.deleteMany({})
    await populatesAnnulla();
  });

  afterAll( async () => {
    await mongoose.connection.close(false);
  });

  test('GET /api/v1/segreteria/resocontoStudente con studente esistente', () => {
    return request(app)
      .get('/api/v1/segreteria/resocontoStudente?id=foglio_rosa02')
      .expect(200)
      .then( (res) => {
        expect(res.body).toEqual({
          self: '/api/v1/studenti/foglio_rosa02',
          foglio_rosa: "foglio_rosa02",
          nome: "Giulio",
          cognome: "Rossi",
          dataNascita: "2001-10-09T00:00:00.000Z",
          telefono: "3459905727",
          email: "giulio.rossi@gmail.com"
        });
      })
  });

  test('GET /api/v1/segreteria/resocontoStudente con studente non specificato', () => {
    return request(app)
      .get('/api/v1/segreteria/resocontoStudente?id=')
      .expect(400)
  });

  test('GET /api/v1/segreteria/resocontoStudente con studente inesistente', () => {
    return request(app)
      .get('/api/v1/segreteria/resocontoStudente?id=trottola')
      .expect(400)
  });
})

async function populatesAnnulla(){

    var istruttore = new Istruttore({
        _id: "tony.stark",
        password: '123',
        telefono: "123123123", 
    })
    await istruttore.save();

    var studente = new Studente({
        _id: "foglio_rosa02",
        nome: "Giulio",
        cognome: "Rossi",
        password: 'pass',
        dataNascita: new Date("2001-10-09T00:00:00.000Z"),
        telefono: "3459905727",
        email: "giulio.rossi@gmail.com"   
    });
    await studente.save();

   studente = new Studente({
        _id : "foglio_rosa03",
        password : "pass",
        nome: "marco",
        cognome: "b",
        dataNascita: new Date("04-03-2002"),
        telefono: "3490901508",
        email: "marco@gmail.com"   
    });
    await studente.save();

    
    var prenotazione = new Prenotazione({
        _id: '62962cf7a9ae1c5bed1c4186',
        username_studente: 'foglio_rosa02',
        slot: '2022-05-07T18:00:00.000Z',
        nominativo_studente: "Giulio Rossi",
        username_istruttore: "tony.stark",
        presenza: true
    });
    await prenotazione.save();

    prenotazione = new Prenotazione({
        _id: "62962cf7a9ae1c5bed1c4189",
        username_studente: 'foglio_rosa02',
        slot: '2022-02-02T10:00:00.000Z',
        nominativo_studente: "Giulio Rossi",
        username_istruttore: "tony.stark",
        presenza: true
     });
    await prenotazione.save();
    }
