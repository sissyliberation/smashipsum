const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const objectId = mongo.ObjectID;
const mongoose = require("mongoose");

const favicon = require('express-favicon');
const path = require('path');
const chalk = require('chalk');
const talk = chalk.hex("2AF5FF");

const app = express();
const port = process.env.PORT || 8080;

dotenv.config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const GAME_DB_NAME = "games";
const IPSUM_DB_NAME = "ipsum";
const CONNECTION_URL = `mongodb+srv://${nova}:${password}@smashipsum-dev-yuiyq.mongodb.net/test?retryWrites=true&w=majority`;

let gameDB, ipsumDB, gameCollection;

const mongoSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

MongoClient.connect(CONNECTION_URL, mongoSettings, (error, client) => {
  if(error) {
    throw error;
  }

  gameDB = client.db(GAME_DB_NAME);
  gameCollection = gameDB.collection("game");

  ipsumDB = client.db(IPSUM_DB_NAME);
  ipsumCollection = ipsumDB.collection("words");

  console.log(talk.bold(`Connected to ${GAME_DB_NAME}, ${IPSUM_DB_NAME}`));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get('/api/ipsum/', (req, res) => {
  gameCollection.find({}).toArray((error, result) => {
    if(error) {
      return res.status(500).send(error);
    }

    let data = {
      games: result
    }

    ipsumCollection.find({}).toArray((error, result) => {
      if(error) {
        return res.status(500).send(error);
      }

      data['ipsum'] = result;
      
      res.send(data);
    });
  });
});

if (process.env.NODE_ENV === "production") {
  const prodPath = '/client/build/';
  app.use(favicon(__dirname + `${prodPath}/favicon.ico`));

  app.use(express.static(path.join(__dirname, prodPath)));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `${prodPath}index.html`));
  });  
}

app.listen(port, () => console.log(talk.bold(`listening on port ${port}`)));

const shuffle = (array) => {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};