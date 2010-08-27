# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='ESTIMATING ANGLES', week=16,
    lesson_title=u'कोणको माप',
    summary=u'प्रोटेक्टरको प्रयोग गरी कोणको माप गर्न सिकाउने क्रियाकलाप')

css('global')
css('lesson.css')

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
