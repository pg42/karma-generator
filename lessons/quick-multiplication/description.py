# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='Quick Multiplication', week=15,
       browser_title='Quick Multiplication',
       lesson_title=u'दससम्मको जोड',
       summary=u'छिटोछिटो गुणन गर्न सिकाउने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.core',
          'clock']:
    java_script(f)

audio('correct.ogg', 'correct')
audio('incorrect.ogg', 'incorrect')

image('background.jpg', 'background')
image('blueTruck0.png', 'blueTruck0')
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
image('redTruck0.png', 'redTruck0')



footer_configuration(link_next=False, link_previous=False, scoreboard=True)
