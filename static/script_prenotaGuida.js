var my_id="foglio_rosa03587";
function available_istructors_request()
{   
    var form = document.getElementById("data_ora").elements;
    var data = form["data"].value;
    var ora = form["ora"].value;
    var stringa_data_ora= data+"T"+ora+":00.000Z";
    console.log(stringa_data_ora);
    fetch("http://localhost:8080/api/v1/istruttori/verificaDiponibilita?slot="+stringa_data_ora,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
    })

    .then((resp)=>{
        res=resp.json();
        if(resp.status==204){
            alert(res.message+"\n riprova con un'altra data");
            return;
        }
        else if(resp.status==404){
            alert(res.message+"\n riprova in un secondo momento");
            return;
        }
        console.log(resp.status);
        return res;
    }).then((res)=>{
        
        console.log(res.available_istructors[0]);
        var br = document.createElement("br");
        console.log("br",br);
        var tag=document.createElement("p")
        var text = document.createTextNode("Scegli un istruttore tra quelli disponibili:");
        tag.appendChild(text);
        var form = document.createElement("form");
        form.setAttribute("id","selectIstructor");
        var element = document.getElementById("selezione_istruttore");
        element.appendChild(tag);
        for(let i=0; i<res.available_istructors.length;i++){
            var RB = document.createElement("input");
            var label= document.createElement("label")
            RB.setAttribute("type", "radio");
            RB.setAttribute("name","istructor")
            RB.setAttribute("value", res.available_istructors[i]._id);
            label.appendChild(RB);
            label.appendChild(document.createTextNode(res.available_istructors[i]._id))
            label.appendChild(document.createElement('br'));
            form.appendChild(label);
        }
        form.appendChild(document.createElement("br"));
        var submit_btn = document.createElement("button")
        submit_btn.setAttribute("type", "button");
        submit_btn.textContent="Prenota";
        submit_btn.setAttribute("onclick","effettua_prenotazione()")
        form.appendChild(submit_btn);
        element.appendChild(form);
        
    })
    .catch(err=>alert(err));
    
};

function effettua_prenotazione(){
    var form = document.getElementById("data_ora").elements;
    var data = form["data"].value;
    var ora = form["ora"].value;
    var stringa_data_ora= data+"T"+ora+":00.000Z";
    var istructors = document.getElementsByName('istructor');
              
    for(i = 0; i < istructors.length; i++) {
        if(istructors[i].checked){
            console.log("istruttore selezionato:",istructors[i].value);
            invia_dati_per_prenotazione(stringa_data_ora,istructors[i].value);
        }
    }

}

function invia_dati_per_prenotazione(slot,username_istruttore){
    console.log("username istruttore:",username_istruttore)
    fetch("http://localhost:8080/api/v1/prenotazioni/prenotaGuida/?username_studente="+my_id,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body:JSON.stringify({slot:slot,username_istruttore: username_istruttore})
    })
    .then((resp)=>{
        res=resp.json()
        
        if(resp.status==208){
            alert(res.message+"\n"+"URI:"+res.self);
            
        }
        else if(resp.status==201){
            alert(res.message+'\nHai effettuato la prenotazione con slot orario:'+slot+" e istruttore: "+username_istruttore+'\n'+"ritorna al menù");
        }
        else if(resp.status==404){
            alert(res.error+'\nriprova');
            location.reload();
        }
        
    })
    .catch(err => alert("errore invio o ricezione dati(invia dati prenotazione):"+err));
}
