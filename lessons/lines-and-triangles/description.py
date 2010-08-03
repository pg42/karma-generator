# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Lines and Triangles', week=8,
       browser_title='Lines and Triangles',
       lesson_title=u'रेखा र त्रिभुजहरू')
css('global')
css('lesson.css')

for f in ['ui.core',
          'lesson.js']:
    java_script(f)



audio('correct.ogg', 'correct')
audio('incorrect.ogg', 'incorrect')

image('lessonHint.png','lesssonHint')
image('dot.png','dot')
image('a.png','a')
image('b.png','b')
image('c.png','c')
image('d.png','d')
image('check.png','check')
image('gameOverSuccess.png','gameOverSuccess')
image('gameOverTry.png','gameOverTry')
image('ques0.png','ques0')
image('ques1.png','ques1')


footer_configuration(link_next=False, link_previous=False, scoreboard=True)