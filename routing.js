const bcrypt = require('bcrypt');
const back = require('./functions');
const { getSearch } = require("./functions");


const saltRounds = 10;

exports.name = function (params) {
    console.log("name!!!");
    
}


exports.home = function(req,res){
    bcrypt.compare('abcd','$2b$10$ECzzTgweF8yaUVvHN9jsLuq5wZdyv..nQbSF5HIrNkFyk/zMKoZVO',function(err,response){
  console.log(response);
  
    })
    
    back.getDefault(payload =>{
      // iflogged = (req.session.userid == '1'?true:false)
      if(req.session.userid){
        console.log(req.session);
        userdata = {
          imie : req.session.imie,
          nazwisko : req.session.nazwisko,
          wiek: req.session.wiek
        }
          res.render('home', { headertext : 'Witamy!', logged: true,userdata, ...payload,iflibrarian: (req.session.librarian?true:false) });
  
      }else{
  
        res.render('home', { headertext : 'Witamy!', logged: false, ...payload });
      }
  
    } 
    );
    
  
}



exports.search  = function(req,res){
    console.log(req.query);
    
      console.log(req.session.userid?true:false);
    
    back.getDefault(payload =>{
      var inreq = {
        radio: req.query.radio,
        text : req.query.text,
        selectWydawnictwoquery: req.query.selectwydawnictwo,
        selectGatunekquery: req.query.selectgatunek
      }
  
        back.prepareGeneralQuery(inreq,(req.session.offset?req.session.offset:0), sql =>{
          console.log(sql);
          
          getSearch(sql,[],result =>{
            console.log(result);
            if(!result.result[0]){
              req.session.offset = 0;
            }
            if(req.session.userid){
              userdata = {
                imie : req.session.imie,
                nazwisko : req.session.nazwisko,
                wiek: req.session.wiek
              }
                res.render('search', { headertext : 'szukaj!', data: result.result ,  logged: true,userdata, ...payload ,iflibrarian: (req.session.librarian?true:false) });
                
            }else{
  
              res.render('search', { headertext : 'szukaj!', data: result.result ,  logged: false, ...payload  });
            } 
            
          });
        });
        
      
      // getSearch('select * from Książka', results =>{
      //     console.log(results);
          
      // });
  
    } 
    );
    // res.render('search', { data : obj  ,headertext : 'szukaj', logged: false, selecGatunek: ['fantastyka','kryminał','romans'],selectWydawnictwo: ['Uroboros','ZYSK','SQN']} )
}

exports.logout = function (req,res) {
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
}



