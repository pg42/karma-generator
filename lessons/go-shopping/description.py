# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='GO SHOPPING', week=2,
       browser_title='Class 6 Maths Go Shopping',
       lesson_title=u'किनमेल',
       summary=u'किनमेल गर्न सिकाउने क्रियाकलाप')

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

image('correct.png', 'correct')
image('incorrect.png', 'incorrect')

footer_configuration(link_next=True, link_previous=True, scoreboard=True, link_check_answer=False)
