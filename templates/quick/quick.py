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

for x in ['tv','borderWall','cupBoard']:
	image(x+'.png');

for x in ['correct', 'incorrect']:
    audio(x + '.ogg', x)
    
    
def totalQues(num):
    print >>lesson_js, "var TOTAL_QUES = "+ str(num)

