#! /usr/bin/env python2.6
# -*- coding: utf-8 -*-

from html import HtmlDocument, HtmlElement
import mo2js
import codecs
import os
import shutil
import string
import sys
import time
import fnmatch
from optparse import OptionParser
from kdoctemplate import k_doc_template

class KarmaFramework():
    def __init__(self, root_dir):
        self.root_dir = root_dir
        self.java_script_files = [
            self._karma_file('js/external/jquery-1.4.2.js', 'jquery'),
            self._karma_file('js/external/jquery-ui-1.8.2.js', 'jquery-ui'),
            self._karma_file('js/external/jquery.ui.core.js', 'ui.core'),
            self._karma_file('js/external/jquery.ui.mouse.js', 'ui.mouse'),
            self._karma_file('js/external/jquery.ui.widget.js', 'ui.widget'),
            self._karma_file('js/external/jquery.ui.position.js', 'ui.position'),
            self._karma_file('js/external/jquery.ui.draggable.js', 'ui.draggable'),
            self._karma_file('js/external/jquery.ui.droppable.js', 'ui.droppable'),
            self._karma_file('js/jquery.watermarkinput.js', 'jquery.watermarkinput'),
            self._karma_file('js/ui.scoreboard.js', 'ui.scoreboard'),
            self._karma_file('js/jquery.svg.js', 'jquery.svg'),
            self._karma_file('js/karma.js', 'karma'),
            self._karma_file('js/global.js', 'global'),
            self._karma_file('js/common.js', 'common'),
            self._karma_file('js/jquery.clickable.js', 'jquery.clickable'),
            self._karma_file('js/multiple-choice.js', 'multiple-choice'),
            self._karma_file('js/clock.js', 'clock'),
            self._karma_file('js/jquery.i18n.js', 'i18n'),
            self._karma_file('js/jquery.strings.js', 'jquery.strings'),
            self._karma_file('js/jquery.keyfilter.js', 'jquery.keyfilter'),
            self._karma_file('js/kStart.js', 'kstart')
            ]
        self.css_files = [
            self._karma_file('css/global.css', 'global'),
            self._karma_file('css/ui.scoreboard.css', 'ui.scoreboard'),
            self._karma_file('css/kStart.css', 'kstart')
            ]
        self.audio_files = [
            self._karma_file('audio/en_correct.ogg', 'correct'),
            self._karma_file('audio/en_incorrect.ogg', 'incorrect'),
            self._karma_file('audio/ne_correct.ogg', 'ne_correct'),
            self._karma_file('audio/ne_incorrect.ogg', 'ne_incorrect'),
            self._karma_file('audio/byebye.ogg', 'byebye'),
            self._karma_file('audio/trigger.ogg', 'trigger')
            ]
        self.image_files = [
            self._karma_file('image/title_block_lt.png', 'title_block_lt'),
            self._karma_file('image/title_block_rt.png', 'title_block_rt'),
            self._karma_file('image/favicon.ico', 'favicon')
            ]

    def _karma_file(self, path, name, **kw):
        kw['karma_root'] = self.root_dir
        return KarmaFile(path, name, **kw)

    def _find_file(self, name, files):
        for f in files:
            if f.name() == name:
                return f
        return None

    def java_script(self, name):
        return self._find_file(name, self.java_script_files)

    def css(self, name):
        return self._find_file(name, self.css_files)

    def audio(self, name):
        return self._find_file(name, self.audio_files)

    def image(self, name):
        return self._find_file(name, self.image_files)


argv0 = sys.argv[0]
now = time.strftime("%Y/%m/%d %H:%M:%S", time.localtime())
warning_text_lines = ['This file was generated by %s on %s.' % (argv0, now),
                      'Do not edit.',
                      'cwd: %s' % os.getcwd(),
                      'command: %s' % ' '.join(sys.argv)]


theLesson = None

include_stack = []
script_root = os.path.abspath(os.path.dirname(argv0))


