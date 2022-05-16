var my_id="a1";
function available_istructors_request()
{
    var form = document.getElementById("data_ora").elements;
    var data = form["data"].value;
    var ora = form["ora"].value;
    var stringa_data_ora= data+"T"+ora+":00.000Z";
    document.write(stringa_data_ora);
    fetch("http://localhost:8080/api/v1/istruttori/verificaDiponibilita?slot="+stringa_data_ora,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(response => response.json())
    .then((res)=>{
        console.log(res.available_istructors);    
    });
     
};
 