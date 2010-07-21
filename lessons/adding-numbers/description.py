# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='Adding Numbers', week=4,
       lesson_title=u'वस्तुहरूको जोड')


css('global')
css('lesson.css')

for f in ['ui.core',
          'karma',
          '../../js/common.js',
          'lesson.js']:
    java_script(f)


audio('byebye.ogg', 'byebye')
audio('ne_correct.wav', 'correct')
audio('ne_incorrect.wav', 'incorrect')

image('background.jpg')

footer_configuration(link_next=False, link_previous=False, scoreboard=True)
