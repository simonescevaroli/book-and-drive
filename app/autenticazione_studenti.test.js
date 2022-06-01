const request = require('supertest'); const app = require('./app');
const jwt = require('jsonwebtoken'); const mongoose = require('mongoose');
const Studente = require('./models/studente.js');

describe('POST /api/v1/autenticazione_studenti',()=>{

    let studentSpy; 
    beforeAll(() => {
        jest.setTimeout(16000);
        studentSpy = jest.spyOn(Studente, 'findOne').mockImplementation((user_stud) => {
        if (user_stud._id == "foglio_rosa00") { 
            return {
                id: "foglio_rosa00",
                nome: "Giorgio",
                cognome: "Rossi",
                dataNascita: new Date("2000-05-07T00:00:00.000Z"),
                telefono: "3459905727",
                email: "giorgio.rossi@gmail.com"
             };
          }
           else {
             return {};
          }
       });
       
    });
    afterAll(async () => {
       studentSpy.mockRestore();
    });

    test('POST /api/v1/autenticazione_studenti con username non valido', () => {
        return request(app)
        .post('/api/v1/autenticazione_studenti')
        .send({ username_studente: 'x', password: 'pass'})
        .expect(401);
    });

    test('POST /api/v1/autenticazione_studenti con password errata', () => {
        return request(app)
        .post('/api/v1/autenticazione_studenti')
        .send({ username_studente: 'foglio_rosa00', password: 'x'})
        .expect(401);
    });

    test('POST /api/v1/autenticazione_studenti con password corretta', () => {
        request(app)
        .post('/api/v1/autenticazione_studenti')
        .send({ username_studente: 'foglio_rosa00', password: 'pass'})
        .then((ret)=>{
            expect(ret.status).toBe(200)
            expect(ret.body.success).toBe(true)
            expect(ret.body.message).toBe('Enjoy your token!')
            expect(ret.body.username_studente).toBe('foglio_rosa00')
            expect(ret.body.role).toBe('studente')
            return ret;
            })
        
    });
})