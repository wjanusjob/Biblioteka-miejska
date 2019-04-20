function ajaxregister (json){
    var xmlrequest = new XMLHttpRequest();
    xmlrequest.open('POST','http://localhost:8080/register');
    xmlrequest.setRequestHeader('Content-Type', 'application/json')
    xmlrequest.onload = function(){
        console.log('ifalert = ');
        wynik = JSON.parse(xmlrequest.response)
        console.log(wynik.ifalert);

        if (wynik.ifalert) {
            window.alert(wynik.msg)
        }else{
            console.log('wysyłanie logowania');
            
            ajaxreqlogin(wynik.username,wynik.password)
            
        }
        
        window.location.href="http://localhost:8080/"
        // document.getElementById("result").innerHTML = 'result = ' + JSON.parse(xmlrequest.response).result;
    }
    xmlrequest.send(JSON.stringify(json));
    

}

registerbuttclick = function(){
    console.log("rozpoczęto rejestrację");
    
    var obj = {
        name: document.getElementById('name').value,
        surname  : document.getElementById("surname").value,
        age :document.getElementById("age").value,
        username : document.getElementById("username").value,
        password : document.getElementById("password").value,
        secondpassword : document.getElementById('secondpassword').value
        
    }   
    validation = validate(obj);
    if(validation.ifok){
        console.log('wysłanie rejestracji');
        
        ajaxregister(obj);

    }else{
        window.alert(validation.msg)
    }
    
}

function validate(obj) {

    obj.name =obj.name.charAt(0).toUpperCase() + obj.name.slice(1);
    obj.surname =obj.surname.charAt(0).toUpperCase() + obj.surname.slice(1);
    console.log(obj.name);
    if (obj.password!==obj.secondpassword) {
        return {ifok: false, msg: "hasła są różne"}
        
    }
    if (obj.name=='') {
        return {ifok: false, msg: "podaj imię"}
        
    }
    if (obj.surname=='') {
        return {ifok: false, msg: "podaj nazwisko"}
        
    }
    if (obj.age=='') {
        return {ifok: false, msg: "podaj wiek"}
        
    }
    if (obj.username=='') {
        return {ifok: false, msg: "podaj nazwę użytkownika"}
        
    }
    if (obj.password=='') {
        return {ifok: false, msg: "podaj hasło"}
        
    } if (obj.secondpassword=='') {
        return {ifok: false, msg: "potwierdź hasło"}
        
    } 
    

    if (/\s/.test(obj.age)) {
        return {ifok: false, msg: "wiek zawiera spację"}
        
    }
    if (isNaN(obj.age)) {
        return {ifok: false, msg: "wiek nie jest liczbą"}
        
    }
    return {ifok: true, msg: "jest ok"}
    

}