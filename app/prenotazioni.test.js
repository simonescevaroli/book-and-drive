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
        await mongoose.connection.close(false);
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
    
    beforeAll( async () => {
        jest.setTimeout(16000);
        jest.unmock('mongoose');
        app.locals.db = await mongoose.connect(process.env.DB_URL);
        await Prenotazione.deleteMany({})
        await Studente.deleteMany({})
        await Istruttore.deleteMany({})
        await populatesAnnullaGuida();
    });
    afterAll( async () => {
        await mongoose.connection.close(false);
    });

    // create token
    var token1 = jwt.sign({
                    username_studente: "foglio_rosa00",
                    role: "studente"},
                process.env.SUPER_SECRET, {
                    expiresIn: 86400});
    
    var token2 = jwt.sign({
                    username_studente: "foglio_rosa01",
                    role: "studente"},
                process.env.SUPER_SECRET, {
                    expiresIn: 86400});

    test("Delete someone else's prenotation", async () => {
        return request(app)
            .delete('/api/v1/prenotazioni/annullaGuida?token=' + token2 + '&_id=62962cf7a9ae1c5bed1c4185')
            .expect(401, { error: 'non puoi cancellare una guida non tua' })
    });

    test('Successful delete', async () => {
        return request(app)
            .delete('/api/v1/prenotazioni/annullaGuida?token=' + token1 + '&_id=62962cf7a9ae1c5bed1c4188')
            .expect(200, { message: 'guida cancellata con successo' })
    });
})

describe("GET /api/v1/prenotazioni/mieGuide",()=>{
    beforeAll( async () => { jest.setTimeout(80000);
            app.locals.db = await mongoose.connect(process.env.DB_URL);
            await Prenotazione.deleteMany({})
            await Studente.deleteMany({})
            await populatesMieGuide();
            
    });
    afterAll(async () => { await mongoose.connection.close(true); });
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
 
    test('GET /api/v1/prenotazioni/mieGuide with Student specified and correct token',async () => {
        const res = await request(app).get('/api/v1/prenotazioni/mieGuide?token='+token1)
        .set('Accept', 'application/json')
        expect(res.status).toEqual(200);
        if(res.status==200){
            var dati = res._body
            var data=true
 
            if( dati[1].istruttore!="elon.musk1"||dati[1].studente!="Giorgio Rossi"||dati[1].slot!="2022-05-07T18:00:00.000Z")
                data=false;
            expect(data).toEqual(true); 
             
        }
    });
    test('GET /api/v1/studenti/mieGuide?token=token2 should respond json containing an error message because token2 contains an inexisting id in the db', async () => {
        return request(app).get('/api/v1/prenotazioni/mieGuide?token=' + token2)
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(404)
            });
    });
    test('GET /api/v1/studenti/mieGuide?token=token4 should respond json containing an error message because token4 the username_studente field is an empty string', async () => {
        return request(app).get('/api/v1/prenotazioni/mieGuide?token=' + token4)
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(400)
            });
    });
    test('GET /api/v1/studenti/mieGuide?token=token3 should respond json containing an error because the token is not valid due to the wrong encryption key', async () => {
        return request(app).get('/api/v1/prenotazioni/mieGuide?token=' + token3)
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(403)
            });
    });
    test('GET /api/v1/studenti/mieGuide?token=token5 should respond json containing an error because the token is not valid due to the time expiration', async () => {
     return request(app).get('/api/v1/prenotazioni/mieGuide?token=' + token5)
         .expect('Content-Type', /json/).then((res) => {
             expect(res.status).toEqual(403)
         });
 });
    test('GET /api/v1/studenti/mieGuide should respond json containing an error message beacuse no token was sent', async () => {
        return request(app).get('/api/v1/prenotazioni/mieGuide')
            .expect('Content-Type', /json/).then((res) => {
                expect(res.status).toEqual(403)
            });
    });
    setTimeout(function() {
    }, 3000);
 })
 
 

describe("POST /api/v1/prenotazioni/modificaPresenza",()=>{
})


async function populatesAnnullaGuida(){
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


    let prenotazione = new Prenotazione({
        username_studente: "foglio_rosa00",
        nominativo_studente: "Giorgio Rossi",
        username_istruttore:"elon.musk",
        slot: new Date("2022-05-07T00:00:00.000Z"),
        presenza: true
     });
    await prenotazione.save();

    
    prenotazione = new Prenotazione({
        _id: '62962cf7a9ae1c5bed1c4185',
        username_studente: "foglio_rosa00",
        nominativo_studente: "Giorgio Rossi",
        username_istruttore:"elon.musk",
        slot: new Date("2022-05-07T18:00:00.000Z"),
        presenza: true
    });
    await prenotazione.save();

    prenotazione = new Prenotazione({
        _id: '62962cf7a9ae1c5bed1c4188',
        username_studente: "foglio_rosa00",
        nominativo_studente: "Giorgio Rossi",
        username_istruttore:"elon.musk",
        slot: new Date("2022-06-07T12:00:00.000Z"),
        presenza:true
     });
    await prenotazione.save();
    
    let istruttore = new Istruttore({
        _id: "elon.musk",
        password: '12345',
        telefono: "2345678912", 
    });
    await istruttore.save();
}


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


async function populatesMieGuide(){
    let studente = new Studente({
        _id: "foglio_rosa00",
        nome: "Giorgio",
        cognome: "Rossi",
        dataNascita: new Date("2000-05-07T00:00:00.000Z"),
        telefono: "3459905727",
        email: "giorgio.rossi@gmail.com"   
    });
    await studente.save();
 
   studente = new Studente({
        _id : "foglio_rosa01",
        password : "pass",
        nome: "alberto",
        cognome: "gusmeroli",
        dataNascita: new Date("04-03-2002"),
        telefono: "3490901508",
        email: "albegus@gmail.com"    
    });
    await studente.save();
    let prenotazione = new Prenotazione({
        username_studente: "foglio_rosa00",
        nominativo_studente: "Giorgio Rossi",
        username_istruttore:"elon.musk1",
        slot: new Date("2022-05-07T00:00:00.000Z"),
        presenza: true
     });
    await prenotazione.save();
 
    
    
    prenotazione = new Prenotazione({
        username_studente: "foglio_rosa00",
        nominativo_studente: "Giorgio Rossi",
        username_istruttore:"elon.musk1",
        slot: new Date("2022-05-07T18:00:00.000Z"),
        presenza: true
    });
    await prenotazione.save()
    prenotazione = new Prenotazione({
        username_studente: "foglio_rosa00",
        nominativo_studente: "Giorgio Rossi",
        username_istruttore:"elon.musk1",
        slot: new Date("2022-06-07T12:00:00.000Z"),
        presenza:true
     });
 
 
    await prenotazione.save();
 
    }