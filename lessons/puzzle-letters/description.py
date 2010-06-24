directory('2_English_alphabetPuzzle_1_K')

include('../../templates/puzzle/description.py')

title('Class 2 English Alphabet Puzzle')
lesson_title('Alphabet Puzzle')

for i in range(1, 4):
    image('puzzle%s' % i, 'img%s.png' % i)

image('help', 'help.png', preload=False)

java_script('label-generator.js')
