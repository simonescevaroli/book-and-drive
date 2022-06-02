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

function get_page_prenota(){
    window.location="prenotaGuida.html"
}
function get_page_annulla(){
    
    window.location="annullaGuida.html"
}
function get_page_mieGuide(){
    
    window.location="mieGuide.html"    
}
function get_page_mieiDati(){
    
    window.location="mieiDati.html"
}
function get_help_studente(){
    fetch("../api/v1/help?token="+getCookie("token"),{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
    })
    .then((resp)=>{
        resp.json().then((res)=>{
            if(resp==400){
                alert(res.error);
            }
            else if(resp==403){
                alert(res.error)
            }
            else{
                alert(res.message);
            }

        })
    })
}
function logout(){
    window.location="login.html"
}