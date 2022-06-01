const request = require('supertest'); const app = require('./app');
const jwt = require('jsonwebtoken'); const mongoose = require('mongoose');
const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');

describe("POST /api/v1/prenotazioni/prenotaGuida",()=>{
    beforeAll( async () => {
        jest.setTimeout(16000);
        jest.unmock('mongoose');
        app.locals.db = await mongoose.connect(process.env.DB_URL);
        await Prenotazione.deleteMany({})
        await Studente.deleteMany({})
        await Istruttore.deleteMany({})
        await populatesPrenota();
    });
    afterAll( async () => {
        await mongoose.connection.close(true);
        console.log("Database connection closed");
    });
    var token1 = jwt.sign({
          username_studente: "foglio_rosa01",
          role: "studente"
    },
       process.env.SUPER_SECRET, {
          expiresIn: 86400
       });
    var token2 = jwt.sign({
        username_studente: "76542",
        role: "studente"
    },
     process.env.SUPER_SECRET, {
        expiresIn: 86400
    });
    
        test('POST /api/v1/prenotazioni/prenotaGuida?token=token1 should return code 201', async () => {
            return request(app).post('/api/v1/prenotazioni/prenotaGuida?token=' + token1)
            .send({slot: new Date("2000-05-07T00:00:00.000Z"),
                username_istruttore: "elon.musk"})
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(201)
                var dati=(JSON.parse(res.text));
                
                var data=true
                if( dati.message != "Guida prenotata con successo!"||dati.prenotazione.username_studente!="foglio_rosa01"|| dati.prenotazione.nominativo_studente !="mario bianchi"||dati.prenotazione.username_istruttore!="elon.musk"||dati.prenotazione.slot!= "2000-05-07T00:00:00.000Z")
                    data=false;
                expect(data).toEqual(true); 
            });
        });

        test('POST /api/v1/prenotazioni/prenotaGuida?token=token1 should return code 400 for error in date', async () => {
            return request(app).post('/api/v1/prenotazioni/prenotaGuida?token=' + token1)
            //oraro non nel formato corretto
            .send({slot: "123",
                username_istruttore: "elon.musk"})
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(400)
            });
        });

        test('POST /api/v1/prenotazioni/prenotaGuida?token=token1 should return code 400 for non existing student', async () => {
            return request(app).post('/api/v1/prenotazioni/prenotaGuida?token=' + token2)
            //studente inesistente
            .send({slot: new Date("2000-05-07T00:00:00.000Z"),
                username_istruttore: "elon.musk"})
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(400)
            });
        });

        test('POST /api/v1/prenotazioni/prenotaGuida?token=token1 should return code 400 for non existing istructor', async () => {
            return request(app).post('/api/v1/prenotazioni/prenotaGuida?token=' + token1)
            //istruttore inesistente
            .send({slot: new Date("2000-05-07T00:00:00.000Z"),
                username_istruttore: "pinco.pallo"})
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(400)
            });
        });

        test('POST /api/v1/prenotazioni/prenotaGuida?token=token1 should return code 208 beacuse the prenotation already exist', async () => {
            return request(app).post('/api/v1/prenotazioni/prenotaGuida?token=' + token1)
            .send({slot: new Date("2000-05-07T00:00:00.000Z"),
                username_istruttore: "elon.musk"})
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(208) 
            });
        });
})

describe("DELETE /api/v1/prenotazioni/annullaGuida",()=>{

})

describe("GET /api/v1/prenotazioni/mieGuide",()=>{

})

describe("POST /api/v1/prenotazioni/modificaPresenza",()=>{

})

async function populatesPrenota(){
    let studente = new Studente({
        _id: "foglio_rosa00",
        nome: "Giorgio",
        cognome: "Rossi",
        password: 'pass',
        dataNascita: new Date("2000-05-07T00:00:00.000Z"),
        telefono: "3459905727",
        email: "giorgio.rossi@gmail.com"   
    });
    await studente.save();

   studente = new Studente({
        _id : "foglio_rosa01",
        password : "pass",
        nome: "mario",
        cognome: "bianchi",
        dataNascita: new Date("04-03-2002"),
        telefono: "3490901508",
        email: "mario@gmail.com"    
    });
    await studente.save();
    
    let istruttore = new Istruttore({
        _id: "elon.musk",
        password: '12345',
        telefono: "2345678912", 
    });
    await istruttore.save();
}