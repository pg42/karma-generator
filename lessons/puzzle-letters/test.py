from lesson_unittest_support import KarmaLessonTestCase
import time

class Test(KarmaLessonTestCase):
    def swap_pieces(self, piece1, piece2):
        def piece_selector(id):
            return '//div[@id=\'%s\']' % id
        self.selenium.drag_and_drop_to_object(piece_selector(piece1),
                                              piece_selector(piece2))

    def test_test(self):
        self.selenium.open(self.url)
        self.swap_pieces('piece0', 'piece3')
        self.swap_pieces('piece1', 'piece10')
        self.swap_pieces('piece2', 'piece9')
        self.swap_pieces('piece3', 'piece14')
        self.swap_pieces('piece4', 'piece10')
        self.swap_pieces('piece5', 'piece13')
        self.swap_pieces('piece6', 'piece11')
        self.swap_pieces('piece7', 'piece12')
        self.swap_pieces('piece8', 'piece12')
        self.swap_pieces('piece9', 'piece14')
        self.swap_pieces('piece10', 'piece11')
        self.swap_pieces('piece11', 'piece15')
        self.swap_pieces('piece12', 'piece14')
        self.swap_pieces('piece13', 'piece14')
        for i in range(10):
            try:
                if self.selenium.is_visible("//img[@id='reward']"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
