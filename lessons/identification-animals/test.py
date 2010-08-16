from lesson_unittest_support import KarmaLessonTestCase
import time

class Test(KarmaLessonTestCase):
    def select_option(self, i):
        locator = '//div[@id=\'optionSection\']/div[%s]' % i
        self.selenium.click(locator);
        time.sleep(1)

    def test_test(self):
        self.selenium.open(self.url)
        correct_options = [3, 1, 4, 1, 3, 2, 4]
        for option in correct_options:
            self.select_option(option)
        self.assertTrue(self.selenium.is_visible("//div[@id='gameOver']"))