class File():
    _name = None
    src = ''
    lesson_deploy = True
    create_file = False
    data = ''

    def to_string(self):
        print 'name:', self._name
        print 'src:', self.src
        print 'lesson_deploy:', self.lesson_deploy
        print 'create_file:', self.create_file
        print 'data:', self.data
        print

    def __init__(self, path, name=None, **kw):
        self._name = name
        self.src = path

        if 'karma' in kw and kw['karma']:
            self.lesson_deploy = False
        if 'generated' in kw and kw['generated']:
            self.create_file = True

        if not self.create_file:
            # find the existing file
            test_files = []
            if self.lesson_deploy:
                test_files.append(os.path.join(theLesson.src_directory, path))
            if len(include_stack) > 0:
                test_files.append(os.path.join(os.path.dirname(include_stack[-1]), path))
            if 'karma_root' in kw:
                test_files.append(os.path.join(kw['karma_root'], path))

            for f in test_files:
                abs_path = os.path.abspath(f)
                if os.path.isfile(abs_path):
                     self.src = abs_path
        else:
            self.src = self._absolute_path()

    def _deploy_folder(self):
        return os.path.abspath(theLesson.directory)

    def name(self):
        return self._name

    # only applicable for assets
    def preload(self):
        return self._name != None

    def _src_path(self):
        return self.src

    def relative_path(self, start=None, **kw):
        if start == None or start == '':
            # default relative is to lesson output
            start = theLesson.directory
        elif start == 'deploy':
            start = self._deploy_folder()

        rel_path = os.path.relpath(self._absolute_path(), start)
        if 'web' in kw and kw['web']:
            rel_path = string.replace(rel_path, '\\', '/')

        return rel_path

    def _absolute_path(self):
        if self.lesson_deploy:
            return os.path.join(self._deploy_folder(), self._basename())
        else:
            return self.src

    def _basename(self):
        return os.path.basename(self.src)

    def make_available(self):
        if self.create_file:
            f = open(self._absolute_path(), 'w')
            print >>f, self.data
            f.close()
        elif self.lesson_deploy:
            check_file_exists(self._src_path())
            shutil.copy(self._src_path(), self._absolute_path())

    # only applicable for generated files
    def write(self, x):
        self.data = self.data + x


class KarmaFile(File):
    def __init__(self, path, name=None, **kw):
        kw['karma'] = True
        File.__init__(self, path, name, **kw)


java_script_dependencies = [
    ('effects.core', 'effects.blind'),
    ('effects.core', 'effects.bounce'),
    ('effects.core', 'effects.clip'),
    ('effects.core', 'effects.drop'),
    ('effects.core', 'effects.explode'),
    ('effects.core', 'effects.fold'),
    ('effects.core', 'effects.highlight'),
    ('effects.core', 'effects.pulsate'),
    ('effects.core', 'effects.scale'),
    ('effects.core', 'effects.shake'),
    ('effects.core', 'effects.slide'),
    ('effects.core', 'effects.transfer'),
    ('ui.core', 'ui.accordion'),
    ('ui.widget', 'ui.accordion'),
    ('ui.core', 'ui.autocomplete'),
    ('ui.widget', 'ui.autocomplete'),
    ('ui.position', 'ui.autocomplete'),
    ('ui.core', 'ui.button'),
    ('ui.widget', 'ui.button'),
    ('ui.core', 'ui.datepicker'),
    ('ui.core', 'ui.dialog'),
    ('ui.widget', 'ui.dialog'),
    ('ui.button', 'ui.dialog'),
    ('ui.draggable', 'ui.dialog'),
    ('ui.mouse', 'ui.dialog'),
    ('ui.position', 'ui.dialog'),
    ('ui.resizable', 'ui.dialog'),
    ('ui.core', 'ui.draggable'),
    ('ui.mouse', 'ui.draggable'),
    ('ui.widget', 'ui.draggable'),
    ('ui.core', 'ui.droppable'),
    ('ui.widget', 'ui.droppable'),
    ('ui.mouse', 'ui.droppable'),
    ('ui.draggable', 'ui.droppable'),
    ('ui.widget', 'ui.mouse'),
    ('ui.core', 'ui.progressbar'),
    ('ui.widget', 'ui.progressbar'),
    ('ui.core', 'ui.resizable'),
    ('ui.mouse', 'ui.resizable'),
    ('ui.widget', 'ui.resizable'),
    ('ui.core', 'ui.selectable'),
    ('ui.mouse', 'ui.selectable'),
    ('ui.widget', 'ui.selectable'),
    ('ui.core', 'ui.slider'),
    ('ui.mouse', 'ui.slider'),
    ('ui.widget', 'ui.slider'),
    ('ui.core', 'ui.sortable'),
    ('ui.mouse', 'ui.sortable'),
    ('ui.widget', 'ui.sortable'),
    ('ui.core', 'ui.tabs'),
    ('ui.widget', 'ui.tabs'),
    # old stuff
    ('jquery', 'jquery-ui'),
    ('jquery', 'jquery.watermarkinput'),
    ('jquery', 'jquery.clickable'),
    ('ui.core', 'ui.scoreboard'),
    ('jquery-ui', 'ui.scoreboard'),
    ('jquery', 'jquery.svg'),
    ('karma', 'common'),
    ('common', 'multiple-choice'),
    ('common', 'clock'),
    ('jquery', 'clock'),
    ('jquery', 'i18n')
    ]

