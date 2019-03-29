okbuttclick = function(id){
    console.log("kliknieto " + id);
    

}

function order (copy,book){
    console.log(book);
    
    var xmlrequest = new XMLHttpRequest();
    xmlrequest.open('POST','http://localhost:8080/order');
    xmlrequest.setRequestHeader('Content-Type', 'application/json')
    xmlrequest.onload = function(){
        res = JSON.parse( xmlrequest.response);
        console.log(res);
        
        if (res.finished) {
            console.log("weszlo");
            
        window.location.href=window.location.href;
            
        }else{
            window.alert("zamówienie nie powiodło się! sprawdź czy jesteś zalogowany/a")
        }
        // window.location.href="http://localhost:8080/"
        // document.getElementById("result").innerHTML = 'result = ' + JSON.parse(xmlrequest.response).result;
    }
    xmlrequest.send(JSON.stringify({
        idcopy: copy,
        idbook: book
        
    }));

}

function deleteorder(copy,book) {
    console.log('usuwanie zamówienia');
    
    
    console.log(copy);
    
    var xmlrequest = new XMLHttpRequest();
    xmlrequest.open('POST','http://localhost:8080/deleteorder');
    xmlrequest.setRequestHeader('Content-Type', 'application/json')
    xmlrequest.onload = function(){
        res = JSON.parse( xmlrequest.response);
        console.log(res);
        
        if (res.finished) {
            
        window.location.href=window.location.href;
            
        }else{
            window.alert("usuwanie zamówienia nie powiodło się! sprawdź czy jesteś zalogowany/a")
        }
        // window.location.href="http://localhost:8080/"
        // document.getElementById("result").innerHTML = 'result = ' + JSON.parse(xmlrequest.response).result;
    }
    xmlrequest.send(JSON.stringify({
        idcopy: copy,
        idbook: book
        
    }));


}