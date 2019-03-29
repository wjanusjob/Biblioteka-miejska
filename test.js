//const { getSearch } = require("./getSearch");

mysql = require('mysql');

var sql = "SELECT * FROM table WHERE userid like %?% and name = ?;";

var inserts = [1,"imionko' or true",'cos'];
sql = mysql.format(sql, inserts);

console.log(sql);

getSearch = function(thing,callback) {

      callback({result: [{idWydawnictwo:123}]})
}

prepareGeneralQuery = function (data ,offset, callback){
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

      getSearch(mysql.format('select idWydawnictwo from Wydawnictwo where nazwa = ? ;',[data.selectWydawnictwoquery]), results =>{
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

var inreq = {
    radio: "all",
    text : "czas",
    selectWydawnictwoquery: "Foksal",
    selectGatunekquery: "Fantasy"
  }

prepareGeneralQuery(inreq,0,sql=>{
    console.log("wynik prepare: ");
    
    console.log(sql);
    
})