#TBD: factor this out in a separate file, so it is easy to provide
#     your own header/footer
#TBD: make header/footer customizable
def generate_header(karma, dir, body, title):
    header = body.div(id='header')

    header.div(id='topbtn_left').div(id='linkBackLesson',
                                     title='Back',
                                     className='linkBack')

    lesson_title = header.div(id='lesson_title')
    lesson_title.img(src=karma.image('title_block_lt').relative_path(dir, web=True),
                     width=33, height=75, align='absmiddle')
    lesson_title.text(title)
    lesson_title.img(src=karma.image('title_block_rt').relative_path(dir, web=True),
             width=33, height=75, align='absmiddle')


    header.div(className='topbtn_right').div(title='Help', id='linkHelp')

    header.div(className='topbtn_right').div(title=u'साझा शिक्षा ई-पाटी द्वारा निर्मित',
                                             id='linkOle')


def generate_footer(body):
    footer = body.div(id='footer')

    config = theLesson.footer_configuration

    if config['link_next']:
        footer.div(title='Next', id='linkNextLesson', className='linkNext')
    if config['link_previous']:
        footer.div(title='Previous', id='linkPrevLesson', className='linkBack')
    if config['scoreboard']:
        footer.div(id='score_box', display='none')

    footer.div(className='botbtn_right').div(title='Play Again', id='linkPlayAgain')

    if config['link_check_answer']:
        footer.div(className='botbtn_right').div(title='Check Answer', id='linkCheck')


def topological_sort(nodes, dependencies, key):
    """Sort nodes topologically according to dependencies.
    A dependency is a tuple (key(earlier_node), key(later_node)),
    meaning that earlier_node should come before later_node in the
    result."""
    from collections import deque
    successors = {}
    predecessor_count = {}
    node_map = {}
    for node in nodes:
        k = key(node)
        node_map[k] = node
        successors[k] = []
        predecessor_count[k] = 0
    for (dep0, dep1) in dependencies:
        if dep0 in node_map and dep1 in node_map:
            successors[dep0].append(dep1)
            predecessor_count[dep1] = predecessor_count[dep1] + 1
    next = deque()
    for k,v in successors.items():
        if predecessor_count[k] == 0:
            next.append(k)
    result = []
    while len(next) != 0:
        k = next.popleft()
        result.append(node_map[k])
        for successor in successors[k]:
            predecessor_count[successor] = predecessor_count[successor] - 1
            if predecessor_count[successor] == 0:
                next.append(successor)
    if len(result) != len(nodes):
        print 'Error: dependency loop.'
        sys.exit(1)
    return result


