var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:'False'}))
const PORT =process.env.PORT || 5000;

app.listen(PORT,function(){
    console.log("Server is running at port : " + PORT);
})

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
})
app.get('/register',function(req,res){
    res.sendFile(__dirname + "/register.html");
})
 var fs = require('fs')
app.post('/doRegister',function(req,res){
    let name = req.body.txtName;
    let phone = req.body.txtPhone;
    let user = name + ';' + phone;
    fs.appendFile('users.txt' , `${user}\n` , 'utf8', (err)=>{});
    res.redirect('/');
})