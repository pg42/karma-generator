directory('2_English_animalIdentification_8_K')

title('Class 2 English Animal Identification')
lesson_title('Animal Identification')

include('../../templates/identification/description.py')

java_script('configuration.js')

register_things(['cat', 'cow', 'deer', 'dog', 'elephant', 'horse', 'sheep'])
image('background', 'background.jpg', preload=False)
