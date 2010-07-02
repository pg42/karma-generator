# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='Numeric Puzzle',
       nepalese_title = u'सङ्ख्याको क्रम', week=1)

include('../../templates/puzzle/description.py')

for i in range(1, 4):
    image('img%s.png' % i, 'puzzle%s' % i)

java_script('label-generator.js')
