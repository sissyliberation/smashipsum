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
const loremIpsum = require("lorem-ipsum").loremIpsum;

const app = express();
const port = process.env.PORT || 8080;

dotenv.config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const GAME_DB_NAME = "games";
const IPSUM_DB_NAME = "ipsum";
const CONNECTION_URL = `mongodb+srv://${username}:${password}@smashipsum-dev-yuiyq.mongodb.net/test?retryWrites=true&w=majority`;

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

  let words = [];
  let settings = JSON.parse(JSON.stringify(req.query));

  settings["smash64"] = JSON.parse(settings["smash64"]);
  settings["brawl"] = JSON.parse(settings["brawl"]);
  settings["melee"] = JSON.parse(settings["melee"]);
  settings["pm"] = JSON.parse(settings["pm"]);
  settings["smash4"] = JSON.parse(settings["smash4"]);
  settings["ultimate"] = JSON.parse(settings["ultimate"]);

  gameCollection.find({}).toArray((error, result) => {
    if(error) {
      return res.status(500).send(error);
    }

    const smash64Dictionary = result.find(x => x.name === "smash64");
    const meleeDictionary = result.find(x => x.name === "melee");
    const brawlDictionary = result.find(x => x.name === "brawl");
    const pmDictionary = result.find(x => x.name === "pm");
    const smash4Dictionary = result.find(x => x.name === "smash4");
    const ultimateDictionary = result.find(x => x.name === "ultimate");

    // smash 64
    if (settings.smash64.characters === true) {
      words = words.concat(smash64Dictionary.characters);
    }
    if (settings.smash64.stages === true) {
      words = words.concat(smash64Dictionary.stages);
    }
    if (settings.smash64.items === true) {
      words = words.concat(smash64Dictionary.items);
    }

    // melee
    if (settings.melee.characters === true) {
      words = words.concat(meleeDictionary.characters);
    }
    if (settings.melee.stages === true) {
      words = words.concat(meleeDictionary.stages);
    }
    if (settings.melee.items === true) {
      words = words.concat(meleeDictionary.items);
    }

    // brawl
    if (settings.brawl.characters === true) {
      words = words.concat(brawlDictionary.characters);
    }
    if (settings.brawl.stages === true) {
      words = words.concat(brawlDictionary.stages);
    }
    if (settings.brawl.items === true) {
      words = words.concat(brawlDictionary.items);
    }

    // pm
    if (settings.pm.characters === true) {
      words = words.concat(pmDictionary.characters);
    }
    if (settings.pm.stages === true) {
      words = words.concat(pmDictionary.stages);
    }
    // pm items are exactly the same as brawl,
    // so it's just stored in brawl dictionary
    if (settings.pm.items === true) {
      words = words.concat(brawlDictionary.items);
    }

    // smash 4
    if (settings.smash4.characters === true) {
      words = words.concat(smash4Dictionary.characters);
    }
    if (settings.smash4.stages === true) {
      words = words.concat(smash4Dictionary.stages);
    }
    if (settings.smash4.items === true) {
      words = words.concat(smash4Dictionary.items);
    }

    // ultimate
    if (settings.ultimate.characters === true) {
      words = words.concat(ultimateDictionary.characters);
    }
    if (settings.ultimate.stages === true) {
      words = words.concat(ultimateDictionary.stages);
    }
    if (settings.ultimate.items === true) {
      words = words.concat(ultimateDictionary.items);
    }

    ipsumCollection.find({}).toArray((error, result) => {
      if(error) {
        return res.status(500).send(error);
      }

      const latinDictionary = shuffle(result[0].words);
      const latin = latinDictionary.slice(0, words.length / 2);

      words = words.concat(latin);
      
      const numParagraphs =  parseInt(settings.numParagraphs) || 4;
      const minWords      =  parseInt(settings.minWords) || 5;
      const maxWords      =  parseInt(settings.maxWords) || 15;
      const minSentences  =  parseInt(settings.minSentences) || 3;
      const maxSentences  =  parseInt(settings.maxSentences) || 7;
      const format        =  settings.format || 'plain';

      let output = loremIpsum({
        count:  numParagraphs,              // Number of words, sentences, or paragraphs to generate.
        units: 'paragraphs',                // Generate words, sentences, or paragraphs.
        sentenceLowerBound: minWords,       // Minimum words per sentence.
        sentenceUpperBound: maxWords,       // Maximum words per sentence.
        paragraphLowerBound: minSentences,  // Minimum sentences per paragraph.
        paragraphUpperBound: maxSentences,  // Maximum sentences per paragraph.
        format: format,                     // Plain text or html
        words: words,                       // Custom word dictionary. Uses dictionary.words (in lib/dictionary.js) by default.
        random: Math.random                 // A PRNG function. Uses Math.random by default
      });

      // add an extra new line for legibility
      output = output.replace(/(\n)+/g, '\n\n');
      
      let data = {
        ipsum: output
      }

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