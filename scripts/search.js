document.getElementById('')
function getRadio(){

    var rates = document.getElementsByName('searchradio');
    var rate_value;
    
    for(var i = 0; i < rates.length; i++){
        if(rates[i].checked){
            rate_value = rates[i].id;
        }
    }
    
    return rate_value;
}

function getSearchtext(){
    return document.getElementById('searchinput').value;

}

function getselectWydawnictwo() {
    return document.getElementById('selectwydawnictwo').value;
}
function getselectGatunek() {
    return document.getElementById('selectgatunek').value;
}

function searchAdres() {
    return 'http://localhost:8080/search/?radio=' + getRadio() + '&text=' + getSearchtext() + '&selectgatunek='  + getselectGatunek() + '&selectwydawnictwo=' + getselectWydawnictwo();
 }

 buttclick = function() {
     window.location = searchAdres();
 }



 window.onload = function(){

   // $("#selectgatunek").val("Kryminał");
 //  document.getElementById('selectgatunek').value="Fantasy";
 try {
     
     document.getElementById("logoutbutton").addEventListener('click',logoutbuttclick);
 } catch (error) {
     
 }
     try {
       document.getElementById("loginbutt").addEventListener('click',loginbuttclick);
        document.getElementById('user-password-input').addEventListener('keyup',function (event) {
            console.log("done");
            if (event.keyCode === 13) {
                loginbuttclick();
                
            }
        })
      }
      catch(err) {
          console.log("użytkownik zalogowany");
          
      }
     try {
        for (let i = 0; i < document.getElementsByName('notok').length; i++) {
            console.log("poszlo");
            var id = document.getElementsByName('ok')[i];
             document.getElementsByName('notok')[i].addEventListener('click',(id)=>{
                 deleteorder(id.toElement.id,window.location.search.substring(4));
                 
             });
            
        }
     } catch (error) {
         
     }
      try {
          for (let i = 0; i < document.getElementsByName('ok').length; i++) {
              console.log("poszlo");
              var id = document.getElementsByName('ok')[i];
               document.getElementsByName('ok')[i].addEventListener('click',(id)=>{
                   order(id.toElement.id,window.location.search.substring(4));
                   
               });
              
          }
          
      } catch (error) {
          
      }

    try {
        document.getElementById('editbutt').addEventListener('click',editbuttclick);
        document.getElementById('addgenre').addEventListener('click',addgenrebuttclick)
    } catch (error) {
        
    }
    try {
        document.getElementById('loadmore').addEventListener('click',loadmorebuttclick);
    } catch (error) {
        
    }
    try {
       document.getElementById('registerbutton').addEventListener('click',registerbuttclick) 
       console.log("registerbutt");
       
    } catch (error) {
        
    }
    document.getElementById("searchbutt").addEventListener('click',buttclick);
    try {
        document.getElementById('addgenrebutton').addEventListener('click',creategenrebutt);
    } catch (error) {
        
    }
}