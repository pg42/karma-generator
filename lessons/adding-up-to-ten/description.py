﻿# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='ADDING UP TO TEN', week=4,
     browser_title='Adding up to 10',
    lesson_title=u'दससम्मको जोड',
    summary=u'दससम्मको जोड गर्न सिकाउने क्रियाकलाप')


css('global')
css('lesson.css')

for f in ['ui.core',
          'jquery.clickable']:
    java_script(f)


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
