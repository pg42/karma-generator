# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Matching Angles and Shapes', week=5,
       nepalese_title=u'ज्यामितीय आकारका नामहरू')

include('../../templates/matching/description.py')

register_objects(['Acute-Angle',
                  'Circle',
                  'Decagon',
                  'Hexagon',
                  'Nonagon',
                  'Rectangle',
                  'Octagon',
                  'Parallelogram',
                  'Pentagon',
                  'Rhombus',
                  'Right-Angle',
                  'Septagon',
                  'Square',
                  'Triangle',
                  'Obtuse-Angle']);

java_script('lesson.js')
css('lesson.css')
