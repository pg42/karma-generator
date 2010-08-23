# -*- coding: utf-8 -*-
lesson(grade=6, subject='English', title='Alphabetical Order', week=13,
       browser_title='Class 6 English Alphabetical Order',
       lesson_title='Alphabetical Order',
       summary=u'शब्दहरूलाई Alphabetical order मा राख्न सिकाउने क्रियाकलाप')

css('global')
css('lesson.css')

for f in [
        'ui.core',
        'ui.draggable',
        'ui.droppable',
        'jquery.clickable'
    ]:
        java_script(f)

for index in range(0,6):
    image('ele' + str(index) + '.png', 'ele' + str(index))
    image('house' + str(index) + '.png', 'house' + str(index))
    image('ship' + str(index) + '.png', 'ship' + str(index))

image('correct.png', 'correct')
image('incorrect.png', 'incorrect')
image('background.jpg')

footer_configuration(link_next=True, link_previous=True, scoreboard=True, link_check_answer=True)
