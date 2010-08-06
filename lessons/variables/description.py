# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Variables', week=10,
       lesson_title=u'बीजगणितीय चलहरू')

css('global')
css('lesson.css')

for f in ['ui.core',
		 'jquery.clickable']:
    java_script(f)

audio('wrong.ogg', 'incorrect')
audio('right.ogg', 'correct')


image('bgAns.png', 'bgAns')
image('bgMessage.png', 'bgMessage')
image('bgQuestion.png', 'bgQuestion')
image('bgQues.png', 'bgQues')
image('gameOver.png', 'gameOver')

image('img0.png', 'img0')
image('img0Clicked.png', 'img0Clicked')
image('img1.png', 'img1')
image('img1Clicked.png', 'img1Clicked')
image('img2.png', 'img2')
image('img2Clicked.png', 'img2Clicked')
image('img3.png', 'img3')
image('img3Clicked.png', 'img3Clicked')
image('img4.png', 'img4')
image('img4Clicked.png', 'img4Clicked')
image('img5.png', 'img5')
image('img5Clicked.png', 'img5Clicked')
image('img6.png', 'img6')
image('img6Clicked.png', 'img6Clicked')
image('img7.png', 'img7')
image('img7Clicked.png', 'img7Clicked')

footer_configuration(scoreboard=True, link_check_answer=True)




