﻿# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='ADDING AND SUBTRACTING VARIABLES', week=10,
       lesson_title=u'चलहरूको जोड र घटाउ',
       summary=u'चलहरूको जोड र घटाउ गर्न सिकाउने क्रियाकलाप')

css('global')
css('lesson.css')

java_script('jquery.clickable')
java_script('jquery.strings')
java_script('jquery.keyfilter')

for i in range(0, 6):
    image('ques%s.png' % i, 'ques%s' % i)
    image('img%s.png' % i, 'img%s' % i)

image('gameOver.png')
image('bgLeft.png')
image('check.png')
image('correct.png','correct')
image('incorrect.png','incorrect')

footer_configuration(scoreboard=True, link_check_answer=True);
