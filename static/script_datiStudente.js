var student

// ottenere ID studente dal form e caricare dati in tabella
function getStudentID(){
    var form = document.getElementById("id_studente").elements;
    var id_studente = form["id_studente"].value
    console.log("ID STUD:", id_studente)

    fetch("http://localhost:8080/api/v1/segreteria/resocontoStudente?id="+id_studente,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
    })
    .then((res)=>{
        res.json()
        .then((el)=>{
            if(res.status==404 || res.status==400){
                alert("Errore: impossibile caricare dati per questo ID");
            } else {
                student = el
                showTable()
                setTableData(el)
            }
            
        })
        .catch(err=>alert(err));
    })
    .catch(err=>alert(err));
    
}

function showTable(){
    document.getElementById("dataTable").style.visibility = "visible"
    document.getElementById("buttons").style.visibility = "visible"
}


// inserire dati di student in tabella
function setTableData(student){
    // get html IDs
    var foglioRosa = document.getElementById("foglio_rosa");
    var nome = document.getElementById("nome");
    var cognome = document.getElementById("cognome");
    var dataNascita = document.getElementById("data_nascita");
    var telefono = document.getElementById("telefono");
    var email = document.getElementById("email");

    // set text fields with retrieved student data
    foglioRosa.textContent = student.foglio_rosa;
    nome.textContent = student.nome;
    cognome.textContent = student.cognome;
    dataNascita.textContent = student.dataNascita.substring(0,10);
    telefono.textContent = student.telefono;
    email.textContent = student.email;
}


// entrare in edit mode
function editMode(){
}

function back(){
    window.location="menu_segreteria.html"
}