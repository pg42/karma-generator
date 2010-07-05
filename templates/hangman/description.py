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

for i in range(0, 4):
    hangi = 'hang' + str(i)
    image(hangi + '.png', hangi)

footer_configuration(link_next=True, link_previous=False, scoreboard=True)
