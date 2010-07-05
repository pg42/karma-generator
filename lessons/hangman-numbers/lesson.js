var tasks = [
    ['table spoons', 'eight'],
    ['cups', 'seventeen'],
    ['frying pans', 'three'],
    ['serving spoons', 'six'],
    ['kettles', 'three'],
    ['stoves', 'one'], // TBD: crooked sentence 'There are one stoves'.
    ['knives', 'five'],
    ['plates', 'ten'],
    ['glasses', 'thirteen'],
    ['buckets', 'two']];

function createContentDivs(karma) {
    $('#content')
        .empty()
        .append(createDiv('gameTitle').html('Number in words'))
        .append(createDiv('def')
                .html('Count and click on the letters to spell the number'))
        .append(karma.createImg('mainImage').addClass('imgHangMan'))
        .append(createDiv('questionSection'))
        .append(createDiv('answerSection'))
        .append(createDiv('infoSection')
                .html('Click on the letters that fit in the answer. ' +
                      'You are given 3 chances to complete the answer.'))
        .append(createKeyboard(false))
        .append(createDiv('missedText')
                .html('Sorry, you missed it.')
                .hide())
        .append(createDiv('hangManSection'));
    showHangMan(karma, 0);
    $('#questionSection')
        .append('How many ')
        .append($(document.createElement('span')).addClass('objectName'))
        .append(' are there?');
}

function setUpAnswer(q_and_a) {
    var question = q_and_a[0];
    var answer = q_and_a[1];
    var $answerSection = $('#answerSection')
        .empty()
        .append('There are ');
    createAnswerBoxes(answer, $answerSection);
    $answerSection
        .append('&nbsp;&nbsp;')
        .append($(document.createElement('span')).addClass('objectName'))
        .append('.');
    $('.objectName')
        .empty()
        .append(question);
    return answer;
}
