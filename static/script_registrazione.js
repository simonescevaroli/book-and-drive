function registrazioneStudente(){
    window.location="registrazioneStudente.html";
}

function registrazioneIstruttore(){
    window.location="registrazioneIstruttore.html";
}

function relocLogin(){
    window.location="login.html";
}

function mandaRichiestaStudente(){
    var form = document.getElementById("studform").elements;
    var _id = form["_id"].value;
    var password = form["password"].value;
    var nome = form["nome"].value;
    var cognome = form["cognome"].value;
    var dataNascita = form["dataNascita"].value;
    var telefono = form["telefono"].value;
    var email = form["email"].value;
    fetch("http://localhost:8080/api/v1/studenti/nuovoStudente",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify({_id:_id, password: password, nome: nome, cognome: cognome, dataNascita: dataNascita, telefono: telefono, email: email})
    })
    .then((resp)=> resp.json()
    .then(async (res)=>{
        if(resp.status==500){
            alert(res.error);
            return;
        }else if(resp.status==409){
            alert(res.error);
            return;
        }else if(resp.status==406){
            alert(res.error);
            return;
        }
        alert("Registrazione andata a buon fine, verrai redirezionato alla pagina di login...");
        // Un piccolo timer prima di essere redirezionato
        await new Promise(r => setTimeout(r, 1500));
        relocLogin();
    }))
}

function mandaRichiestaIstruttore(){
    console.log("Istruttore registrato correttamente")
}