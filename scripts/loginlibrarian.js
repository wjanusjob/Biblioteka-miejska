


function ajaxreq (a,b){
    var xmlrequest = new XMLHttpRequest();
    xmlrequest.open('POST','http://localhost:8080/loginlibrarian');
    xmlrequest.setRequestHeader('Content-Type', 'application/json')
    xmlrequest.onload = function(){
        console.log(xmlrequest.response);
        // window.location.href="http://localhost:8080/"
        window.location.href=window.location.href;
        // document.getElementById("result").innerHTML = 'result = ' + JSON.parse(xmlrequest.response).result;
    }
    xmlrequest.send(JSON.stringify({
        username: a,
        password: b
    }));

}
loginlibrarianbuttclick = function(){
    console.log("log in");
    
  username  = document.getElementById("user-name-input").value;
  password = document.getElementById("user-password-input").value;
  
  ajaxreq(username,password);   
  

}
// window.onload = function(){

    //ta funkcja jest wewnątrz search.js

// }