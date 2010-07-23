# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='Adding up to 10 Fun Game', week=3,
       browser_title='Adding up to 10',
       lesson_title=u'दससम्मको जोड')

css('global')
css('lesson.css')

for f in ['ui.core',
          'karma',
          '../../js/common.js',
          '../../js/jquery.interactive.js',
          'lesson.js']:
    java_script(f)


audio('correct.ogg', 'correct')
audio('incorrect.ogg', 'incorrect')
audio('trigger.ogg', 'trigger')

image('plussign.png', 'plussign')
image('scorebox.png', 'scorebox')

image('ball37px.png', 'ball')
image('balloon37px.png', 'balloon')
image('banana37px.png', 'banana')
image('chilli.png', 'chilli')
image('fish64px.png', 'fish')
image('flower37px.png', 'flower')
image('normalChimp_120x125.png', 'normal_chimp')
image('happyChimp_120x125.png', 'happy_chimp')
image('sadChimp_120x125.png', 'sad_chimp')


footer_configuration(link_next=False, link_previous=False, scoreboard=True)
