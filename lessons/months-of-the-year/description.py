# -*- coding: utf-8 -*-
lesson(grade=6, subject='English', title='Months of the Year', week=1, browser_title='Class 6 English Months', lesson_title='Months of the Year')

css('global')
css('lesson.css')

for f in [
        'jquery-ui',
        'karma',
        'jquery.watermarkinput',
        '../../js/common.js',
        'lesson.js'
    ]:
        java_script(f)

months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
        ]
for month in months:
        image(month + '.png', month)
        image('small_' + month + '.png', 'small_' + month)
        audio(month + '.ogg', month)

audio('correct.ogg', 'correct')
audio('incorrect.ogg', 'incorrect')

image('check.png', 'check')
image('correct.png', 'correct')
image('incorrect.png', 'incorrect')

footer_configuration(link_next=True, link_previous=True, scoreboard=True, link_check_answer=True)
