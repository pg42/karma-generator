# -*- coding: utf-8 -*-
lesson(grade=2, subject='English', title='COLOUR IDENTIFICATION', week=19,
       summary=u'चित्र हेरेर विभिन्न रङ्गहरू चिन्ने क्रियाकलाप')

java_script('configuration.js')

include('../../templates/identification/description.py')

register_things(['black', 'blue', 'brown', 'green', 'purple',
                 'orange', 'red', 'yellow', 'white'])
image('background.jpg')
css('lesson.css')
