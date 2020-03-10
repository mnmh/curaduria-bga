const express = require('express');
var sass = require('node-sass');
const server = express();
const port = 4000;
var fs = require('fs');

server.use(express.static('public'));

server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});