exports.register = function(req,res){
  
    back.getDefault(payload =>{
      // iflogged = (req.session.userid == '1'?true:false)
      
        if(req.session.id){

          res.render('register', { headertext : 'Zarejestruj się!', logged: false, ...payload });
        }else{
          res.send("acces denied! user already logged in")
        }
        
      
  
    } 
    );
    
  
}
exports.infobook = function (req,res) {
    console.log("wykonalo sie");
    back.getDefault(payload=>{
      // temp1 = 'select * from Książka where idKsiążka = ? ;';
      // temp1 = mysql.format(temp1,[req.query.id]);
      getSearch('select * from Książka where idKsiążka = ? ;',[req.query.id],results=>{
        console.log(results.result[0].tytuł);

        getSearch('select * from Egzemplarz where idKsiążka = ? ;',[req.query.id],copies=>{
          getSearch('select idGatunek, istotność from gatunkiksiążki where idKsiążka = ? ;',[req.query.id],a=>{
            genres = a.result;
       
            
            
            console.log("genres=");
            
            console.log(genres);
            
            genresids = " (";
            genresids =  genresids.concat(genres[0].idGatunek);
  
            for (let i = 1; i < genres.length; i++) {
              genresids =  genresids.concat(",");
              genresids =  genresids.concat(genres[i].idGatunek);
              
            }
            genresids =  genresids.concat(") ");
  
            console.log(genresids);
            
            getSearch('select nazwa from Gatunek where idGatunek in  '+ genresids+  ';',[],b=>{
  
              var genreNames = b.result;
              console.log(genreNames);
              
              getSearch('select nazwa from Wydawnictwo where idWydawnictwo = ? ;',[results.result[0].idWydawnictwo], w=>{
                wydawnictwo = w.result[0].nazwa;
                if(req.session.userid){
                  userdata = {
                    imie : req.session.imie,
                    nazwisko : req.session.nazwisko,
                    wiek: req.session.wiek
                  }
                    res.render('infobook', { headertext : results.result[0].tytuł ,  logged: true,userdata, ...payload ,bookdata: results.result[0],copies: copies.result,genres: genreNames, wydawnictwo: wydawnictwo,iflibrarian: (req.session.librarian?true:false) });
                    
                }else{
                  res.render('infobook', { headertext : results.result[0].tytuł ,  logged: false, ...payload ,bookdata: results.result[0],copies: copies.result,genres: genreNames, wydawnictwo:wydawnictwo });
                  
                } 
              })
            })
          })
        })
      })
    })
}
exports.edit = function (req,res) {
  console.log("wykonalo sie");
  back.getDefault(payload=>{
    // temp1 = 'select * from Książka where idKsiążka = ? ;';
    // temp1 = mysql.format(temp1,[req.query.id]);
    getSearch('select * from Książka where idKsiążka = ? ;',[req.query.id],results=>{
      console.log(results.result[0].tytuł);

      getSearch('select * from Egzemplarz where idKsiążka = ? ;',[req.query.id],copies=>{
        getSearch('select idGatunek, istotność from gatunkiksiążki where idKsiążka = ? ;',[req.query.id],a=>{
          genres = a.result;
          genresids = " (";
          genresids =  genresids.concat(genres[0].idGatunek);

          for (let i = 1; i < genres.length; i++) {
            genresids =  genresids.concat(",");
            genresids =  genresids.concat(genres[i].idGatunek);
            
          }
          genresids =  genresids.concat(") ");

          console.log(genresids);
          
          getSearch('select nazwa from Gatunek where idGatunek in  '+ genresids+  ';',[],b=>{

            var genreNames = b.result;
            console.log(genreNames);
            
            getSearch('select nazwa from Wydawnictwo where idWydawnictwo = ? ;',[results.result[0].idWydawnictwo], w=>{
              wydawnictwo = w.result[0].nazwa;
              if(req.session.userid){
                userdata = {
                  imie : req.session.imie,
                  nazwisko : req.session.nazwisko,
                  wiek: req.session.wiek
                }
                  res.render('editbook', { headertext : results.result[0].tytuł ,  logged: true,userdata, ...payload ,bookdata: results.result[0],copies: copies.result,genres: genreNames, wydawnictwo: wydawnictwo });
                  
              }else{
                res.redirect('/infobook')
                
              } 
            })
          })
        })
      })
    })
  })
}

exports.addbook = function (req,res) {
    console.log(req.session);
    back.getDefault(payload=>{
  
           if(req.session.librarian){
            userdata = {
              imie : req.session.imie,
              nazwisko : req.session.nazwisko,
              wiek: req.session.wiek
            }
        
            
            res.render('addbook', { headertext : 'Dodaj Książkę' ,  logged: true,userdata, ...payload  });
            
          }else{
            res.render('denied', { headertext : 'Strona Główna' ,  logged: (req.session.userid?true:false), ...payload  });
          }
      
    })
}
exports.addgenre = function(req,res){
  
    back.getDefault(payload =>{
      // iflogged = (req.session.userid == '1'?true:false)
      if(req.session.librarian){
        console.log(req.session);
        userdata = {
          imie : req.session.imie,
          nazwisko : req.session.nazwisko,
          wiek: req.session.wiek
        }
          res.render('genre', { headertext : 'dodaj Gatunek!', logged: true,userdata, ...payload , iflibrarian:req.session.librarian});
  
      }else{
  
        res.render('home', { headertext : 'Witamy!', logged: false, ...payload });
      }
  
    } 
    );
    
  
}
exports.mybooks = function(req,res){
  
  
  back.getDefault(payload =>{
    var inreq = {
      radio: req.query.radio,
      text : req.query.text,
      selectWydawnictwoquery: req.query.selectwydawnictwo,
      selectGatunekquery: req.query.selectgatunek
    }


    //   sql = 'select k.idKsiążka, autor,tytuł,zdjecie_adres from użytkownik u inner join wypożyczenie w '+
    //  ' on u.idOsoba = w.idOsoba inner join egzemplarz e on w.idEgzemplarz = e.idEgzemplarz inner'+
    //   ' join Książka k on e.idKsiążka = k.idKsiążka where u.idOsoba=? group by k.idKsiążka ;'

    sql = 'select * from Książka where idKsiążka in (select idKsiążka from wypożyczenie where idOsoba = ?);'
        console.log(sql);
        


        getSearch(sql,[req.session.userid],result =>{
          console.log(result);
          if(req.session.userid){
            userdata = {
              imie : req.session.imie,
              nazwisko : req.session.nazwisko,
              wiek: req.session.wiek
            }
              res.render('search', { headertext : 'szukaj!', data: result.result ,  logged: true,userdata, ...payload ,iflibrarian: (req.session.librarian?true:false) });
              
          }else{

            res.render('search', { headertext : 'szukaj!', data: result.result ,  logged: false, ...payload  });
          } 
          
        });
      
    
    // getSearch('select * from Książka', results =>{
    //     console.log(results);
        
    // });

  } 
  );
  // res.render('search', { data : obj  ,headertext : 'szukaj', logged: false, selecGatunek: ['fantastyka','kryminał','romans'],selectWydawnictwo: ['Uroboros','ZYSK','SQN']} )
}




