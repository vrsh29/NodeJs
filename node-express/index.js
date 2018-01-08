const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app= express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',(req,res,next)=> {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
});

app.get('/dishes',(req,res,next)=> {
    res.end('Will send all the dishes to you!')
});

app.post("/dishes", (req, res, next) => {
  res.end('Will add the dish: '+ req.body.name + ' with details: ' + req.body.description);
});

app.use(expres.static(__dirname+ '/public'));

app.use((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Hellow</h1></body></html>');
});

const server = http.createServer(app);
