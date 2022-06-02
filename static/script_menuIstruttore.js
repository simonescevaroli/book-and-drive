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

function get_page_visualizzaImpegni(){
    window.location="visualizzaImpegni.html"
}
function get_page_registroPresenze(){
    window.location="registroPresenze.html"
}
function get_page_modDisponibilita(){
    alert("funzionalità non ancora implementata")
}
function get_help_istruttore(){
    fetch("http://localhost:8080/api/v1/help?token="+getCookie("token"),{
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
