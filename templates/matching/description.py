css('global')
css('matching.css')

for f in ['karma', '../../js/common.js']:
    java_script(f)

java_script('matching.js')

def quote(x):
    return "'%s'" % x

objects_js = java_script('objects.js', generated=True)

def register_objects(objects):
    for object in objects:
        image(object + '.png', object)
    print >>objects_js, 'var objects = [' + ', '.join([quote(x) for x in objects]) + '];'

div(id='content')

footer_configuration(link_next=False, link_previous=False)
