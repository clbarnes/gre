var UNKNOWN = '????????';
var WORDLIST_URL = 'https://raw.githubusercontent.com/clbarnes/gre_scraper/json/wordList.json'
var wordList = [{word: UNKNOWN, definition: UNKNOWN, usages: []}];

var currentData = wordList[0];

var randomPair = function() {
  currentData =  wordList[Math.floor(Math.random()*wordList.length)];
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

$(document).ready(function() {
  $('#tabs').tabs();

  var $table = $('#table');
  var table = $table.DataTable({
    destroy: true,
    dom: '<"H"lrp>t<"F"ip>',
    paging: false,
    deferRender: true,
    processing: true,
    searching: true,
    ordering: true,
    jQueryUI: true,
    columns: [
      {
        data: 'word',
        sortable: true,
        searchable: true
      },
      {
        data: 'definition',
        sortable: false,
        searchable: false
      },
      {
        data: 'usages',
        render: function(data, type, row, meta) {
          var longStr = data
            .map(item => item.replace(/\?{2,}/, `<b>${row.word}</b>`))
            .join('<br>');

          if (type === "display") {
            return `
              <button class="def-toggle">Show usages</button>
              <p style="display:none" class="def-toggle">
                ${longStr}
              </p>
            `;
          } else {
            return longStr
          }
        },
        sortable: false,
        searchable: false
      },
      {
        data: 'potato',
        visible: false,
        render: function(data, type, row, meta) {
          return type === 'sort' ? Math.random(): 0;
        }
      }
    ]
  });

  $('#showButton').click(showAnswer);
  $('#nextButton').click(nextQuestion);


  $('#randomise').click(function() {
    table.clear();
    table.rows.add(wordList);
    table.order([3, 'asc'])
      .draw();
  });

  $('#hide-all').click(function() {
    $('p.def-toggle').toggle(false);
    $('button.def-toggle').toggle(true);
  });

  var $wordSearch = $('#word-search');

  $wordSearch.keydown(function(event) {
    if (event.which == 13) {
      event.stopPropagation();
      event.preventDefault();
      table
        .column(event.target.closest('th'))
        .search(event.target.value, false, false)
        .draw();
    }
  });

  $wordSearch.click(function (event) {
    event.stopPropagation();
  });

  $wordSearch.focus(function () {
    if (this.className === "search-init") {
      this.className = "";
      this.value = "";
    }
  });

  $wordSearch.focusout(function() {
    if (this.value === '') {
      this.className = 'search-init';
      this.value = 'search';
    }
  });

  $table.on('click', '.def-toggle', function(event) {
    $(event.target.closest('td')).find('.def-toggle').toggle();
  });

  nextQuestion();

  $.get(WORDLIST_URL, function(data) {
    wordList = JSON.parse(data);
    $('h2').hide();
    nextQuestion();
    table.rows.add(wordList);
    table.draw()
  });

});
