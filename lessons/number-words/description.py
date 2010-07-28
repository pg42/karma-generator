lesson(grade=2, subject='English', title= 'Number Words', week=14)

css('global')
css('lesson.css')

for f in ['ui.core']:
    java_script(f)

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

image('football.png', 'football')
image('gameOver.png', 'gameOver')


