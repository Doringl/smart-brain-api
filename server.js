const express = require('express');
const App = express();

const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const image = require('./controllers/image');
const signIn = require('./controllers/signIn');
const register = require('./controllers/register');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'smart-brain'
  }
});

App.use(cors());
App.use(bodyParser.json());

App.get('/', (req, res) => {
  res.send(db.users);
});

App.post('./signin', signIn.handleSignIn(db, bcrypt));
App.post('./register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
App.get('./profile/:id', (req, res) => {
  profile.handleProfileGetData(req, res, db, bcrypt);
});
App.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
App.post('/imageURL', (req, res) => {
  image.handleApiCall(req, res);
});

App.listen(3000);
