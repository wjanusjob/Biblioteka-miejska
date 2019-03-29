exports.editOLD = function (req,res) {                                                  //not used
    console.log("wykonalo sie");
    back.getDefault(payload=>{
  
      getSearch('select * from Książka where idKsiążka = ' + req.query.id + ';',results=>{
        console.log(results.result[0].tytuł);
        getSearch('select * from Egzemplarz where idKsiążka = ' + req.query.id + ';',copies=>{
          getSearch('select idGatunek, istotność from gatunkiksiążki where idKsiążka = ' + req.query.id + ';',a=>{
            genres = a.result;
            genresids = " (";
            genresids =  genresids.concat(genres[0].idGatunek);
  
            for (let i = 1; i < genres.length; i++) {
              genresids =  genresids.concat(",");
              genresids =  genresids.concat(genres[i].idGatunek);
              
            }
            genresids =  genresids.concat(") ");
  
            console.log(genresids);
            
            getSearch('select nazwa from Gatunek where idGatunek in ' + genresids + ";",b=>{
  
              var genreNames = b.result;
              console.log(genreNames);
              
              if(req.session.userid){
                authenticate(req.session.userid,req.session.password,(iflogged,userdata )=>{
                  res.render('editbook', { headertext : results.result[0].tytuł ,  logged: iflogged,userdata, ...payload ,bookdata: results.result[0],copies: copies.result, genres: genreNames });
                });
              }else{
                // res.render('editbook', { headertext : results.result[0].tytuł ,  logged: false, ...payload ,bookdata: results.result[0],copies: copies.result });
                res.send("acces denied");
              } 
            })
          })
        })
      })
    })
}




exports.loginlibrarian = function (req,res) {                                               //depraciated
    console.log(req.body);
  
    console.log("logowanie bibliotekarza");
    getSearch('select idOsoba ,  hasło from Bibliotekarz where alias= "' + req.body.username + '";', results=>{
      console.log(results);
      if(results.result[0]){
        bcrypt.compare(req.body.password,results.result[0].hasło,function(err,response){
          if (response) {
            
            req.session.userid= results.result[0].idOsoba;
            req.session.password = req.body.password;
            req.session.librarian = results.result[0].idOsoba;
            res.end()
          }
        })
       
      }
      
    })
    
    
}