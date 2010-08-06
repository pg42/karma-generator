# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Lowest Common Multiple', week=14,
    lesson_title=u'लघुत्तम समापवर्तक',
    summary=u'दुई सङ्ख्याको लघुत्तम समापवर्त्य (ल.स ) निकाल्न सिकाउने क्रियाकलाप')

css('global')
css('lesson.css')

java_script('jquery.clickable')

audio('ne_correct.ogg', 'correct')
audio('ne_incorrect.ogg', 'incorrect')

for x in ['ruler', 'ruler_intersect', 'ruler_ring']:
    image(x + '.png', x)

for x in ['frog', 'rabbit']:
    image(x + '0.png', x + '0')
    image(x + '1.png', x + '1')

for i in range(0, 5):
    image('lesson1ImgDef%s.png' % i, 'lesson1ImgDef%s' % i)

for i in range(0, 10):
    image('lesson2ImgDef%s.png' % i, 'lesson2ImgDef%s' % i)

image('lesson2ImgSign.png', 'lesson2ImgSign')

for i in range(0, 6):
    image('lesson3ImgDef%s.png' % i, 'lesson3ImgDef%s' % i)

for i in range(1, 4):
    image('exercise%i.png' % i)
    image('exercise%iHover.png' % i)

for x in ['checkAnsBtn', 'showAnsBtn', 'moreQuesBtn']:
    image(x + '.png')
    image(x + 'Hover.png')

for x in ['correct', 'incorrect']:
    image(x + '.png', x)

image('nextBtn.png')
image('nextBtnHover.png')

for x in ['exerciseTitle', 'exercise1Title', 'exerciseRestTitle']:
    image(x + '.png', x)

footer_configuration(link_previous=True, link_next=True, scoreboard=True)

