function login_studente(){

    //get the form object
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
   
    fetch('http://localhost:8080/api/v1/autenticazione_studente', {
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