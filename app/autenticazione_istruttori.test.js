const request = require('supertest'); const app = require('./app');
const jwt = require('jsonwebtoken'); const mongoose = require('mongoose');
const Istruttore = require('./models/istruttore.js');

describe('POST /api/v1/autenticazione_istruttori',()=>{

    let fSpy; 
    beforeAll(() => {
        jest.setTimeout(16000);
       fSpy = jest.spyOn(Istruttore, 'findOne').mockImplementation((user_istr) => {
        if (user_istr._id == "jeff.bezos") { 
            return {
                _id: "jeff.bezos",
                password: '098',
                telefono: "43545325", 
             };
          }
           else {
             return {};
          }
       });
       
    });
    afterAll(async () => {
       fSpy.mockRestore();
    });

    test('POST /api/v1/autenticazione_istruttori con username non valido', () => {
        return request(app)
        .post('/api/v1/autenticazione_istruttori')
        .send({ username_istruttore: 'x', password: '098'})
        .expect(401);
    });

    test('POST /api/v1/autenticazione_istruttori con password errata', () => {
        return request(app)
        .post('/api/v1/autenticazione_istruttori')
        .send({ username_istruttore: 'jeff.bezos', password: 'x'})
        .expect(401);
    });

    test('POST /api/v1/autenticazione_istruttori con password corretta', () => {
        request(app)
        .post('/api/v1/autenticazione_istruttori')
        .send({ username_istruttore: 'jeff.bezos', password: '098'})
        .then((ret)=>{
            expect(ret.status).toBe(200)
            expect(ret.body.success).toBe(true)
            expect(ret.body.message).toBe('Enjoy your token!')
            expect(ret.body.username_istruttore).toBe('jeff.bezos')
            expect(ret.body.role).toBe('istruttore')
            return ret;
            })
    });

})
