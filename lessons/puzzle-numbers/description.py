# -*- coding: utf-8 -*-

directory('2_Maths_numericPuzzle_1_K')

include('../../templates/puzzle/description.py')

title('Class 2 Maths Numeric Puzzle')
lesson_title(u'सङ्ख्याको क्रम')

for i in range(1, 4):
    image('puzzle%s' % i, 'img%s.png' % i)

image('help', 'help.png', preload=False)

java_script('label-generator.js')
