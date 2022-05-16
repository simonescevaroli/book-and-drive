var my_id="a1";
function available_istructors_request()
{
    var form = document.getElementById("data_ora").elements;
    var data = form["data"].value;
    var ora = form["ora"].value;
    var stringa_data_ora= data+"T"+ora;
    alert(stringa_data_ora);
    fetch('http://localhost:8080/api/v1/istruttori/verificaDiponibilita',{
        method:"GET",

        body:stringa_data_ora
    }).then((res)=>{
        console.log(resp);

    }); 
};
 