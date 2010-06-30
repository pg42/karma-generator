directory('2_English_matchingWordsAndObjects_23_K')

include('../../templates/matching/description.py')

title('English Matching Words and Objects')
lesson_title('Matching Words and Objects')

register_objects(['Apple',
                  'Bag',
                  'Banana',
                  'Cake',
                  'Coat',
                  'Cow',
                  'Elephant',
                  'Flower',
                  'Grapes',
                  'Monkey',
                  'Pigeon',
                  'Rat',
                  'Tomato',
                  'Tree', 
                  'Boat'])

java_script('lesson.js')
image('help', 'help.png', preload=False)
