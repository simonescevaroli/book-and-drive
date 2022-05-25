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


function mieGuide()
{   
    fetch("http://localhost:8080/api/v1/prenotazioni/mieGuide?token="+getCookie("token"),{
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
        }
        else if(resp.status==403){
            alert("error: "+res.error);
            return;
        }
        else if(resp.status==404){
            alert(res.message+"\n Questo studente non esiste!");
            return
        }
        var par=document.createElement("p");
        var element = document.getElementById("guide");
        element.appendChild(par);
        for(let i=0; i<res.length;i++){
            var p= document.createElement("p")
            p.appendChild(document.createTextNode("-"))
            p.innerHTML += '&nbsp&nbsp&nbsp&nbsp';
            slot = res[i].slot;
            giorno = slot.substring(0,10);
            ora = slot.substring(11,16);
            p.appendChild(document.createTextNode(giorno));
            p.innerHTML += '&nbsp&nbsp';
            p.appendChild(document.createTextNode(ora));
            p.innerHTML += '&nbsp&nbsp&nbsp&nbsp';
            p.appendChild(document.createTextNode(res[i].istruttore))
            p.appendChild(document.createElement('br'));
            element.appendChild(p);
        }
    }))
    .catch(err => alert("errore invio o ricezione dati(visualizzaGuide):"+err));
    
};
mieGuide();
