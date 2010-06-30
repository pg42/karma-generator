lesson(grade=6, subject='English', title="What's this word", week=1)

include('../../templates/what-is-this/description.py')

java_script('lesson.js')
css('lesson.css')
image('help', 'help.png', preload=False)
