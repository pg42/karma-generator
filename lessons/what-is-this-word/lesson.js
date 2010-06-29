function setUpAnswer(word) {
    var $blank = $(document.createElement('span'))
        .addClass('objectWord');

    var input = $(document.createElement('input'))
        .attr('type', 'text')
        .addClass('blankBox')
        .Watermark('?')
        .appendTo($blank);

    var answers_div = $(document.createElement('div'))
        .attr('id', 'answers')
        .append("It's ")
        .append(aOrAn(word))
        .append(' ')
        .append($blank)
        .append('.');

    return {expected: word,
            input: input,
            answers_div: answers_div};
}
