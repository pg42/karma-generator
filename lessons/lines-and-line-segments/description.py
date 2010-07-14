# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Lines and Line Segments', week=8,
       lesson_title=u'रेखा र रेखाखण्डहरू')

css('global')
css('lesson.css')

for f in ['ui.core',
          'karma',
          '../../js/common.js',
          '../../js/multiple-choice.js',
          'lesson.js']:
    java_script(f)

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

for x in 'abcd':
    image(x + '.png', x)

image('correct.png', 'correct')
image('wrong.png', 'incorrect')

image('line_segment.png', 'line_segment')
image('scale.png', 'scale')
image('lines.png', 'lines')


div(id='content')

footer_configuration(link_next=True, link_previous=False, scoreboard=True)
