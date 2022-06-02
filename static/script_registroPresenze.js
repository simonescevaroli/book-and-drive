function loadPrenotazioni(){
  console.log("Caricamento prenotazioni...")
  fetch("../api/v1/istruttori/prenotazioniIstruttore?token="+getCookie("token"),{

      method:"GET",
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
  })
  .then((res)=>{
      console.log("TOKEN:", getCookie("token"))
      res.json()
      .then((el)=>{
          if(res.status==404 || res.status==400){
              alert("Errore: impossibile caricare dati per questo ID");
              return;
          }
          var tbodyRef = document.getElementById('tab').getElementsByTagName('tbody')[0];
          el.prenotazioni_istruttore.forEach(prenot => {
              var id_prenot = prenot._id
              var data = prenot.slot.substring(0, 10)
              var ora = prenot.slot.substring(11, 16)
              var nome_studente = prenot.nominativo_studente 

              // each prenotation in a new raw
              var newRow = tbodyRef.insertRow();

              // data
              newCell = newRow.insertCell();
              newText = document.createTextNode(data);
              newCell.appendChild(newText);

              // ora
              newCell = newRow.insertCell();
              newText = document.createTextNode(ora);
              newCell.appendChild(newText);

              // nome studente
              newCell = newRow.insertCell();
              newText = document.createTextNode(nome_studente);
              newCell.appendChild(newText);

              // presenza

              newCell = newRow.insertCell();
              var checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              newCell.appendChild(checkbox);
              if(prenot.presenza){
                checkbox.checked = true
              }
              checkbox.addEventListener('change', function() {
                if (this.checked) {
                  console.log("Checkbox is checked..");
                } else {
                  console.log("Checkbox is not checked..");
                  console.log("Deleting prenotazione ", id_prenot)
                }
                // fetch operation
                fetch("../api/v1/prenotazioni/modificaPresenza?token="+getCookie("token")+"&id_guida=" + id_prenot,{
                  method:"POST",
                  headers: {
                      'Content-Type': 'application/json',
                      "Access-Control-Allow-Origin": "*"
                    },
                  })
                  .then(res=>{
                      if(res.status==401 || res.status==404){
                          console.log("Errore:", res.error)   // errore
                          //alert("Errore:", res)
                          return;
                      }
                  })
                  .catch(err=>alert(err))
                }
              );
          });
      })
      .catch(err=>alert(err));
  })
  .catch(err=>alert(err));

}


function back(){
  window.location="menu_istruttore.html"
}

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