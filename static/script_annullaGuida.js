var my_id="foglio_rosa07589"

visualizza_mie_guide();

function visualizza_mie_guide(){
    var mie_prenotazioni=document.getElementById("visualizza guide");
    fetch("http://localhost:8080/api/v1/prenotazioni/mieGuide?username_stud="+my_id,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((resp)=>{
        
        if(resp.status==404 || resp.status==500 || resp.status==400){
            
            resp.json().then((res)=>{
                alert(res.error);
            });
        }

        else if(resp.status==200){
            resp.json().then((res)=>{
                console.log(res.length);
                for(let i=0; i < res.length; i++){
                    var tag=document.createElement("p");
                    var textID=document.createTextNode("Guida con id: "+res[i].id_guida);
                    tag.appendChild(textID);
                    tag.appendChild(document.createElement("br"));
                    var textSlot=document.createTextNode("data: "+res[i].slot);
                    tag.appendChild(textSlot);
                    tag.appendChild(document.createElement("br"));
                    var textIstruct=document.createTextNode("istruttore: "+res[i].istruttore);
                    tag.appendChild(textIstruct);
                    tag.appendChild(document.createElement("br"));
                    mie_prenotazioni.appendChild(tag);
                }
            });
        }
    
    }).catch(err=>console.log(err))
    
}


function annullaGuida(){
    var box=document.getElementById("box")
    var id_guida=box.value;
    fetch("http://localhost:8080/api/v1/prenotazioni/annullaGuida?_id="+id_guida,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((resp)=>{
        console.log(resp.status);
        resp.json().then((res)=>{
            if(resp.status==200){
                alert(res.message);
            }
            else if(resp.status==500){
                alert(res.error);
            }
        })
    })
}
