const mysql = require('mysql');
const bcrypt = require('bcrypt');




const connection = mysql.createConnection({
    host: "localhost",
    user: "wojtek",
    password: "1234",
    database: 'tinschema'
  });

connection.connect();



exports.getDefault = function ( callback) {

    const payload = {}
  
    connection.query('select nazwa from Gatunek', (err, genres, fields) => {
      if (err) throw err
      
      connection.query('select nazwa from Wydawnictwo', (err, publisher, fields) => {
        if (err) throw err
        var  selectWydawnictwo = [];
        var  selectGatunek = [];
        for (i = 0; i < genres.length; i++) { 
          selectGatunek.push(genres[i].nazwa);
          
        }
        for (i = 0; i < publisher.length; i++) { 
          selectWydawnictwo.push(publisher[i].nazwa);
          
        }
        
        callback({ selectGatunek, selectWydawnictwo })
      })
  
    })
    
}
  

exports.authenticate = function (userid,password,callback){
  
    connection.query('select o.idOsoba, hasło, imie, nazwisko , wiek from Użytkownik  u inner join Osoba o  on o.idOsoba = u.idOsoba  where o.idOsoba = "' + userid+ '";', (err, result, fields) => {
      if (err) throw err
      if(result[0]){
        console.log("debug");
        
        console.log(result[0].hasło);
        console.log(password);
        
        
        bcrypt.compare(password,result[0].hasło,function(err,res){
  
          if(res){                                                             // <-- porównanie haseł
            console.log("autheticate");
            
            console.log(result);
            
            callback(true,result[0]);
          }else{
            console.log("cos poszlo nie tak");
            callback(false,"")
          }
        })
      }else{
        callback(false,"")
      }
      
    });
}

exports.prepareGeneralQuery = function (data ,offset, callback){
  var sql = "select idKsiążka, autor, tytuł , zdjecie_adres from Książka where( ";
  console.log(data.radio);
 const radio = data.radio ;
 const liketext = '%'+data.text + '%';
  if(data.radio == "all"){
    sql = sql + "autor like ?";
    sql+= ' OR ';
    sql+= "tytuł like ?";
    sql+= ' OR ';
    sql = sql + "opis like ?)";

    sql = mysql.format(sql, [liketext,liketext,liketext]);
  }else{
    sql = sql + " ? like ?)";
    sql = mysql.format(sql, [radio,liketext]);
  }

  if(data.selectWydawnictwoquery != '---'){

    exports.getSearch(mysql.format('select idWydawnictwo from Wydawnictwo where nazwa = ? ;',[data.selectWydawnictwoquery]), results =>{
      console.log(results.result[0].idWydawnictwo);
      
      sql += ' AND idWydawnictwo = ?';
      sql = mysql.format(sql, [results.result[0].idWydawnictwo]);

      console.log("naszykowana sql");
      if(data.selectGatunekquery != '---'){
        sql += " AND idKsiążka in (select gatunkiksiążki.idKsiążka from gatunkiksiążki where idGatunek = (select idGatunek from Gatunek g where nazwa = ?))";
      sql = mysql.format(sql,[data.selectGatunekquery]);
      callback(sql + ";");
      }else{
        sql += ' limit 3 offset ? ;';
        sql = mysql.format(sql,[offset]);
      callback(sql);
      } 
    });
  }else{

    
    if(data.selectGatunekquery != '---'){
      sql += " AND idKsiążka in (select gatunkiksiążki.idKsiążka from gatunkiksiążki where idGatunek = (select idGatunek from Gatunek where nazwa = ?))";
      sql = mysql.format(sql, [data.selectGatunekquery]);
      callback(sql + 'limit 3 offset ' +offset +  ' ;');
    }else{
      sql +='limit 3 offset ' +offset +  ' ;' ;
      callback(sql);
    }
    
  }
  
}

exports.prepareGeneralQueryOLD = function (data ,offset, callback){
    var radio;
    var text;
    var wydawnictwo;
    var gatunek;
    var sql = "select idKsiążka, autor, tytuł , zdjecie_adres from Książka where( ";
    console.log(data.radio);
    
    if(data.radio == "all"){
      sql = sql + "autor like '%" + data.text + "%'";
      sql+= ' OR ';
      sql+= "tytuł like '%" + data.text + "%'";
      sql+= ' OR ';
      sql = sql + "opis like '%" + data.text + "%')";
    }else{
      sql = sql + data.radio + " like '%" + data.text + "%')";
    }
  
    if(data.selectWydawnictwoquery != '---'){
      exports.getSearch('select idWydawnictwo from Wydawnictwo where nazwa = "' + data.selectWydawnictwoquery + '";', results =>{
        console.log(results.result[0].idWydawnictwo);
        
        sql += ' AND idWydawnictwo = ' +results.result[0].idWydawnictwo;
        console.log("naszykowana sql");
        if(data.selectGatunekquery != '---'){
          sql += " AND idKsiążka in (select gatunkiksiążki.idKsiążka from gatunkiksiążki where idGatunek = (select idGatunek from Gatunek g where nazwa = '"+ data.selectGatunekquery+"'))";
          callback(sql + ";");
        }else{
          sql += 'limit 3 offset ' +offset +  ' ;';
          callback(sql);
        } 
      });
    }else{
  
      
      if(data.selectGatunekquery != '---'){
        sql += " AND idKsiążka in (select gatunkiksiążki.idKsiążka from gatunkiksiążki where idGatunek = (select idGatunek from Gatunek where nazwa = '"+ data.selectGatunekquery+"'))";
        callback(sql + 'limit 3 offset ' +offset +  ' ;');
      }else{
        sql +='limit 3 offset ' +offset +  ' ;' ;
        callback(sql);
      }
      
    }
    
}

exports.getSearch = function (sql,inserts, callback){
    const results = {};
    sql = mysql.format(sql,inserts);
    console.log(sql);
    
    
    connection.query(sql, (err, result, fields) => {
      if (err) throw err
      console.log(sql);
      
      callback({result});
      
    });
  
  
}

exports.authenticatelibrarian = function (userid,password,callback){
     connection.query('select o.idOsoba, hasło, imie, nazwisko , wiek from Bibliotekarz  u inner join Osoba o  on o.idOsoba = u.idOsoba  where o.idOsoba = "' + userid+ '";', (err, result, fields) => {
    if (err) throw err
    if(result[0]){
      console.log("debug");
      
      console.log(result[0].hasło);
      console.log(password);
      
      
      bcrypt.compare(password,result[0].hasło,function(err,res){

        if(res){                                                             // <-- porównanie haseł
          console.log("autheticate");
          
          console.log(result);
          
          callback(true,result[0]);
        }else{
          console.log("cos poszlo nie tak");
          callback(false,"")
        }
      })
    }else{
      callback(false,"")
    }
    
  });
}

exports.getNawiasyString = function (array) {
    result='("';
    result = result.concat(array[0])
    for (let i = 1; i < array.length; i++) {
    result = result.concat('","');
      result = result.concat(array[i]);
      
    }
    result = result.concat('")');
    return result;
  }