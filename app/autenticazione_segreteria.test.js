const request = require('supertest'); const app = require('./app');
const jwt = require('jsonwebtoken'); const mongoose = require('mongoose');
const segreteria = require('./models/segreteria');

describe('POST /api/v1/autenticazione_segreteria',()=>{
    
    let fSpy; 
    beforeAll(() => {
        jest.setTimeout(16000);
        fSpy = jest.spyOn(segreteria, 'findOne').mockImplementation((user) => {
        if (user.username == "admin") { 
            return {
              _id: '62962cf7a9ae1c5bed1c4189',
              username: 'admin',
              password: 'admin'
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

    test('POST /api/v1/autenticazione_segreteria con username non valido', () => {
        return request(app)
        .post('/api/v1/autenticazione_segreteria')
        .send({ username_segreteria: 'x', password: 'admin'})
        .expect(401);
    });

    test('POST /api/v1/autenticazione_segreteria con password errata', () => {
        return request(app)
        .post('/api/v1/autenticazione_segreteria')
        .send({ username_segreteria: 'admin', password: 'x'})
        .expect(401);
    });

    test('POST /api/v1/autenticazione_segreteria con password corretta', () => {
        return request(app)
        .post('/api/v1/autenticazione_segreteria')
        .send({ username_segreteria: 'admin', password: 'admin'})
        .then((ret)=>{
            expect(ret.status).toBe(200)
            expect(ret.body.success).toBe(true)
            expect(ret.body.message).toBe('Enjoy your token!')
            expect(ret.body.role).toBe('segreteria')
            })
        
    });

})