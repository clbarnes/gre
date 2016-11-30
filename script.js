var UNKNOWN = '????????';
var WORDLIST_URL = 'https://raw.githubusercontent.com/clbarnes/gre_scraper/json/wordList.json'
var wordList = [{word: UNKNOWN, definition: UNKNOWN, usage: UNKNOWN}];

var currentData = wordList[0];

var randomPair = function() {
    var pair = wordList[Math.floor(Math.random()*wordList.length)];
    currentData = {word: pair.word, definition: pair.definition};
    return currentData;
};

var nextQuestion = function() {
    var pair = randomPair();
    if (Math.random() < 0.5) {
        $('#wordText').text(pair.word);
        $('#definitionText').text(UNKNOWN);
    } else {
        $('#wordText').text(UNKNOWN);
        $('#definitionText').text(pair.definition);
    }
};

var showAnswer = function() {
    $('#wordText').text(currentData.word);
    $('#definitionText').text(currentData.definition);
};

$('#showButton').click(showAnswer);
$('#nextButton').click(nextQuestion);

nextQuestion();

$.get(WORDLIST_URL, function(data) {
    wordList = JSON.parse(data);
    $('h2').hide();
    nextQuestion();
});