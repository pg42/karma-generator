css('global')
css('lesson.css')

footer_configuration(link_previous=False, link_next=False)

central_js_files = [
    'ui.core',
    'ui.draggable',
    'ui.droppable',
    'karma',
    '../../js/common.js']

for f in central_js_files:
    java_script(f)

java_script('lesson.js')


image('background.jpg')
