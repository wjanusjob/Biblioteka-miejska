




function ajaxreqcreategenre (a,b){
    var xmlrequest = new XMLHttpRequest();
    xmlrequest.open('POST','http://localhost:8080/creategenre');
    xmlrequest.setRequestHeader('Content-Type', 'application/json')
    xmlrequest.onload = function(){
        console.log(xmlrequest.response);
        window.alert('stworzono nowy gatunek')
        window.location.href="http://localhost:8080/addgenre"
        // document.getElementById("result").innerHTML = 'result = ' + JSON.parse(xmlrequest.response).result;
    }
    xmlrequest.send(JSON.stringify({
        name: a,
        opis: b
    }));

}
creategenrebutt = function(){
    console.log("log in");
    
  name  = document.getElementById("inputnazwagatunek").value;
  opis = document.getElementById("inputopisgatunek").value;
  
  ajaxreqcreategenre(name,opis);   
  

}
// window.onload = function(){

    //ta funkcja jest wewnątrz search.js

// }