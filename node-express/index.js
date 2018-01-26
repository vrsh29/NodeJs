const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app= express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes',dishRouter);
app.use('/promotions',  promoRouter);
app.use('/leaders',leaderRouter);

app.use(express.static(__dirname+ '/public'));

app.use((req,res,next)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type','type/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});

// app.all((req, res, next) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   next();
// });

// app.get((req, res, next) => {
//   res.end("Will send all the dishes to you!");
// });

// app.post((req, res, next) => {
//   res.end(
//     "Will add the dish: " +
//       req.body.name +
//       " with details: " +
//       req.body.description
//   );
// });

// app.put((req, res, next) => {
//   res.statusCode = 403;
//   res.end("PUT operation not supported on /dishes");
// });

// app.delete((req, res, next) => {
//   res.end("Deleting all the dishes!");
// });

//REST Api dishId endpoint
app.get('/dishes/:dishId', (req, res, next) => {
  res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /dishes/" + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId+ '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
  res.end('Deleting dish : '+ req.params.dishId);
});


//Rest API calls for promotions

app.get("/promotions/:promotionId", (req, res, next) => {
  res.end("Will send details of the promotions: " + req.params.promotionId + " to you!");
});

app.post("/promotions/:promotionId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /promotions/" + req.params.promotionsId);
});

app.put("/promotions/:promotionsId", (req, res, next) => {
  res.write("Updating the promotions: " + req.params.promotionId + "\n");
  res.end("Will update the promotions: " + req.body.name + " with details: " + req.body.description);
});

app.delete("/promotions/:promotionsId", (req, res, next) => {
  res.end("Deleting promotions : " + req.params.promotionId);
});


app.use(express.static(__dirname+ '/public'));

app.use((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Hellow</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});