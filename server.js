var express = require('express'); 
var request = require('request');
var loremIpsum = require('lorem-ipsum');

var app = express();
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/api/get/', function(req, res) {
    var numUnits =  req.query.numUnits || 3;

    var output = loremIpsum({
        count:  numUnits,             // Number of words, sentences, or paragraphs to generate.
        units: 'paragraphs',            // Generate words, sentences, or paragraphs.
        sentenceLowerBound: 5,         // Minimum words per sentence.
        sentenceUpperBound: 15,        // Maximum words per sentence.
        paragraphLowerBound: 3,       // Minimum sentences per paragraph.
        paragraphUpperBound: 7,        // Maximum sentences per paragraph.
        format: 'html',               // Plain text or html
        // words: ['ad', 'dolor', ... ]  // Custom word dictionary. Uses dictionary.words (in lib/dictionary.js) by default.
        random: Math.random          // A PRNG function. Uses Math.random by default
    });

    res.send(output);
});

console.log('server started at port '+port);
app.listen(port);