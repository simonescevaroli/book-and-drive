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
function get_page_guideStudenti(){
    window.location="guideStudenti.html"
}
function get_page_elencoStudenti(){
    
    window.location="elencoStudenti.html"
}
function get_page_guideStudente(){
    
    window.location="guideStudente.html"

}
function get_page_datiStudente(){
    
    window.location="datiStudente.html"
}
function get_help_segreteria(){
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