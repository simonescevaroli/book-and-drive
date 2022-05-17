var my_id="a1";
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
    .then(response => response.json())
    .then((res)=>{
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

        var submit_btn = document.createElement("button")
        submit_btn.setAttribute("type", "button");
        submit_btn.textContent="Prenota";
        submit_btn.setAttribute("onclick","effettua_prenotazione()")
        form.appendChild(submit_btn);
        element.appendChild(form);
        
    })
    .catch(err => console.log(err));
    
};

function effettua_prenotazione(){

    
}
