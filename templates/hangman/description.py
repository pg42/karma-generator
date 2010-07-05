css('global')

central_js_files = [
    'ui.core',
    'karma',
    '../../js/common.js'
    ]

for f in central_js_files:
    java_script(f)

java_script('hangman.js')
css('hangman.css')

div(id='content')

nr_of_tries_js = java_script('number_of_tries.js', generated=True)

def set_number_of_tries(n):
    for i in range(0, n + 1):
        hangi = 'hang' + str(i)
        image(hangi + '.png', hangi)
    print >>nr_of_tries_js, 'var number_of_tries = %s;' % n

footer_configuration(link_next=True, link_previous=False, scoreboard=True)
