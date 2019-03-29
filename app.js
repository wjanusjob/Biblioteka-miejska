
const route = require('./routing');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var session = require('express-session');
const bcrypt = require('bcrypt');



 route.name(); // val is "Hello" 


app.set('view engine','pug');
app.use(bodyParser.urlencoded( {extended: true } ));
app.use(express.json());
app.use('/img',express.static('img'));
app.use('/scripts',express.static('scripts'));
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));  



function login(){
  console.log("omg to dziala");
    
}

app.get('/',route.home);
app.get('/search', route.search);
app.get('/logout' , route.logout);
app.get('/register',route.register);
app.get('/infobook',route.infobook)
app.get('/edit',route.edit)
app.get('/addbook',route.addbook)
app.get('/addgenre',route.addgenre);
app.get('/mybooks',route.mybooks)
app.post('/login' ,route.login )
app.post('/register',route.registerpost)
app.post('/order',route.orderpost)
app.post('/edit', route.editpost)
app.post('/editgenre',route.editgenrepost)
app.post('/loadmore',route.loadmorepost )
app.post('/deleteorder',route.deleteorderpost)
app.post('/creategenre',route.addgenrepost)


// app.post('/loginlibrarian' , route.loginlibrarian )

app.listen(8080,function(){
  console.log("listening");
})



/*
nodemailer
sendgrid
*/ 