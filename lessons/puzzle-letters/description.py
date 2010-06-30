lesson(grade=2, subject='English', title='Alphabet Puzzle', week=1)

include('../../templates/puzzle/description.py')

for i in range(1, 4):
    image('puzzle%s' % i, 'img%s.png' % i)

image('help', 'help.png', preload=False)

java_script('label-generator.js')
