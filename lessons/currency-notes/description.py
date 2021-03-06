﻿# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='CURRENCY NOTES', week=18,
       lesson_title=u'रुपैयाँ चिनौ',
       summary=u'चलनचल्तिका रुपैयाँ चिन्ने क्रियाकलाप')

css('global')

for f in ['ui.core',
          'multiple-choice']:
    java_script(f)

for i in [1, 2, 5, 10, 20, 25, 50, 100, 500, 1000]:
    image('Rs%s.png' % i, i)
    audio('Rs%s.ogg' % i, i)

image('correct.png', 'correct')
image('incorrect.png', 'incorrect')

image('optionBorder.png')
image('optionBorderHover.png')
image('listenAgain.png')

audio('byebye.ogg', 'byebye')

css('lesson.css')


footer_configuration(link_next=False, link_previous=False, scoreboard=True)
