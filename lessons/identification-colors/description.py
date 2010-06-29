directory('2_English_colorIdentification_8_K')

title('Class 2 English Colour Identification')
lesson_title('Colour Identification')

include('../../templates/identification/description.py')

java_script('configuration.js')

register_things(['black', 'blue', 'brown', 'green', 'purple',
                 'orange', 'red', 'yellow', 'white'])
image('background', 'background.jpg', preload=False)
css('lesson.css')
