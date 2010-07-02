function setUpAnswer(word) {
    var i = Karma.random(0, word.length - 1);

    var $blank = $(document.createElement('span'))
        .addClass('objectWord');

    var input;

    for (var j = 0; j < word.length; ++j) {
        if (i == j) {
            input = $(document.createElement('input'))
                .attr({type: 'text',
                       maxlength: 1})
                .addClass('blankBox')
                .Watermark('?')
                .appendTo($blank);
        } else {
            $blank.append(word[j]);
        }
    }

    var answers_div = createDiv('answers')
        .append("It's ")
        .append(aOrAn(word))
        .append(' ')
        .append($blank)
        .append('.');

    return {expected: word[i],
            input: input,
            answers_div: answers_div};
}
