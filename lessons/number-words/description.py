lesson(grade=2, subject='English', title= 'Number Words', week=14)

css('global')
css('lesson.css')

for f in ['ui.core',
          'karma',
          '../../js/common.js',
          'lesson.js']:
    java_script(f)

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

image('football.png', 'football')
image('gameOver.png', 'gameOver')


