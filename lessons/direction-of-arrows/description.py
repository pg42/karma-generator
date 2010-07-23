lesson(grade=2, subject='English', title='Direction of Arrows', week=1)

css('global')
css('lesson.css')

for f in ['ui.core',
          'multiple-choice']:
    java_script(f)


for i in range(1, 9):
    name = 'arrow%s' % i
    image(name + '.png', name)

image('correct.png', 'correct')
image('incorrect.png', 'incorrect')
image('background.jpg')
image('imageBox.png')
image('optionBox.png')

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')
audio('byebye.ogg', 'byebye')


footer_configuration(link_previous=False, link_next=False, scoreboard=True)

