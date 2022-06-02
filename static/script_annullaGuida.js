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



visualizza_mie_guide();

function visualizza_mie_guide(){
    var mie_prenotazioni=document.getElementById("visualizza guide");
    fetch("/../api/v1/prenotazioni/mieGuide?token="+getCookie("token"),{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((resp)=>{
        
        if(resp.status==404 || resp.status==500 || resp.status==400 || resp.status==403){
            
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
    fetch("/../api/v1/prenotazioni/annullaGuida?token="+getCookie("token")+"&_id="+id_guida,{
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
            else if(resp.status==500 || resp.status==401 ||resp.status==403 ){
                alert(res.error);
            }
        })
    })
}
