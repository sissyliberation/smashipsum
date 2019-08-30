const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const loremIpsum = require('lorem-ipsum');

const app = express();
const port = process.env.PORT || 8080;

const latinDictionary = require(__dirname+'/lib/latin/dictionary').words;
const smash64Dictionary = require(__dirname+'/lib/smash64/dictionary');
const meleeDictionary = require(__dirname+'/lib/melee/dictionary');
const brawlDictionary = require(__dirname+'/lib/brawl/dictionary');
const pmDictionary = require(__dirname+'/lib/pm/dictionary');
const smash4Dictionary = require(__dirname+'/lib/smash4/dictionary');
const ultimateDictionary = require(__dirname+'/lib/ultimate/dictionary');

app.use(express.static(__dirname));

if (process.env.NODE_ENV === "production") {
  const prodPath = '/client/build/';
  app.use(favicon(__dirname + `${prodPath}/logo.png`));

  app.use(express.static(path.join(__dirname, prodPath)));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, `${prodPath}index.html`));
  });  
}

app.get('/api/ipsum/', function(req, res) {
  shuffle(latinDictionary);
  let words = [];
  let settings = JSON.parse(JSON.stringify(req.query));

  // smash 64
  if (settings.smash64.characters === "true") {
    words = words.concat(smash64Dictionary.characters);
  }
  if (settings.smash64.stages === "true") {
    words = words.concat(smash64Dictionary.stages);
  }
  if (settings.smash64.items === "true") {
    words = words.concat(smash64Dictionary.items);
  }

  // melee
  if (settings.melee.characters === "true") {
    words = words.concat(meleeDictionary.characters);
  }
  if (settings.melee.stages === "true") {
    words = words.concat(meleeDictionary.stages);
  }
  if (settings.melee.items === "true") {
    words = words.concat(meleeDictionary.items);
  }

  // brawl
  if (settings.brawl.characters === "true") {
    words = words.concat(brawlDictionary.characters);
  }
  if (settings.brawl.stages === "true") {
    words = words.concat(brawlDictionary.stages);
  }
  if (settings.brawl.items === "true") {
    words = words.concat(brawlDictionary.items);
  }

  // pm
  if (settings.pm.characters === "true") {
    words = words.concat(pmDictionary.characters);
  }
  if (settings.pm.stages === "true") {
    words = words.concat(pmDictionary.stages);
  }
  // pm items are exactly the same as brawl,
  // so it's just stored in brawl dictionary
  if (settings.pm.items === "true") {
    words = words.concat(brawlDictionary.items);
  }

  // smash 4
  if (settings.smash4.characters === "true") {
    words = words.concat(smash4Dictionary.characters);
  }
  if (settings.smash4.stages === "true") {
    words = words.concat(smash4Dictionary.stages);
  }
  if (settings.smash4.items === "true") {
    words = words.concat(smash4Dictionary.items);
  }

  // ultimate
  if (settings.ultimate.characters === "true") {
    words = words.concat(ultimateDictionary.characters);
  }
  if (settings.ultimate.stages === "true") {
    words = words.concat(ultimateDictionary.stages);
  }
  if (settings.ultimate.items === "true") {
    words = words.concat(ultimateDictionary.items);
  }

  const latin = latinDictionary.slice(0, words.length / 2);

  words = words.concat(latin);

  const numParagraphs =  parseInt(settings.numParagraphs) || 4;
  const minWords      =  parseInt(settings.minWords) || 5;
  const maxWords      =  parseInt(settings.maxWords) || 15;
  const minSentences  =  parseInt(settings.minSentences) || 3;
  const maxSentences  =  parseInt(settings.maxSentences) || 7;
  const format        =  settings.format || 'text'; 

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

  if (format === 'html') {
     output = output.replace(/(\n)+/g, '\n\n');
  }

  let data = {
    ipsum: output
  }

  res.send(data);
});

app.listen(port, () => console.log(`listening on port ${port}`));

function shuffle(array) {
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
}
