


function ajaxload (){
    var xmlrequest = new XMLHttpRequest();
    xmlrequest.open('POST','http://localhost:8080/loadmore');
    xmlrequest.setRequestHeader('Content-Type', 'application/json')
    xmlrequest.onload = function(){
        console.log(xmlrequest.response);
        // window.location.href="http://localhost:8080/"
        window.location.href = window.location.href;
        // document.getElementById("result").innerHTML = 'result = ' + JSON.parse(xmlrequest.response).result;
    }
    xmlrequest.send();
    

}
loadmorebuttclick = function(){
    console.log("loadmore");
    var obj = {
    }   
        
        ajaxload();   
        

}
// window.onload = function(){

    //ta funkcja jest wewnątrz search.js

// }