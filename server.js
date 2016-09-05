var express = require('express'); 
var request = require('request');
var loremIpsum = require('lorem-ipsum');

var app = express();
var port = process.env.PORT || 8080;

var latinDictionary = require(__dirname+'/lib/latin/dictionary').words;
var ssbmDictionary = require(__dirname+'/lib/ssbm/dictionary');
var brawlDictionary = require(__dirname+'/lib/ssbm/dictionary');

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/api/get/', function(req, res) {
    shuffle(latinDictionary);

    var latin = latinDictionary.slice(0, 100);
    var words = latin.concat(ssbmDictionary.characters, ssbmDictionary.stages, ssbmDictionary.items, ssbmDictionary.general);
    words = words.concat(brawlDictionary.characters, brawlDictionary.stages, brawlDictionary.items, brawlDictionary.general);

    var numUnits =  req.query.numUnits || 3;

    var output = loremIpsum({
      count:  numUnits,             // Number of words, sentences, or paragraphs to generate.
      units: 'paragraphs',          // Generate words, sentences, or paragraphs.
      sentenceLowerBound: 5,        // Minimum words per sentence.
      sentenceUpperBound: 15,       // Maximum words per sentence.
      paragraphLowerBound: 3,       // Minimum sentences per paragraph.
      paragraphUpperBound: 7,       // Maximum sentences per paragraph.
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