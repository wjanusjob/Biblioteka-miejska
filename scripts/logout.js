

function login(){
    var obj= {
     name:   document.getElementById('user-name-input').value,
    pass: document.getElementById('user-password-input').value
    }
}



logoutbuttclick = function(){
    console.log("log out");
 
  window.location.href = 'http://localhost:8080/logout';

}
// window.onload = function(){

    //ta funkcja jest wewnątrz search.js

// }