const cors = require('cors');
const express = require('express');
const app = express();

//contains all the orgins the server accepts
const whitelist = ['http://localhost:5000', 'https://localhost:6443','https://localhost:4200'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
