function login_studente(){

    //get the form object
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
   
    fetch('../api/v1/autenticazione_studenti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { username_studente: username, password: password } ),
    })
    .then((resp) => { return resp.json(); }) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
       console.log(data);
       if(data.success){
           document.cookie = 'token='+data.token+"; "+" role="+data.role+"; expires=Thu, 01 Jan 2023 00:00:00 UTC; path=/ ;";
           alert("autenticato con successo");
           window.location="./menu_studente.html";
       }
       else{
           alert(data.message);
           location.reload();
       }
   })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};

function login_istruttore(){

    //get the form object
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
   
    fetch('../api/v1/autenticazione_istruttori', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { username_istruttore: username, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
       console.log(data);
       if(data.success){
           document.cookie = 'token='+data.token+"; "+" role="+data.role+"; path=/ ";
           alert("autenticato con successo");
           window.location="menu_istruttore.html";
       }
       else{
           alert(data.message);
           location.reload();
       }
   })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};

function login_segreteria(){

    //get the form object
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
   
    fetch('../api/v1/autenticazione_segreteria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { username_segreteria: username, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
       console.log(data);
       if(data.success){
           document.cookie = 'token='+data.token+"; "+" role="+data.role+"; path=/ ";
           alert("autenticato con successo");
           window.location="menu_segreteria.html";
       }
       else{
           alert(data.error);
           location.reload();
       }
   })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};
 