const express = require('express');
const router = express.Router();

const student_message="-PRENOTA: con questa funzionalità puoi visualizzare gli istruttori disponiibili per una certa\n\
data ed un certo orario, selezionarne uno, e prenotare la guida.\n\
-ANNULLA: con questa funzionalità puoi annullare una tua guida inserendo l'id di quest'ultima nel box indicato e \n\
cliccando annulla.\n\
-RESOCONTO: in questa sezione puoi vedere tutte le guide da te prenotate.\n\
-MIEI DATI: in questa sezione puoi verificare la correttezza dei tuoi dati personali registrati dall'autoscuola.";

const istr_message="-MIEI IMPEGNI: in questa sezione ti è possibile visualizzare quali guide sono state prenotate con te come istruttore. \n\
-REGISTRO PRESENZE: con questa funzionalità piuoi indicare se uno studente si è presentato o meno ad una guida spuntando il \n\
checkbox relativo.\n\
-MODIFICA DISPONIBILITÀ: con questa funzionalità ti è possibile indicare degli slot orari in cui non sarai disponibile per una guida.";

const secr_message="-ELENCO PRENOTAZIONI: con questa funzionalità è possibile visionare tutte le prenotazioni di tutti gli studenti.\n\
-ELENCO STUDENTI: in questa sezione vengono visualizzati i dati personali di tutti gli studenti.\n\
-PRENOTAZIONE STUDENTE: con questa funzionalità è possibile, indicando il foglio rosa di uno specifico studente,\n\
vedere solo le guide relativo a quello studente.\n\
-STUDENTE: in questa sezione puoi, indicando il codice foglio rosa di uno studente, vedere i suoi dati personali\n\
e modificarli nel caso fosse necessario.";

router.get('', async(req,res)=>{
    //Richiesta guide studente
    const role = req.loggedUser.role;
    if (!role){
        res.status(400).json({ error: 'ruolo dello user non presente nel token' });
        return;
    }

    else if(role=="studente"){
        res.status(200).json({message:student_message});
    }
    
    else if(role=="istruttore"){
        res.status(200).json({message:istr_message});
    }
    else if(role=="segreteria"){
        res.status(200).json({message:secr_message});
    }
    else{
        res.status(400).json({message:"role unidentified"});
    }

});

module.exports = router;