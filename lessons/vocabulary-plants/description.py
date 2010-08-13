# -*- coding: utf-8 -*-
lesson(grade=2, subject='English', title='Vocabulary Plants', week=17,
       summary=u'बोटबिरूवाका अङ्गका नामहरू सिकाउने क्रियाकलाप')

include('../../templates/vocabulary/description.py')

animals = [
    dict(name='leaf', left=175, top=69, width=110),
    dict(name='branch', left=953, top=130, width=160),
    dict(name='fruit', left=132, top=190, width=115),
    dict(name='tree', left=470, top=217, width=110),
    dict(name='bush', left=169, top=340, width=125),
    dict(name='flower', left=865, top=340, width=145),
    dict(name='grass', left=260, top=605, width=140),
    dict(name='plant', left=580, top=585, width=140)]

register_objects(animals)

image('vocabImg.jpg')