def include_dependencies(karma, files):
    result = []
    visited = set()
    deps = {}
    for dep in java_script_dependencies:
        deps[dep[1]] = deps.setdefault(dep[1], []) + [dep[0]]
    js_files = {}
    for f in karma.java_script_files:
        js_files[f.name()] = f
    def add_dependencies(list):
        for x in list:
            if x not in visited:
                add_dependencies([js_files[name] for name
                                  in deps.setdefault(x.name(), [])])
                result.append(x)
                visited.add(x)
    add_dependencies(files)
    return result

def sort_java_script_files(files):
    karma_files = filter(lambda x: isinstance(x, KarmaFile), files)
    other_files = filter(lambda x: not isinstance(x, KarmaFile), files)
    result = topological_sort(karma_files,
                              java_script_dependencies,
                              lambda x: x.name()) + other_files
    return result


def createDiv(id):
    return HtmlElement('div', True).attr(id=id)

class Lesson():
    def __init__(self, src_directory):
        self.src_directory = src_directory
        self.parent_directory = ''
        self.directory = ''
        self.title = ''
        self.lesson_title = ''
        self._grade = None;
        self._subject = '';
        self._week = None
        self.summary = '';
        self.java_script_files = []
        self.css_files = []
        self.image_files = []
        self.audio_files = []
        self.divs = [createDiv('content')]
        self.footer_configuration = dict(link_previous=True,
                                         link_next=True,
                                         scoreboard=False,
                                         link_check_answer=False)

    def grade(self):
        return self._grade

    def subject(self):
        return self._subject

    def week(self):
        return self._week

    def copy_files(self):
        def create_dir(d):
            if not os.path.exists(d):
                os.makedirs(d)
        create_dir(self.directory)
        os.chdir(self.directory)
