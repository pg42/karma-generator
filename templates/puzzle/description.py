css('global')
css('lesson.css')

footer_configuration(link_previous=False, link_next=False)

central_js_files = [
    'jquery',
    'ui.core',
    'ui.draggable',
    'ui.droppable',
    'karma',
    'global']

for f in central_js_files:
    java_script(f)

java_script('lesson.js')

div(id='content')
div(id='help')

image('background', 'background.jpg', preload=False)
