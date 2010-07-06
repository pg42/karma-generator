var tasks = [
    "KATHMANDU",
    "BHAKTAPUR",
    "LALITPUR",
    "BHAIRAHAWA",
    "DHARAN",
    "BIRATNAGAR",
    "SOLUKHUMBU",
    "DHANGADI",
    "POKHARA",
    "JANAKPUR"];

function createContentDivs(karma) {
    $('#content')
        .empty();

    createDiv('section')
        .append(createDiv('answerSection'))
        .append(createDiv('infoSection')
                .html('Click on the letters to guess which letters are in this' +
                      ' city. ' +
                      'You are given seven chances to complete the name.'))
        .append(createKeyboard(true))
        .append(createDiv('missedText')
                // TBD: no capitals in first phrase
                // TBD: on _the_ next button
                .html('Sorry, you missed it. Click on the next button below.')
                .hide())
        .append(createDiv('hangManSection'))
        .appendTo($('#content'));
    showHangMan(karma, 0);
    $('#content').append(createDiv('hangFooterImg'));
}

function setUpAnswer(city) {
    var $answerSection = $('#answerSection')
        .empty();
    createAnswerBoxes(city, $answerSection);
    return city;
}

