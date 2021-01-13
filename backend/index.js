const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const server = express();

server.use(fileUpload());

//server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use('/card', (req, res, next) => {
  debugger;
  if (req.method === 'POST') {
    const file = req.files.image;
    const name = req.body.name.replace(' ', '_');
    const image = `${name}.png`;
    file.mv(`${__dirname}/../public/${image}`);
    req.body.image = image;
  }
  next();
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'secret') {
    res.json(true);
  } else {
    res.json(false);
  }
});

server.use(jsonServer.router('data.json'));

server.listen(3001);
