lesson(grade=2, subject='English', title='Colour Identification', week=8)

java_script('configuration.js')

include('../../templates/identification/description.py')

register_things(['black', 'blue', 'brown', 'green', 'purple',
                 'orange', 'red', 'yellow', 'white'])
image('background.jpg')
css('lesson.css')
