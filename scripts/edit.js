
function ajaxgenre (json){
    var xmlrequest = new XMLHttpRequest();
    xmlrequest.open('POST','http://localhost:8080/editgenre');
    xmlrequest.setRequestHeader('Content-Type', 'application/json')
    xmlrequest.onload = function(){
        console.log(xmlrequest.response);
        // window.location.href="http://localhost:8080/"


        // document.getElementById("result").innerHTML = 'result = ' + JSON.parse(xmlrequest.response).result;
    }
    xmlrequest.send(JSON.stringify(json));
    

}

function ajaxedit (json){
    var xmlrequest = new XMLHttpRequest();
    xmlrequest.open('POST','http://localhost:8080/edit');
    xmlrequest.setRequestHeader('Content-Type', 'application/json')
    xmlrequest.onload = function(){
        console.log(xmlrequest.response);
        // window.location.href="http://localhost:8080/"

        alert("edytowano");

        // document.getElementById("result").innerHTML = 'result = ' + JSON.parse(xmlrequest.response).result;
    }
    xmlrequest.send(JSON.stringify(json));
    

}
editbuttclick = function(){
    console.log("edit");
    console.log(flag2);
    
    var obj = {
        idbook: document.getElementById('idbook').innerText,
        autor  : document.getElementById("inautor").value,
        tytuł :document.getElementById("intytuł").value,
        wydanie : document.getElementById("inwydanie").value,
        data : document.getElementById("indata").value,
        miejsce : document.getElementById("inmiejsce").value,
        nienumerowane : document.getElementById("inienumerowane").value,
        strony: document.getElementById("instrony").value,
        wymiary: document.getElementById("inwymiary").value,
        isbn : document.getElementById("inisbn").value,
        opis : document.getElementById('inopis').value
        
    }   

    var genresnames = [];
    for (let i = 0; i < document.getElementsByClassName('editgenres').length; i++) {
        genresnames.push( document.getElementsByClassName('editgenres')[i].value);
        console.log("coś się dodaje!");
        
        
    }
    console.log(genresnames);
    
    
   if(flag2){
       newgenre = document.getElementById('newgenre').value;

       ajaxgenre({idbook:document.getElementById('idbook').innerText ,gatunki: genresnames ,ifadded: true, newgenre: newgenre})
   }else{
       ajaxgenre({idbook:document.getElementById('idbook').innerText,gatunki: genresnames,ifadded:false})
   }
        
        ajaxedit(obj);   
        

}
// window.onload = function(){

    //ta funkcja jest wewnątrz search.js

// }