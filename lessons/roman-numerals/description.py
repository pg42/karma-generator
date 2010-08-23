# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Roman Numerals', week=12,
    browser_title='Roman Numerals',
    lesson_title=u'रोमन सङ्ख्या',
    summary=u'रोमन सङ्ख्याको जानकारी दिेन क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.core',
          'jquery.clickable',
          'clock']:
    java_script(f)

image('confirm.png', 'confirm')
image('correct.png', 'correct')
image('gameOver.png', 'gameOver')
image('img2title.png', 'titleImg')
image('incorrect.png', 'incorrect')
image('quesBox.png', 'quesBox')
image('confirm.png', 'confirm')
image('img_think.png', 'thinkImg')
image('image1.png', 'imgFront')
