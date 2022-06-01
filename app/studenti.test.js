const request = require('supertest'); const app = require('./app');
const jwt = require('jsonwebtoken'); const mongoose = require('mongoose');
jest.setTimeout(60 * 1000)
describe("GET /api/v1/studenti/me", ()=>{
    let studentSpy; // Moking Book.find method
    beforeAll(() => {
       const Studente = require('./models/studente.js');
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
             return {}; //if asked for a student that does not exist in the database
          }
       });
       
    });
    afterAll(async () => {
       studentSpy.mockRestore();
    });
    var token1 = jwt.sign({
          username_studente: "foglio_rosa00",
          role: "studente"
       },
       process.env.SUPER_SECRET, {
          expiresIn: 86400
       });

    var token2 = jwt.sign({
          username_studente: "foglio_rosa12",
          role: "studente"
       },
       process.env.SUPER_SECRET, {
          expiresIn: 86400
       });
       var token3 = jwt.sign({
           username_studente: "foglio_rosa12",
           role: "studente"
        },
        "secret", {
           expiresIn: 86400
        });
        var token4 = jwt.sign({
           username_studente:"",
           role: "studente"
        },
        process.env.SUPER_SECRET, {
           expiresIn: 86400
        });
        var token5 = jwt.sign({
            username_studente:"foglio_rosa00",
            role: "studente"
         },
         process.env.SUPER_SECRET, {
            expiresIn: -1
         }); 
    
        test('GET /api/v1/studenti/me?token=token1 should return code 200', async () => {
            return request(app).get('/api/v1/studenti/me?token=' + token1)
                .expect('Content-Type', /json/).then((res) => {
                    expect(res.status).toEqual(200)
                    var dati=(JSON.parse(res.text));
                    
                    var data=true
                    if( dati.self!="/api/v1/studenti/foglio_rosa00"||dati.nome!="Giorgio"|| dati.cognome !="Rossi"||dati.dataNascita!="2000-05-07T00:00:00.000Z"||dati.telefono!= "3459905727" || dati.email!= "giorgio.rossi@gmail.com")
                        data=false;
                    expect(data).toEqual(true); 
                });
        });
       test('GET /api/v1/studenti/me?token=token2 should respond json containing an error message because token2 contains an inexisting id in the db', async () => {
           return request(app).get('/api/v1/studenti/me?token=' + token2)
               .expect('Content-Type', /json/).then((res) => {
                   expect(res.status).toEqual(400)
               });
       });
       test('GET /api/v1/studenti/me?token=token4 should respond json containing an error message because token4 the username_studente field is an empty string', async () => {
           return request(app).get('/api/v1/studenti/me?token=' + token4)
               .expect('Content-Type', /json/).then((res) => {
                   expect(res.status).toEqual(400)
               });
       });
       test('GET /api/v1/studenti/me?token=token3 should respond json containing an error because the token is not valid due to the wrong encryption key', async () => {
           return request(app).get('/api/v1/studenti/me?token=' + token3)
               .expect('Content-Type', /json/).then((res) => {
                   expect(res.status).toEqual(403)
               });
       });
       test('GET /api/v1/studenti/me?token=token5 should respond json containing an error because the token is not valid due to the time expiration', async () => {
        return request(app).get('/api/v1/studenti/me?token=' + token5)
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(403)
            });
    });
       test('GET /api/v1/studenti/me should respond json containing an error message beacuse no token was sent', async () => {
           return request(app).get('/api/v1/studenti/me')
               .expect('Content-Type', /json/).then((res) => {
                   expect(res.status).toEqual(403)
               });
       });
});