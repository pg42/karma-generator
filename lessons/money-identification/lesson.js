var amounts = [1, 2, 5, 10, 20, 25, 50, 100, 500, 1000];

setUpSimpleMCQuiz(
    {
        title: 'Identify the money',
        has_audio: true
    },
    {
        presentOption: function (x) {
          return createDiv()
              .addClass('optImg')
              .html(x)
              .appendTo('#optionSection');
        }
    },
    amounts
);