#        map(create_dir, ['css', 'js', 'js/locale', 'assets/image', 'assets/audio', 'assets/video'])

        for f in self.java_script_files + self.css_files:
            f.make_available()
        for f in self.image_files + self.audio_files:
            f[1].make_available()

        def copy_required(f):
            src = os.path.join(self.src_directory, f)
            if (os.path.exists(src)):
                shutil.copy(src, self.directory)
            else:
                print 'Warning: missing ' + src

        for f in ['teachersNote.html',
                  'thumbnail.jpg']:
            copy_required(f)
        # if a screenshot.jpg exists in the source, copy it to the dest
        screenshot_img = os.path.join(self.src_directory, 'screenshot.jpg')
        if (os.path.exists(screenshot_img)):
            shutil.copy(screenshot_img, os.path.join(self.directory, 'screenshot.jpg'))

        self.compile_translations()

    def name(self):
        return self.deploy_name()

    def deploy_name(self):
        return os.path.basename(self.directory)

    def generate(self):
        print 'writing lesson to ' + self.deploy_name()
        self.copy_files()
        self.print_html_on(codecs.open('index.html', 'w', 'UTF-8'))
        self.print_start_html_on(codecs.open('start.html', 'w', 'UTF-8'))
        self.print_kdoc_html_on(codecs.open('kDoc.html', 'w', 'UTF-8'))
        self.print_karma_js_on(open('lesson-karma.js', 'w'))

    def compile_translations(self):
        # compile translation JS files from MO files
        for srcfile in os.listdir(self.src_directory):
            if fnmatch.fnmatch(srcfile, '*.mo'):
                lang = os.path.splitext(srcfile)[0]
                srcpath = os.path.join(self.src_directory, srcfile)
                targpath = os.path.join(self.directory, lang +'.js')
                json_translations = mo2js.gettext_json(open(srcpath, 'r'), True)

                f = codecs.open(targpath, encoding='utf-8', mode='w+')
                f.write('$.i18n.storeLocaleStrings("%s",\n' % lang);
                f.write(json_translations)
                f.write(');\n');
                f.write('$.i18n.setLocale("%s");\n' % lang);

    def set_directory(self, dir):
        self.directory = os.path.abspath(os.path.join(self.parent_directory, dir))

    def print_start_html_on(self, stream):
        doc = HtmlDocument()
        html = doc.html()
        head = html.head()
        html.title().text(self.lesson_title)
        head.meta(content='text/html, charset=utf-8', httpEquiv='Content-Type')
        head.link(type='image/ico',
                  rel='icon',
                  href=self.karma.image('favicon').relative_path(None, web=True))
        head.link(type='text/css',
                  rel='stylesheet',
                  href=self.karma.css('kstart').relative_path(None, web=True))
        for f in [self.karma.java_script('jquery'),
                  self.karma.java_script('kstart')]:
            head.script(type='text/javascript',
                        src=f.relative_path(None, web=True))

        displayGrade = u'०१२३४५६७८९'[self.grade()];
        displaySubject = {'English':'English', 'Maths':u'गणित', 'Nepali':u'नेपाली' }[self.subject()];

        body = html.body(id='kStart')

        top = body.div(id='top')
        top.div(id='backBtn', title='Back')
        top_middle = top.div(id='topMiddle')
        top_middle.div(id='topDesc', className='center').text(u'साझा शिक्षा ई-पाटीद्वारा निर्मित')
        top_middle.div(id='topE-Paath', className='center').text(u'ई-पाठ')

        middle = body.div(id='middle')
        grade = middle.div(id='grade', className='center')
        grade.span(id='gradeText').text(u'कक्षा:')
        grade.span(id='gradeNum').text(displayGrade)
        middle.div(id='subject', className='center').text(displaySubject)
        lesson_title = middle.div(id='lessonTitle', className='center')
        lesson_title.a(href='./index.html').text(self.start_title)
        middle.div(id='lessonDesc', className='center').text(self.summary)
        note = middle.div(id='teachersNoteBtn', className='button')
        a = note.a(href='./kDoc.html?back=start.html&doc=teachersNote')
        a.div().text(u'Teacher\'s Note')
        a.div().text(u'पाठविवरण')

        bottom = body.div(id='bottom')
        bottom.div(id='logo',
                   title=u'साझा शिक्षा ई-पाटी द्वारा निर्मित')

        body.div(id='logoHelp')

        doc.print_on(stream)

    def print_kdoc_html_on(self, stream):
        karma_dir = os.path.relpath(self.karma.root_dir, self.directory)
        print >>stream, k_doc_template.format(karma_dir=karma_dir,
                                              subject=unicode(self.subject()),
                                              title=unicode(self.title));

    def print_html_on(self, stream):
        doc = HtmlDocument()
        for line in warning_text_lines:
            doc.comment(string.replace(line, '--', '__'))
        html = doc.html()
        head = html.head()
        head.title().text(self.title)
        head.meta(content='text/html, charset=utf-8', httpEquiv='Content-Type')
        for file in self.css_files:
            head.link(type='text/css',
                      rel='stylesheet',
                      href=file.relative_path(None, web=True))
        head.link(type='image/ico',
                  rel='icon',
                  href=self.karma.image('favicon').relative_path(None, web=True))
        all_java_script_files = include_dependencies(self.karma,
                                                     self.java_script_files)
        for file in sort_java_script_files(all_java_script_files):
            head.script(type='text/javascript',
                        src=file.relative_path(None, web=True))
        body = html.body()
        generate_header(self.karma, self.directory, body, self.lesson_title)
        body.children.extend(self.divs)
        generate_footer(body)
        doc.print_on(stream)

    def print_karma_js_on(self, stream):
        print >>stream, '/*'
        for l in warning_text_lines:
            print >>stream, ' *', l
        print >>stream, ' */'
        def format_image(img):
            return "{name:'%s', file:'%s'}" % (img[0], img[1].relative_path('deploy', web=True))
        def format_audio(a):
            return "{name:'%s', file:'%s'}" % (a[0], a[1].relative_path('deploy', web=True))
        def format_assets(name, assets, format_asset, indentation):
            prefix = '%s: [' % name
            sep = ',\n' + (len(prefix) + indentation) * ' '
            postfix = ']'
            to_preload = filter(lambda asset: asset[1].preload(), assets)
            return prefix + sep.join(map(format_asset, to_preload)) + postfix
        print >>stream, 'function lesson_karma() {'
        return_karma = '    return Karma({'
        indentation = len(return_karma)
        print >>stream, return_karma + (',\n' + indentation * ' ').join(
            [format_assets('image',
                           self.image_files,
                           format_image,
                           indentation),
             format_assets('audio',
                           self.audio_files,
                           format_audio,
                           indentation)]) + '});'
        print >>stream, '}'

