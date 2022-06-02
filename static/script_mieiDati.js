function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


function mostraDatiPersonali(){
    fetch("../api/v1/studenti/me?token="+getCookie("token"),{
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
        }else if(resp.status==403){
          alert("error: "+res.error);
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