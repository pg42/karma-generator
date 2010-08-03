# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Estimating Angles', week=16,
       lesson_title=u'कोणको माप')

css('global')
css('lesson.css')

for x in ['correct', 'incorrect']:
    audio('ne_' + x + '.ogg', x)

audio('explode.ogg', 'explode')

image('section1.png')

for x in [0, 30, 45, 60, 90, 120, 135, 150, 180]:
    image('line%s.png' % x, 'line%s' % x)

image('protractor.png')
image('section2ImgHint.png', 'section2ImgHint')
image('angle.png', 'angle')
image('gameOverSuccess.png', 'gameOverSuccess')
image('gameOverTry.png', 'gameOverTry')
image('medal.png')
image('section3ImgTop.png', 'section3ImgTop')
image('section3.png')
image('ball.png')
image('boom.png', 'boom')

audio('explode.ogg', 'explode')
