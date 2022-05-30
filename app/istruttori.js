const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');

router.get('/visualizzaImpegni', async (req,res)=>{
    //Visualizza le guide prenotate con me (istruttore)
    const istr = req.loggedUser.username_istruttore;

    try{
        let prenotazioni = await Prenotazione.find({username_istruttore:istr}); //array of prenotazione with id_istruttore equal to istr
        if(prenotazioni.length == 0){
            res.status(200).json({
                confirm: 'fail',
                description: 'Nessuna prenotazione trovata'
        })
        } else {
            prenotazioni = prenotazioni.map((prenot)=>{
                return {
                    self: "api/v1/prenotazioni/" + prenot.id,
                    slot: prenot.slot.toISOString(),
                    studente: prenot.nominativo_studente,
                    presenza: prenot.presenza
                };
            })
            res.status(200).json(prenotazioni);
        }
    }
    catch(err){
        res.status(400).json({
            confirm: 'fail',
            error: err.message,
            description: 'Impossibile caricare dati personali'
        })
    }

});

router.get('/verificaDiponibilita',async (req,res)=>{
    //verifica disponibilità degli istruttori
    console.log("verifica disponibilità");
    console.log("slot:",req.query.slot)
    
    if( req.query.slot[10]!=="T" || req.query.slot[23]!=="Z"){
        res.status(400).json({error: "slot temporale non fornito in formato ISO_8601"});
        return;
    }
    var slot=new Date(req.query.slot);
    if(!slot.getDate() || !slot.getTime()){
        res.status(400).json({error: "data o ora non fornite"});
        return;
    }
    console.log(slot);
    //recupero gli id di tutti gli istruttori nel db
    var all_istructors= await Istruttore.find({},{_id:1}).exec();
    for(let i=0; i < all_istructors.length; i++){
        all_istructors[i]=all_istructors[i]._id.toString();
    }
    console.log(all_istructors);

    //recupero gli id di tutti gli istruttori già prenotati per quella data e ora
    const booked_istructors= await Prenotazione.find({slot: slot},{username_istruttore:1 }).exec();
    console.log(booked_istructors);
    for(let i=0; i < booked_istructors.length; i++){
        booked_istructors[i]=booked_istructors[i].username_istruttore;
    }
    console.log("istruttori già prenotati "+booked_istructors);

    //salvo gli id degli istruttori non occupati per quello slot temporale
    var available_istructors_id = [];
    for(let i=0; i < all_istructors.length;i++){
        if(!booked_istructors.includes(all_istructors[i])){
            available_istructors_id.push(all_istructors[i]);
        }
    };
    console.log("istruttori disponibili "+ available_istructors_id);
    //recupero dati degli istruttori disponibili e li invio in risposta al client oppure invio l errore riscontrato
    Istruttore.find({_id: {$in: available_istructors_id}},{_id:1}).exec().then((data)=>{    
        if(!data.length){
            console.log("no istruttori");
            res.status(203).json({
                message:"non ci sono istruttori disponibili per quello slot"
            });
            
        }
        else{
            res.status(200).json({
                available_istructors: data
            });
        }
    })
    .catch((err)=>{ 
        console.log("errore:"+err);
        res.status(404).json({error: ''+err});
    });

});

    
router.get('/prenotazioniIstruttore', async (req,res)=>{
    var username_istruttore=req.loggedUser.username_istruttore;
    var istruttore= await Istruttore.findOne({_id:username_istruttore}).exec();
    if(!istruttore.username_istruttore){
        res.status(404).json({
            success: false,
            description: 'username istruttore non esiste'
       })
       return;
    }
    var prenotazioni_istruttore= await Prenotazione.find({username_istruttore:username_istruttore})


    if(prenotazioni_istruttore.length==0){
        res.status(202).json({
            success: true,
            message: 'Nessuna prenotazione per istruttore con id '+username_istruttore
       })
       return
    }
    else{
        res.status(200).json({
            success: true,
            prenotazioni_istruttore:prenotazioni_istruttore
        })
        
    }
});

module.exports = router;