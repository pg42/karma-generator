lesson(grade=2, subject='English', title='DIRECTION OF ARROWS', week=1,
    summary=u'Arrow को दीशा छुट्याउने क्रियाकलाप')

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

audio('byebye.ogg', 'byebye')


footer_configuration(link_previous=False, link_next=False, scoreboard=True)

