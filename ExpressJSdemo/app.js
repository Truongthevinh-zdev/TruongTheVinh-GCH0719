  
const express = require('express');
const engines = require('consolidate');
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

//npm i handlebars consolidate --save
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

app.get('/',function(req,res){
    res.render('index',{name:'Cuong', city :'Gia Lai'})
})

app.get('/add',function(req,res){
    res.render('addProduct')
})

app.post('/doAddProduct',async function(req,res){
    //load ald database
    try{
        const data=await fs.readFile('database.json');
        let products = JSON.parse(data).products;
        let id = req.body.txtId;
        let name = req.body.txtName;
        let price = req.body.txtPrice;
        if(name != null && name.length < 5){
            res.render('addProduct',{error:{nameError:'Length must > 5'},oldValues : {id: id,name:name,price:price}});
            return;
        }
        let newProduct = {"id": Number(id),"name":name,"price":price};
        products.push(newProduct);

        var document = {'products':products};
        await fs.writeFile('database.json',JSON.stringify(document));
        res.redirect('/all');
     }catch(error){
         console.log('Something is wrong; readfile');
     }
})

app.get('/delete', async function(req,res){
    let id = req.query.id;
    let deleteIndex = -1;
    try{
        const data=await fs.readFile('database.json');
        var products = JSON.parse(data).products;
        for(i=0;i<products.length;i++){
            if(products[i].id==id){
                deleteIndex = i;
                break;
            }
        }
        products.splice(deleteIndex);

        // save to file
        var document = {'products':products};
        await fs.writeFile('database.json',JSON.stringify(document));
        res.redirect('/all');
     }catch(error){
         console.log('Something is wrong; readfile');
     }
})

var fs = require('fs').promises;
app.get('/all',async function(req,res){
     try{
        const data=await fs.readFile('database.json');
        var products = JSON.parse(data).products;
        res.render('allProduct',{model:products});
     }catch(error){
         console.log('Something is wrong; readfile');
     }
})
var PORT = process.env.PORT || 5000;
app.listen(PORT,function(){
    console.log('server is running at port ' + PORT);
})