exports.registerpost = function(req,res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      console.log("zwykle hasło = " + req.body.password);
      console.log("bcrypt hasło = " + hash);
      getSearch('select * from Użytkownik where alias = ?',[req.body.username],matchnames=>{
        if (matchnames.result[0]) {
          res.send({ifalert: true,msg: 'użytkownik o takiej nazwie już istnieje'})
        }else{
          
        
        getSearch('select max(idOsoba) as id from Osoba',[] , r=>{
          newid = r.result[0].id + 1;
          
          getSearch('insert into Osoba (idOsoba,imie,nazwisko,wiek) values(?,?,?,?);',[newid,req.body.name,req.body.surname,req.body.age],insertedO=>{
            getSearch('insert into Użytkownik values (?,?,?);',[newid,req.body.username,hash],insertU=>{
              console.log("inserted person");
              console.log({username: req.body.username, password: req.body.password,ifalert:false});
              
              res.send({username: req.body.username, password: req.body.password,ifalert:false});
              
            })
          } )
        })
      }
      })
    });
}
exports.orderpost = function(req,res){
    console.log(req.body);
    
    console.log("otrzymano zamówienie numeregzemplarza=" + req.body.idcopy) ;
    if(req.session.userid){
  
        getSearch("select max(idWypożyczenie) as id from Wypożyczenie;",[],idWypożyczenie=>{
          console.log(idWypożyczenie);
          idWypożyczenie.result[0].id += 1;
          console.log(idWypożyczenie);
          var date = new Date();
          date.setDate(date.getDate() + 5);
          if (req.session.userid) {
            console.log("insert into wypożyczenie values (" + req.session.userid + ","+idWypożyczenie.result[0].id +","+req.body.idcopy + ","+req.body.idbook+"," + "2019-01-23"+");");
            
            getSearch("insert into wypożyczenie values (?,?,?,?,'2019-01-23');",[req.session.userid,idWypożyczenie.result[0].id,req.body.idcopy,req.body.idbook],results=>{
              console.log(results);
              res.json({finished:true})
              
            } )
          }else{
            res.json({finished:false})
          }
        })
    }else{
      res.json({finished:false})
      
      
    }
  
  
    
}
exports.editpost = function(req,res){
    console.log("przyjęto zlecenie edycji");
    
    if(req.session.librarian){
        console.log('update Książka set autor= "' + req.body.autor + '" ,tytuł = "' + req.body.tytuł + '" ,wydanie = ' + req.body.wydanie +
         ' ,miejsce_wydania = "' + req.body.miejsce
        + '" ,data_wydania = ' + req.body.data + ' ,ilość_stron = ' + req.body.strony + ' ,strony_nienumerowane = ' + req.body.nienumerowane 
        + ' ,Wymiary = ' + req.body.wymiary + ' ,wydanie = ' + req.body.wydanie     +'  where idKsiążka=' +req.body.idbook+ ' ;' );
        
        getSearch('update Książka set autor= ? ,tytuł = ? ,wydanie = ? ,miejsce_wydania = ?'
        + ' ,data_wydania = ? ,ilość_stron = ? ,strony_nienumerowane = ?' 
        + ' ,Wymiary = ? ,wydanie = ?,opis = ?  where idKsiążka=? ;' ,[req.body.autor,req.body.tytuł,req.body.wydanie,req.body.miejsce,req.body.data, req.body.strony,req.body.nienumerowane,req.body.wymiary,req.body.wydanie,req.opis,req.body.idbook],result=>{
          res.send({ifedited:true})
        })
    }
}
exports.editgenrepost = function(req,res){
    if(req.session.librarian){
       getSearch('delete from gatunkiksiążki where idKsiążka = ?',[req.body.idbook],response=>{
         console.log(req.body.gatunki);
         
         genreNames =back.getNawiasyString(req.body.gatunki);
         console.log("genrenames");
         console.log(genreNames);
         console.log('select idGatunek from Gatunek where nazwa in ' + genreNames +' ;');
         
         getSearch('select idGatunek from Gatunek where nazwa in ' + genreNames +' ;',[],a=>{
          genresids = a.result;
          console.log("genresids");
          
          console.log(genresids[0].idGatunek);
          sql = 'insert into gatunkiKsiążki (idKsiążka,idGatunek) values ';
  
          for (let i = 0; i < genresids.length-1; i++) {
            console.log(genresids[i].idGatunek);
            sql += '(' + req.body.idbook + ','  + genresids[i].idGatunek + '),'
            
          }
          sql += '(' + req.body.idbook + ','  + genresids[genresids.length-1].idGatunek + ');'
  
          console.log(sql);
          getSearch(sql,[],insert=>{
            if(req.body.ifadded){
              console.log("przyjęto zlecenie o dodaniu gatunku dla ksążki " + req.body.idbook);
              getSearch('select idGatunek from Gatunek where nazwa = "' + req.body.newgenre + '";',[],c=>{
                newgenreid = c.result[0].idGatunek;
  
                getSearch('insert into gatunkiksiążki (idKsiążka,idGatunek) values (' +req.body.idbook + ',' + newgenreid + ');',[],newinsert=>{
                  console.log("dodano nowy gatunek do książki");
                  
                } )
              })
              
            }
            
          })
  
          
          
         })
        })
  
    }
}
exports.loadmorepost = function(req,res){
    console.log('loadmore offset= ' + req.session.offset);
    
    if(!isNaN( req.session.offset)){
      console.log("jest tu");
      
      req.session.offset += 1;
    }else{
      req.session.offset = 3 ;
    }
    res.send();
}
exports.login = function (req,res) {
    console.log(req.body);
    console.log("logowanie użytwkownika");
    
    getSearch('select idOsoba ,  hasło from Użytkownik where alias= ? ;',[req.body.username], results=>{
      console.log(results);
      if(results.result[0]){
        bcrypt.compare(req.body.password,results.result[0].hasło,function(err,response){
          if (response) {
            getSearch('select imie, nazwisko ,wiek from Osoba where idOsoba = ? ;',[results.result[0].idOsoba],userdata=>{

                req.session.userid= results.result[0].idOsoba;
                req.session.imie = userdata.result[0].imie;
                req.session.nazwisko = userdata.result[0].nazwisko;
                req.session.wiek = userdata.result[0].wiek;
                console.log(req.session);
                getSearch('select * from bibliotekarz where idOsoba = ?',[results.result[0].idOsoba],librarian=>{
                  if(librarian.result[0]){
                    req.session.librarian = true;
                  }
                  res.end()
                })
            })
          }
        })
       
      }
      
    })
}
exports.deleteorderpost = function (req,res) {
  console.log('usuwanie zamówienia ' + req.body.idcopy);
  
  if (req.session.librarian) {
    getSearch('delete from wypożyczenie where idEgzemplarz = ? and idKsiążka = ?',[req.body.idcopy,req.body.idbook],result=>{
      res.json({finished:true})
    })
  } else{
    res.json({finished:false})
  }
}
exports.addgenrepost = function (req,res) {
  if (req.session.librarian) {
    getSearch('select max(idGatunek)as id from Gatunek',[],a=>{
      
      getSearch('insert into gatunek values (?,?,?)',[a.result[0].id+1,req.body.name,req.body.opis],result=>{
        res.json({msg:'wstawiono gatunek'})
      })
    })
    }
}