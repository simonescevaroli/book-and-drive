var student_id = '0123'

function mostraDatiPersonali(){
    fetch("http://localhost:8080/api/v1/studenti/me?id=" + student_id,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((resp)=> resp.json()
    .then((res)=>{
        if(resp.status==400){
            alert(res.message+"\n Ops, qualcosa è andato storto!");
            return;
        }else if(resp.status==404){
            alert(res.message+"\n Questo studente non esiste!");
            return
        }

        // get html IDs
        var foglioRosa = document.getElementById("foglio_rosa");
        var nome = document.getElementById("nome");
        var cognome = document.getElementById("cognome");
        var dataNascita = document.getElementById("data_nascita");
        var telefono = document.getElementById("telefono");
        var email = document.getElementById("email");

        // set text fields with retrieved student data
        foglioRosa.textContent = res.foglio_rosa;
        nome.textContent = res.nome;
        cognome.textContent = res.cognome;
        dataNascita.textContent = res.dataNascita.substring(0,10);
        telefono.textContent = res.telefono;
        email.textContent = res.email;

    }))
    .catch(err => alert("errore in visualizzazione dati personali studente:"+err));
}

mostraDatiPersonali();