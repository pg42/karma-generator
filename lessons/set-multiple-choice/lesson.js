var tasks = [
    {
        question: 'समूह V = {a,e,i,o,u}लाई  कसरी लेख्दा ठिक हुदैन ',
        options: ['V = {e,a,i,a,u}',
                  'V = {e,a,o,i,u}',
                  'V = {i,u,a,o,e}',
                  'V = {a,e,o,i,u}']
    },
    {
        question: 'MISSISSIPPI (नदीको) नाममा भएका अङ्ग्रेजी वर्णमालाका अक्षर हरुको M समुह बनाउदा कसरी लेख्नुपर्छ ',
        options: ['M = {M,I,S,P}',
                  'M = {M,I,S,I,P,I}',
                  'M = {M,I,S,S,I,S,S,I,P,P,I}',
                  'M = {M,I,S,S,P}']
    },
    {
        question: 'चिन्ह  &isin; ले के जनाउछ ',
        options: ['समुहको सदस्य हो',
                  'समुहको सदस्य होइन',
                  'उप-समुह हो',
                  'उप-समुह होइन ']
    },
    {
        question: 'चिन्ह   &notin; ले के जनाउछ',
        options: ['समुहको सदस्य होइन',
                  'समुहको सदस्य हो',
                  'उप-समुह हो',
                  'उप-समुह होइन ']
    },
    {
        question: 'समुहको गणनात्मकता (cardinal numbers)  भन्नाले के बुझिन्छ ',
        options: ['समुहमा भएका सदस्यहरुको सङ्ख्या',
                  'सङ्ख्याहरु मिलेर बनेको समुह',
                  'समुहहरुको सङ्ख्या',
                  'समुहलाई गन्ने']
    },
    {
        question: 'बराबर समुह (equal sets)  भन्नाले के बुझिन्छ',
        options: ['दुईओटा  समुहमा उतिकै र उही सदस्यहरु छन् ',
                  'दुईओटा  समुहमा उतिकै संख्यामा सदस्यहरु छन्',
		  'दुईओटा  समुहमा उतिकै  केहि सदस्यहरु एकअर्कासंग मिल्छन',
                  'दुईओटा  समुहमा उतिकै संख्यामा तर सदस्यहरु सबै फरक हुनुपर्छ ']
    },
    {
        question: 'समतुल्य समुह (equivalent sets)  भन्नाले के बुझिन्छ',
        options: ['दुईओटा  समुहमा उतिकै संख्यामा सदस्यहरु छन्',
                  'दुईओटा  समुहमा उतिकै र उही सदस्यहरु छन् ',
		  'दुईओटा  समुहमा उतिकै  केहि सदस्यहरु एकअर्कासंग मिल्छन',
                  'दुईओटा  समुहमा उतिकै संख्यामा तर सदस्यहरु सबै फरक हुनुपर्छ ']
    },
    {
        question: 'चिन्ह &empty; ले कस्तो समुह जनाउछ',
        options: ['एउटा पनि सदस्य नभएको  समुह ',
                  ' 0 (शून्य) संख्या सदस्य भएको  समुह',
                  'सबैभन्दा ठुलो समुह ',
                  'उप-समुह']
    }
].map(function (x, i) {
          x.correct_option = x.options[0];
          x.answer = 'answer' + (i + 1);
          return x;
      });

var nepaliDigits = '०१२३४५६७८९';

function startLesson(karma) {
    var extensions = {
        start: function () {
            $('#content')
                .empty()
                .removeClass('backOpaque');
            createDiv('section')
                .append(createDiv('topText')
                        .html('Click on the answer you think is correct.'))
                .append(createDiv('question'))
                .append(createDiv('optionSection'))
                .append(createDiv('answer'))
                .appendTo('#content');
            MCQuiz.start.apply(this, []);
        },
        presentQuestion: function (what) {
            var task = this.currentTask();
            $('#question')
                .empty()
                .append(nepaliDigits[scoreboardTotal() + 1] + '. ' +
                        task.question);
            $('#check')
                .empty();
            $('#answer')
                .hide();
            $('#linkNextLesson').hide();
        },
        currentMessage: function () {
            var task = this.currentTask();
            return karma.createImg(task.answer);
        },
        displayGameOverMessage: function () {
            $('#linkNextLesson').hide();
            $('#question').hide();
            $('#topText').hide();
            $('#answer').hide();
            $('#content')
                .empty()
                .append(createDiv('gameOver')
                        .html('Game Over !!!')
                        .append(createDiv('gameOverInfo'))
                        .show())
                .show();
            if (scoreboardTotal() == scoreboardScore()) {
		$('#gameOverInfo')
                    .append('बधाई छ !!!  सबै उत्तर सहि भए !!! ');
            } else {
                var specialText = function (x) {
                    return $(document.createElement('span'))
                        .addClass('specialText')
                        .append(x);
                };
                $('#gameOverInfo')
                    .append('किन गलत भयो पत्ता लगाउ र अर्को पटक सहि बनाउने कोशिश गर । ')
                    .append(document.createElement('br'))
                    .append('You got ')
                    .append(specialText(scoreboardScore()))
                    .append(' correct out of ')
                    .append(specialText(scoreboardTotal()))
                    .append(' questions.');
            }
        }
    };
    var q = Object
        .create(OneShotMCQuiz, extensions)
        .initialize(karma, {}, tasks);
    q.start();
}

setUpLesson(function () {}, startLesson);
