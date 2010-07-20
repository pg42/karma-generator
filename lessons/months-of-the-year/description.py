# -*- coding: utf-8 -*-
lesson(grade=6, subject='English', title='Months of the Year', week=3,
	browser_title='Months of the Year',
	lesson_title=u'Months of the Year')

css('global')
css('lesson.css')

for f in ['ui.core',
		'karma',
		'../../js/common.js',
		'lesson.js']:
	java_script(f)

div(id='content')

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
audio('trigger.ogg', 'trigger')
image('check.png', 'check')

footer_configuration(link_next=True, link_previous=True, scoreboard=True)
