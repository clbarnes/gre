var wordList = WORD_LIST;

var UNKNOWN = '????????';

var currentPair = {word: UNKNOWN, definition: UNKNOWN};

var randomPair = function() {
    var pair = wordList[Math.floor(Math.random()*wordList.length)];
    currentPair = {word: pair.word, definition: pair.definition};
    return currentPair;
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
    $('#wordText').text(currentPair.word);
    $('#definitionText').text(currentPair.definition);
};

$('#showButton').click(showAnswer);
$('#nextButton').click(nextQuestion);

nextQuestion();
