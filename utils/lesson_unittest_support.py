import sys, unittest, time, re, os, codecs

from selenium import selenium

class KarmaLessonTestCase(unittest.TestCase):
    def set_deployed_dir(self, dir):
        self.deployed_dir = dir
        self.base_url = 'file://' + self.deployed_dir
        self.url = self.base_url + '/index.html?test=true'

    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium('localhost', 4444, '*chrome',
                                 self.base_url)
        self.selenium.start()

    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

    def assertScreenshotEquals(self, filename):
        # Kludge so that filename is relative to the test.py file from which
        # this function is called.
        import traceback
        unittest_file = traceback.extract_stack()[-2][0]
        dir = os.path.dirname(unittest_file)
        expected_filename = os.path.join(dir, filename)
        found_filename = os.path.splitext(expected_filename)[0] + '.found.png'
        expected = ''
        if os.path.isfile(expected_filename):
            f = open(expected_filename, 'rb')
            expected = f.read()
            f.close()
        found = self.selenium.capture_entire_page_screenshot_to_string('')
        import base64
        found = base64.b64decode(found)
        if expected != found:
            f = open(found_filename, 'wb')
            f.write(found)
            f.close()
            self.fail('The screenshots %s and %s differ.' % (expected_filename,
                                                             found_filename))


class KarmaTextTestResult(unittest._TextTestResult):
    def log_current_state(self, test, filename):
        dir = test.deployed_dir
        png = os.path.abspath(os.path.join(dir, filename + '.png'))
        html = os.path.abspath(os.path.join(dir, filename + '.html'))
        print 'ERROR. For more information, check out:'
        print '   ', png
        print '   ', html
        test.selenium.capture_entire_page_screenshot(png, '')
        f = codecs.open(html, 'w', 'UTF-8')
        print >>f, test.selenium.get_html_source()
        f.close()

    def addError(self, test, err):
        self.log_current_state(test, test.id() + '_error')
        unittest._TextTestResult.addError(self, test, err)

    def addFailure(self, test, err):
        self.log_current_state(test, test.id() + '_failure')
        unittest._TextTestResult.addFailure(self, test, err)


class KarmaTextTestRunner(unittest.TextTestRunner):
    def _makeResult(self):
        return KarmaTextTestResult(self.stream,
                                   self.descriptions,
                                   self.verbosity)

