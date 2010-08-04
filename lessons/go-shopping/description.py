﻿# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Go Shopping', week=5, browser_title='Class 6 Maths Go Shopping', lesson_title='Go Shopping')

css('global')
css('lesson.css')

for f in [
        'jquery.clickable',
        'jquery.keyfilter'
    ]:
        java_script(f)

for img in [
		'apple',
		'bag',
		'balloon',
		'book',
		'bread',
		'cake',
		'cap',
		'doll',
		'food',
		'grapes',
		'ice',
		'lays',
		'mango',
		'orange',
		'papaya',
		'pear',
		'pen',
		'pomogranate',
		'roti',
	]:
	image(img + '.png', img)
		
for rs in [5,10,25,50,100]:
	image('rs' + str(rs) + '.jpg', 'rs' + str(rs))

image('moneyNeeded.png', 'moneyNeeded')
image('moneyOk.png', 'moneyOk')

for x in ['correct', 'incorrect']:
    audio('ne_' + x + '.ogg', x)

image('correct.png', 'correct')
image('incorrect.png', 'incorrect')

footer_configuration(link_next=True, link_previous=True, scoreboard=True, link_check_answer=False)
