# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='LINES AND TRIANGLES', week=7,
    browser_title='Lines and Triangles',
    lesson_title=u'रेखा र त्रिभुजहरू',
    summary=u'रेखा र त्रिभुजहरू छुट्याउन सिकाउने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.core',
          'jquery.clickable']:
    java_script(f)

image('dot.png','dot')
image('a.png','a')
image('b.png','b')
image('c.png','c')
image('d.png','d')
image('check.png','check')
image('gameOverSuccess.png','gameOverSuccess')
image('gameOverTry.png','gameOverTry')
image('correct.png','correct')
image('wrong.png','wrong')


footer_configuration(link_next=False, link_previous=False, scoreboard=True)
