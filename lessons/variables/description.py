# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Variables', week=10,
       lesson_title=u'बीजगणितीय चलहरू',
       summary=u'बीजगणितीय चलहरू बुझाउने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.core',
          'jquery.clickable']:
    java_script(f)

image('bgAns.png', 'bgAns')
image('bgMessage.png', 'bgMessage')
image('bgQuestion.png', 'bgQuestion')
image('bgQues.png', 'bgQues')
image('gameOver.png', 'gameOver')
image('check.png')

for i in range(0, 8):
    image('img%s.png' % i, 'img%s' % i)
    image('img%sClicked.png' % i, 'img%sClicked' % i)

footer_configuration(scoreboard=True, link_check_answer=True)




