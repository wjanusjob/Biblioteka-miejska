addgenrebuttclick = function(){
    console.log("addgenre");
    var obj = {
        
    }   
   
    
    name()

    
    
    
    
}



var flag2 = false;
        function name() {
            flag2 = true;
           var clone = document.getElementById('selectgatunek').cloneNode(true);
           clone.id = "newgenre";
           console.log(clone);
           
           document.getElementById('gatunkitr').appendChild(clone);
           document.getElementById('addgenre').parentNode.removeChild(document.getElementById('addgenre'))
        }