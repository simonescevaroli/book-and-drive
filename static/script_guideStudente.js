function visualizzaStudenti(){   
    fetch("http://localhost:8080/api/v1/segreteria/resocontoStudenti",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((resp)=> resp.json()
    .then((res)=>{
        if(resp.status!=200){
            alert(res.message+"\n Ops, qualcosa è andato storto!");
            return;
        }
        var par=document.createElement("p")
        var element = document.getElementById("selez_studenti");
        element.appendChild(par);
        for(let i=0; i<res.length;i++){
            var p= document.createElement("p")
            p.appendChild(document.createTextNode("-"))
            p.innerHTML += '&nbsp&nbsp&nbsp&nbsp';
            p.appendChild(document.createTextNode(res[i].foglio_rosa))
            p.innerHTML += '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
            p.appendChild(document.createTextNode(res[i].nome+" "+res[i].cognome))
            p.appendChild(document.createElement('br'));
            element.appendChild(p);
        }
    }))
    .catch(err => alert("errore invio o ricezione dati(resoconto Studenti):"+err));
};

visualizzaStudenti();


function visionaGuide(){
    var form = document.getElementById("idform").elements;
    var id = form["_id"].value;
    fetch("http://localhost:8080/api/v1/segreteria/guideStudente?_id="+id,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((resp)=> resp.json()
    .then((res)=>{
        if(resp.status==400){
            alert(res.error);
            return;
        }else if(resp.status==404){
            alert(res.error);
            return;
        }else if(resp.status==202){
            alert("Questo studente al momento non ha guide prenotate o fatte");
            return;
        }
        const flushid = "guide"
        clearBox(flushid);
        var par=document.createElement("p")
        var element = document.getElementById("guide");
        element.appendChild(par);
        for(let i=0; i<res.length;i++){
            var p= document.createElement("p")
            p.appendChild(document.createTextNode("-"))
            p.innerHTML += '&nbsp&nbsp&nbsp&nbsp';
            p.appendChild(document.createTextNode(res[i].studente))
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
    .catch(err => alert("errore invio o ricezione dati(guideStudente):"+err));
};


function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
}

