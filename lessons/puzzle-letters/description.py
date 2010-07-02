lesson(grade=2, subject='English', title='Alphabet Puzzle', week=1)

include('../../templates/puzzle/description.py')

for i in range(1, 4):
    image('img%s.png' % i, 'puzzle%s' % i)

java_script('label-generator.js')
