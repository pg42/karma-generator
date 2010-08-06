# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='Quick Multiplication', week=15,
       browser_title='Quick Multiplication',
       lesson_title=u'दससम्मको जोड')

css('global')
css('lesson.css')

for f in ['ui.core',
          'clock'
		  ]:
    java_script(f)


audio('correct.ogg', 'correct')
audio('incorrect.ogg', 'incorrect')

image('background.jpg', 'background')
image('blueTruck0.png', 'blueTruck0')
image('blueTruck1.png', 'blueTruck1')
image('blueTruck2.png', 'blueTruck2')
image('boxes.png', 'boxes')
image('bridgeUp.png', 'bridgeUp')
image('chooseLevel.png', 'chooseLevel')
image('correctFace.png', 'correctFace')
image('help.png', 'help')
image('imgComputerTruck.png', 'imgComputerTruck')
image('imgTop.png', 'imgTop')
image('imgYourTruck.png', 'imgYourTruck')
image('incorrectFace.png', 'incorrectFace')
image('info.png', 'info')
image('infoText.png', 'infoText')
image('level1.png', 'level1')
image('level2.png', 'level2')
image('level3.png', 'level3')
image('levelArrow.png', 'levelArrow')
image('main_bridge.png', 'main_bridge')
image('multiplySecImg.png', 'multiplySecImg')
image('picClock.png', 'picClock')
image('redTruck0.png', 'redTruck0')
image('redTruck1.png', 'redTruck1')
image('redTruck2.png', 'redTruck2')
image('road.png', 'road')
image('signEquals.png', 'signEquals')

footer_configuration(link_next=False, link_previous=False, scoreboard=True)