def lesson(grade, subject, title, week, browser_title=None, lesson_title=None, locale=None, summary=''):
    def camelcase(str):
        words = str.replace("'", '').split()
        return ''.join([words[0].lower()] + [x.capitalize() for x in words[1:]])

    dirname = '%s_%s_%s_%s_K' % (grade, subject, camelcase(title), week);
    theLesson.set_directory(dirname)
    theLesson.start_title = title
    theLesson.title = browser_title or 'Class %s %s %s' % (grade, subject, title)
    theLesson.lesson_title = lesson_title or title
    theLesson._grade = grade
    theLesson._subject = subject
    theLesson._week = week
    theLesson.summary = summary
    java_script('jquery')
    java_script('karma')
    java_script('common')
    java_script('i18n')
    # include the lesson.js if it exists
    lesson_js = frob_path('lesson.js')
    if os.path.exists(lesson_js):
        java_script('lesson.js')
    add_help()
    # include the locale strings too

    if locale != None:
        theLesson.java_script_files.append(File('jquery.i18n.'+ locale +'.js', type='js', karma=True))

        locale_mo = frob_path(locale + '.mo')
        if os.path.exists(locale_mo):
            targpath = os.path.join(theLesson.directory, locale +'.js')
            theLesson.java_script_files.append(File(targpath, None, type='js', karma=True))


def java_script(name, **kw):
    result = theLesson.karma.java_script(name)
    if not result:
        result = File(name, name, **kw)
    if name in [f.name() for f in theLesson.java_script_files]:
        print 'Warning: the java_script file \'' + name + '\' is included twice.'
    else:
        theLesson.java_script_files.append(result)
    return result


def css(name):
    result = theLesson.karma.css(name)
    if not result:
        result = File(name, name)
    theLesson.css_files.append(result)
    return result


def image(file, name=None):
    result = None
    if name == None:
        name = file
        result = theLesson.karma.image(name)
    if not result:
        result = File(file, name)
    theLesson.image_files.append([name, result])
    return result


def audio(file, name=None):
    result = None
    if name == None:
        name = file
        result = theLesson.karma.audio(name)
    if not result:
        result = File(file, name)
    theLesson.audio_files.append([name, result])
    return result


def div(**info):
    if 'id' in info and info['id'] == 'content':
        print 'Warning: div(id=\'content\') no longer needed (it\'s added automatically).'
        return None
    result = createDiv(info['id'])
    theLesson.divs.append(result)
    return result


def footer_configuration(**kw):
    global theLesson
    config = theLesson.footer_configuration
    for k,v in kw.items():
        if not k in config:
            print 'Error: unsupported footer configuration option: ' + k + '.'
            print 'Possible options:', ', '.join(config.keys())
            sys.exit(1)
        config[k] = v
    if config['scoreboard']:
        css('ui.scoreboard')
        java_script('ui.scoreboard')


def frob_path(path):
    if not os.path.isabs(path):
        return os.path.normpath(os.path.join(os.path.dirname(include_stack[-1]),
                                             path))
    else:
        return os.path.abspath(path)


def include(path):
    path = frob_path(path)
    include_stack.append(path)
    check_file_exists(path)
    execfile(path, globals())
    include_stack.pop()


def add_help():
    # add html help content if it exists, otherwise the help image
    help_html = frob_path('help.html')
    help_img = frob_path('help.png')
    if (os.path.exists(help_html)):
        f = codecs.open(help_html, 'r', 'UTF-8')
        div(id='help').div(id='helpText').innerhtml(f.read())
    elif (os.path.exists(help_img)):
        img = image(help_img, 'help')
        src = img.relative_path(None, web=True)
        div(id='help').img(src=src)
    else:
        print 'Warning: the file ' + str(help_path) + ' doesn\'t exist.'


