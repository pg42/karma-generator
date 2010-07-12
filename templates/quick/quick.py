# -*- coding: utf-8 -*-

css('global')
css('lesson.css')

central_js_files = [
    'ui.core',
    'ui.draggable',
    'ui.droppable',
    'karma',
    '../../js/common.js']

for f in central_js_files:
    java_script(f)

java_script('quick.js')
java_script('init.js')
lesson_js = java_script('lesson.js', generated=True)

div(id='content')

def totalQues(num):
    print >>lesson_js, "var TOTAL_QUES = "+ str(num)+";"
    
def set_type(lessonType):
    print >>lesson_js, "var LESSON_TYPE = '"+ lessonType + "';"
    if(lessonType=="div"):
        print >>lesson_js, "var SIGN = ' ÷ ';"
    else:
        print >>lesson_js, "var SIGN = ' + ';"

for x in ['tv','borderWall','cupBoard']:
	image(x+'.png');

for x in ['correct', 'incorrect']:
    audio(x + '.ogg', x)
