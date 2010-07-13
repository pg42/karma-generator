lesson(grade=6, subject='English', title='Prepositions', week=11)

css('global')
css('lesson.css')

for f in ['ui.core',
          'karma',
          '../../js/common.js',
          '../../js/multiple-choice.js',
          'lesson.js']:
    java_script(f)

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

for x in 'abcd':
    image(x + '.png', x)

image('main.png')
image('correct.png', 'correct')
image('wrong.png', 'incorrect')

div(id='content')

footer_configuration(link_previous=False, link_next=True, scoreboard=True)
