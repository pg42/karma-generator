# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Adding and Multiplying Variables', week=11, browser_title='Class 6 Maths Adding and Multiplying Variables', lesson_title='Adding and Multiplying Variables')

css('global')
css('lesson.css')

for f in [
        'jquery.watermarkinput',
        'jquery.clickable',
        'jquery.strings',
        'jquery.keyfilter'
    ]:
        java_script(f)

for index in range(0,8):
    image('img' + str(index) + '.png', 'img' + str(index))
    image('img' + str(index) + 'More.png', 'img' + str(index) + 'More')

audio('correct')
audio('incorrect')

image('correct.png', 'correct')
image('incorrect.png', 'incorrect')

footer_configuration(link_next=True, link_previous=True, scoreboard=True, link_check_answer=True)
