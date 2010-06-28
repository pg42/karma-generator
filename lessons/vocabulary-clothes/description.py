include('../../templates/vocabulary/description.py')

directory('2_English_vocabularyClothes_15_K')

title('Class 2 English Vocabulary Clothes')
lesson_title('Vocabulary Clothes')

items = [
    dict(name='cap', left = 138, top = 290, width = 85),
    dict(name='shirt', left = 387, top = 285, width = 110),
    dict(name='coat', left = 650, top = 287, width = 100),
    dict(name='dress', left = 906, top = 287, width = 120), # TBD: doesn't look like a dress to me 
    dict(name='skirt', left = 120, top = 553, width = 120),
    dict(name='gloves', left = 372, top = 553, width = 134),
    dict(name='socks', left = 639, top = 553, width = 120),
    dict(name='shoes', left = 900, top = 553, width = 124)]

register_objects(items)

image('vocabImg', 'vocabImg.jpg', preload=False)
