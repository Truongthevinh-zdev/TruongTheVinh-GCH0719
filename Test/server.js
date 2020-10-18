var http = require('http'); // Import Node.js core module

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();


    
    
var server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request
        
        let d = new Date();
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write(`<html><body><p>This is home student Page.</p>${d}</body></html>`);
        res.write('<br>');
        today = mm + '/' + dd + '/' + yyyy;
        res.write(today);
        res.end();
        
    
    }
    else if (req.url == "/student") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is student Page.</p></body></html>');
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
        res.end();
    
    }
    else if (req.url == "/admin") {
        
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/login") {
        let textAndButt="<input ='text' size='20'/><input type='button' value='login'/>";
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<html><body><p>This is login Page.</p>${textAndButt}</body></html>`);
        res.end();
    }
    else
        res.end('Invalid Request!');
    

});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')