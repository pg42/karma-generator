include('../../templates/vocabulary/description.py')

directory('2_English_vocabularyDomesticAnimals_4_K')

title('Class 2 English Vocabulary Domestic Animals')
lesson_title('Domestic Animals')

items = [
    dict(name='cow', left = 545, top = 295, width = 100),
    dict(name='goat', left = 5, top = 363, width = 115),
    dict(name='sheep', left = 270, top = 373, width = 148),
    dict(name='pig', left = 810, top = 353, width = 90),
    dict(name='cock', left = 550, top = 400, width = 118),
    dict(name='horse', left = 180, top = 560, width = 134),
    dict(name='duck', left = 735, top = 590, width = 118),
    dict(name='rabbit', left = 990, top = 505, width = 150)]

register_objects(items)

image('vocabImg', 'vocabImg.jpg', preload=False)
image('help', 'help.png', preload=False)
