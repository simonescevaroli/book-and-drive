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

    document.getElementById("editBtn").style.visibility = "hidden"
    document.getElementById("saveBtn").style.visibility = "visible"


    // get data from table
    var nome = document.getElementById("nome")
    var cognome = document.getElementById("cognome")
    var data_nascita = document.getElementById("data_nascita")
    var telefono = document.getElementById("telefono")
    var email = document.getElementById("email")

    nome.textContent = ''
    cognome.textContent = ''
    data_nascita.textContent = ''
    telefono.textContent = ''
    email.textContent = ''

    var input = document.createElement("input");
    input.setAttribute("id", "nomeEdit")
    input.setAttribute("style", "width: 95%")
    nome.appendChild(input);

    var input = document.createElement("input");
    input.setAttribute("id", "cognomeEdit")
    input.setAttribute("style", "width: 95%")
    cognome.appendChild(input);

    var input = document.createElement("input");
    input.setAttribute("id", "dataNascitaEdit")
    input.setAttribute("style", "width: 95%")
    data_nascita.appendChild(input);

    var input = document.createElement("input");
    input.setAttribute("id", "telefonoEdit")
    input.setAttribute("style", "width: 95%")
    telefono.appendChild(input);

    var input = document.createElement("input");
    input.setAttribute("id", "emailEdit")
    input.setAttribute("style", "width: 95%")
    email.appendChild(input);

    nomeEdit.placeholder = student.nome;
    cognomeEdit.placeholder = student.cognome;
    dataNascitaEdit.placeholder = student.dataNascita.substring(0,10);
    telefonoEdit.placeholder = student.telefono;
    emailEdit.placeholder = student.email;

}

function viewMode(){
    
    document.getElementById("editBtn").style.visibility = "visible"
    document.getElementById("saveBtn").style.visibility = "hidden"

    var nome = document.getElementById("nome")
    var cognome = document.getElementById("cognome")
    var data_nascita = document.getElementById("data_nascita")
    var telefono = document.getElementById("telefono")
    var email = document.getElementById("email")

    var nomeEdit= document.getElementById("nomeEdit")
    var cognomeEdit = document.getElementById("cognomeEdit")
    var dataNascitaEdit = document.getElementById("dataNascitaEdit")
    var telefonoEdit = document.getElementById("telefonoEdit")
    var emailEdit = document.getElementById("emailEdit")   

    // set new student val
    if(nomeEdit.value!=''){ student.nome = nomeEdit.value }
    if(cognomeEdit.value!=''){ student.cognome = cognomeEdit.value }
    if(dataNascitaEdit.value!=''){ student.dataNascita = dataNascitaEdit.value }
    if(telefonoEdit.value!=''){ student.telefono = telefonoEdit.value }
    if(emailEdit.value!=''){ student.email = emailEdit.value }

    nome.textContent = student.nome
    cognome.textContent = student.cognome
    data_nascita.textContent = student.dataNascita.substring(0,10)
    telefono.textContent = student.telefono
    email.textContent = student.email

    nomeEdit.remove()
    cognomeEdit.remove()
    dataNascitaEdit.remove()
    telefonoEdit.remove()
    emailEdit.remove()
}


// modificare studente
function editStudent(){
    // get data from table
    var foglio_rosa = student.foglio_rosa
    var nome = document.getElementById("nomeEdit").value;
    var cognome = document.getElementById("cognomeEdit").value;
    var data_nascita = document.getElementById("dataNascitaEdit").value;
    var telefono = document.getElementById("telefonoEdit").value;
    var email = document.getElementById("emailEdit").value;

    // fill unchanged var
    if(nome==''){nome = student.nome}
    if(cognome==''){cognome = student.cognome}
    if(data_nascita==''){data_nascita = student.dataNascita}
    if(telefono==''){telefono = student.telefono}
    if(email==''){email = student.email}

    var out = JSON.stringify({foglio_rosa: foglio_rosa, nome:nome, cognome: cognome, data_nascita: data_nascita, telefono:telefono, email: email})
    console.log("Studente aggiornato:", out)

    // fetch operation
    fetch("http://localhost:8080/api/v1/segreteria/modificaStudente",{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body:out
    })
    .then(res=>{
        if(res.status==400){
            alert("Errore:", res.message)
            return;
        }
        alert("Operazione avvenuta con successo!")
        viewMode()
    })
    .catch(err=>{
        console.log("Errore:", err)
    })
}

function back(){
    window.location="menu_segreteria.html"
}