const request = require('supertest'); const app = require('./app');
const jwt = require('jsonwebtoken'); const mongoose = require('mongoose');
const Studente = require('./models/studente.js');
const Istruttore = require('./models/istruttore.js')

describe("POST /api/v1/registrazione/nuovoIstruttore", ()=>{
    beforeAll(async () => {
        jest.setTimeout(10000);
        app.locals.db = await mongoose.connect(process.env.DB_URL);
        await Istruttore.deleteMany({})
     });
     afterAll(async() => {
        await mongoose.connection.close(false);
     });
             //===================================TEST NUOVO ISTRUTTORE====================================//
    test('POST /api/v1/registrazione with all the fields full', () => {
        data={
            _id:"elon.fusk",
                password:"12345",
                telefono:"2345678912",
        }
        return request(app).post('/api/v1/registrazione/nuovoIstruttore')
           .set('Accept', 'application/json')
           .send(data)
           .expect(201);
     });
     test('POST /api/v1/registrazione with password not specified', () => {
        data={
            _id:"elon.fusk",
            password:"",
            telefono:"2345678912",
        }
        return request(app).post('/api/v1/registrazione/nuovoIstruttore')
           .set('Accept', 'application/json')
           .send(data)
           .expect(406);
     });
     setTimeout(function() {
    }, 3000);
});

describe("POST /api/v1/registrazione/nuovoStudente", ()=>{
    beforeAll(async () => {
        jest.setTimeout(8000);
        app.locals.db = await mongoose.connect(process.env.DB_URL);
        await Studente.deleteMany({})

     });
     afterAll(async() => {
       await mongoose.connection.close(false);
        
     });
              //===================================TEST NUOVO STUDENTE====================================//
    test('POST /api/v1/registrazione with all the fields full', () => {
        data={
            _id:"foglio_rosa04",
            password:"12345",
            nome:"Giorgio",
            cognome:"Rossi",
            dataNascita:"2000-04-03T00:00:00.000Z",
            telefono:"2345678912",
            email:"giorgio.rossi@gmail.com"
        }
        return request(app).post('/api/v1/registrazione/nuovoStudente')
           .set('Accept', 'application/json')
           .send(data)
           .expect(201);
     });
     test('POST /api/v1/registrazione with a student that shuold be already in in the database', () => {
        data={
            _id:"foglio_rosa04",
            password:"12345",
            nome:"Giorgio",
            cognome:"Rossi",
            dataNascita:"2000-04-03T00:00:00.000Z",
            telefono:"2345678912",
            email:"giorgio.rossi@gmail.com"
        }
        return request(app).post('/api/v1/registrazione/nuovoStudente')
           .set('Accept', 'application/json')
           .send(data)
           .expect(409);
     });
     test('POST /api/v1/registrazione with password not specified', () => {
        data={
            _id:"foglio_rosa088",
            password:"",
            nome:"Giorgio",
            cognome:"Rossi",
            dataNascita:"2000-04-03T00:00:00.000Z",
            telefono:"2345678912",
            email:"giorgio.rossi@gmail.com"
        }
        return request(app).post('/api/v1/registrazione/nuovoStudente')
           .set('Accept', 'application/json')
           .send(data)
           .expect(406);
     });
     
    
});