def check_file_exists(path):
    if not os.path.isfile(path):
        print 'Error: the file ' + path + ' doesn\'t exist.'
        sys.exit(1)


def find_all_description_files():
    result = []
    lesson_folder = os.path.join(script_root, 'lessons')
    for root, dirs, files in os.walk(lesson_folder):
        if 'description.py' in files:
            result.append(os.path.abspath(os.path.join(script_root, root, 'description.py')))
    return result


def constantly(x):
    return lambda y: x


def process_description(karma, description, output_dir,
                        lesson_filter=constantly(True)):
    os.chdir(script_root)
    description = os.path.abspath(description)

    global theLesson
    theLesson = Lesson(os.path.abspath(os.path.dirname(description)))
    theLesson.karma = karma
    theLesson.parent_directory = os.path.abspath(output_dir)
    theLesson.java_script_files.append(File('lesson-karma.js', None,
                                            generated=True))

    include_stack.append(description)
    check_file_exists(description)
    execfile(description, globals())
    include_stack.pop()

    if lesson_filter(theLesson):
        theLesson.generate()
        return theLesson
    else:
        return None


# Called from build.py
def deploy_lessons(karma_root, output_dir, grades, subjects, first_week,
                   last_week):
    def filter(lesson):
        if not lesson.grade() in grades:
            return False
        if not lesson.subject() in subjects:
            return False
        if lesson.week() < first_week or last_week < lesson.week():
            return False
        return True
    lessons = []
    karma = KarmaFramework(os.path.abspath(karma_root))
    for description in find_all_description_files():
        lesson = process_description(karma, description, output_dir, filter)
        if lesson:
            lessons.append(lesson)
    return [lesson.deploy_name() for lesson in lessons]

# Called from new build.py
def deploy_lessons_new(karma_root, output_dir, filter):
    result = []
    karma = KarmaFramework(os.path.abspath(karma_root))
    for description in find_all_description_files():
        lesson = process_description(karma, description, output_dir, filter)
        if lesson:
            result.append(lesson)
    return result


def run_unit_tests(lessons):
    print '-------------- Running unit tests ----------------'
    os.chdir(script_root)
    import unittest
    sys.path.extend(['utils', 'utils/selenium-python-client-driver-1.0.1'])
    import lesson_unittest_support
    main_suite = unittest.TestSuite()
    for lesson in lessons:
        test_py = os.path.join(lesson.src_directory, 'test.py')
        if os.path.isfile(test_py):
            globals = {}
            execfile(os.path.join(test_py), globals)
            Test = globals['Test']
            suite = unittest.defaultTestLoader.loadTestsFromTestCase(Test)
            for test in suite._tests:
                test.set_deployed_dir(lesson.directory)
            main_suite.addTest(suite)
    lesson_unittest_support.KarmaTextTestRunner().run(main_suite)


if __name__ == '__main__':
    parser = OptionParser(usage="Usage: %prog [options] file")
    parser.add_option('-o', '--output', dest='output',
                      default=os.path.join(script_root, 'deploy', 'Activities'),
                      help='use output as a destination directory')
    parser.add_option('-a', '--all', dest='all', action='store_true',
                      help='generate all lessons/*/description.py definitions')
    parser.add_option('-t', '--test', dest='run_tests', action='store_true',
                      help='run the unit tests after generating the lessons (requires that you started the selenium server beforehand: java -jar selenium-server.jar)')
    (options, args) = parser.parse_args()

    if not args and not options.all:
        print 'Specify a file as an argument.'
        parser.print_help()
        sys.exit(1)

    process_descriptions = []
    if options.all:
        process_descriptions = find_all_description_files()
    else:
        process_descriptions.append(args[0])

    karma = KarmaFramework(os.path.abspath(os.path.join(os.path.dirname(argv0),
                                                        'deploy',
                                                        'karma')))
    lessons = []
    for description in process_descriptions:
        lessons.append(process_description(karma, description, options.output))
    if options.run_tests:
        run_unit_tests(lessons)
