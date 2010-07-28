# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Set Multiple Choice', week=7,
       lesson_title=u'समूहको मिश्रित')

css('global')
css('lesson.css')

for f in ['ui.core',
          'multiple-choice']:
    java_script(f)

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

for x in 'abcd':
    image(x + '.png', x)

image('correct.png', 'correct')
image('wrong.png', 'incorrect')

for i in range(1, 9):
    image('ques%sdef.png' % i, 'answer%s' % i)


footer_configuration(link_next=True, link_previous=False, scoreboard=True)
