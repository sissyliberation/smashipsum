var express = require('express'); 
var request = require('request');
var loremIpsum = require('lorem-ipsum');

var app = express();
var port = process.env.PORT || 8080;

var latinDictionary = require(__dirname+'/lib/latin/dictionary').words;
var smash64Dictionary = require(__dirname+'/lib/smash64/dictionary');
var meleeDictionary = require(__dirname+'/lib/melee/dictionary');
var brawlDictionary = require(__dirname+'/lib/brawl/dictionary');
var smash4Dictionary = require(__dirname+'/lib/smash4/dictionary');

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/api/get/', function(req, res) {
  shuffle(latinDictionary);

  var words = [];

  // smash 64
  if (req.query.smash64.characters === "true") {
    words = words.concat(smash64Dictionary.characters);
  }
  if (req.query.smash64.stages === "true") {
    words = words.concat(smash64Dictionary.stages);
  }
  if (req.query.smash64.items === "true") {
    words = words.concat(smash64Dictionary.items);
  }
  // if (req.query.smash64.general === "true") {
  //   words = words.concat(smash64Dictionary.general);
  // }

  // melee
  if (req.query.melee.characters === "true") {
    words = words.concat(meleeDictionary.characters);
  }
  if (req.query.melee.stages === "true") {
    words = words.concat(meleeDictionary.stages);
  }
  if (req.query.melee.items === "true") {
    words = words.concat(meleeDictionary.items);
  }
  // if (req.query.melee.general === "true") {
  //   words = words.concat(meleeDictionary.general);
  // }

  // brawl
  if (req.query.brawl.characters === "true") {
    words = words.concat(brawlDictionary.characters);
  }
  if (req.query.brawl.stages === "true") {
    words = words.concat(brawlDictionary.stages);
  }
  if (req.query.brawl.items === "true") {
    words = words.concat(brawlDictionary.items);
  }
  // if (req.query.brawl.general === "true") {
  //   words = words.concat(brawlDictionary.general);
  // }

  // add pm here

  // add smash4 here
  if (req.query.smash4.characters === "true") {
    words = words.concat(smash4Dictionary.characters);
  }
  if (req.query.smash4.stages === "true") {
    words = words.concat(smash4Dictionary.stages);
  }
  if (req.query.smash4.items === "true") {
    words = words.concat(smash4Dictionary.items);
  }
  // if (req.query.smash4.general === "true") {
  //   words = words.concat(smash4Dictionary.general);
  // }

  var latin = latinDictionary.slice(0, words.length / 4);

  words = words.concat(latin);

  var numParagraphs =  parseInt(req.query.numParagraphs) || 4;
  var minSentences =   parseInt(req.query.minSentences) || 3;
  var maxSentences =   parseInt(req.query.maxSentences) || 7;

  var output = loremIpsum({
    count:  numParagraphs,             // Number of words, sentences, or paragraphs to generate.
    units: 'paragraphs',          // Generate words, sentences, or paragraphs.
    sentenceLowerBound: 5,        // Minimum words per sentence.
    sentenceUpperBound: 15,       // Maximum words per sentence.
    paragraphLowerBound: minSentences,       // Minimum sentences per paragraph.
    paragraphUpperBound: maxSentences,       // Maximum sentences per paragraph.
    format: 'html',               // Plain text or html
    words: words,                 // Custom word dictionary. Uses dictionary.words (in lib/dictionary.js) by default.
    random: Math.random           // A PRNG function. Uses Math.random by default
  });

  res.send(output);
});

console.log('server started at port '+port);
app.listen(port);

function shuffle(array) {
  var counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    var index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}