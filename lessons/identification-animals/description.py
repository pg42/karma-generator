lesson(grade=2, subject='English', title='Animal Identification', week=8)

include('../../templates/identification/description.py')

java_script('configuration.js')

register_things(['cat', 'cow', 'deer', 'dog', 'elephant', 'horse', 'sheep'])
image('background', 'background.jpg', preload=False)
image('help', 'help.png', preload=False)
