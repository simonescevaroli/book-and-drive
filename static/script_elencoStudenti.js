function listStudents(){
    fetch("http://localhost:8080/api/v1/segreteria/resocontoStudenti",{
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

        var tbodyRef = document.getElementById('tab').getElementsByTagName('tbody')[0];

        res.forEach(student => {

            // each student in a new raw
            var newRow = tbodyRef.insertRow();

            // foglio rosa
            var newCell = newRow.insertCell();
            var newText = document.createTextNode(student.foglio_rosa);
            newCell.appendChild(newText);

            // nome
            newCell = newRow.insertCell();
            newText = document.createTextNode(student.nome);
            newCell.appendChild(newText);

            // cognome
            newCell = newRow.insertCell();
            newText = document.createTextNode(student.cognome);
            newCell.appendChild(newText);

            // data di nascita
            newCell = newRow.insertCell();
            newText = document.createTextNode(student.dataNascita.substring(0,10));
            newCell.appendChild(newText);

            // telefono
            newCell = newRow.insertCell();
            newText = document.createTextNode(student.telefono);
            newCell.appendChild(newText);

            // email
            newCell = newRow.insertCell();
            newText = document.createTextNode(student.email);
            newCell.appendChild(newText);

        });

    }))
    .catch(err => alert("errore in visualizzazione elenco studenti iscritti:" + err));
}

listStudents();