lesson(grade=2, subject='English', title='Colour Identification', week=8)

include('../../templates/identification/description.py')

java_script('configuration.js')

register_things(['black', 'blue', 'brown', 'green', 'purple',
                 'orange', 'red', 'yellow', 'white'])
image('background', 'background.jpg', preload=False)
image('help', 'help.png', preload=False)
css('lesson.css')
