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


argv0 = sys.argv[0]
now = time.strftime("%Y/%m/%d %H:%M:%S", time.localtime())
warning_text_lines = ['This file was generated by %s on %s.' % (argv0, now),
                      'Do not edit.',
                      'cwd: %s' % os.getcwd(),
                      'command: %s' % ' '.join(sys.argv)]


debug = True # TBD: doesn't do anything yet
theLesson = None

# TBD: provide a debug and optimized (minimized) version of the framework files.

include_stack = []
script_root = os.path.abspath(os.path.dirname(argv0))
karma_root = os.path.abspath(os.path.join(os.path.dirname(argv0), 'deploy', 'karma'))
lesson_src = '';
lesson_dest = '';


class File():
    _name = None
    src = ''
    deploy_subfolder = ''
    lesson_deploy = True
    create_file = False
    data = ''

    def to_string(self):
        print 'name:', self._name
        print 'src:', self.src
        print 'deploy_subfolder:', self.deploy_subfolder
        print 'lesson_deploy:', self.lesson_deploy
        print 'create_file:', self.create_file
        print 'data:', self.data
        print

    def __init__(self, path, name=None, **kw):
        self._name = name
        self.src = path

        if 'type' in kw:
            self.deploy_subfolder = kw['type']
            if kw['type'] == 'image' or kw['type'] == 'audio':
                self.deploy_subfolder = 'assets/' + self.deploy_subfolder

        if 'karma' in kw and kw['karma']:
            self.lesson_deploy = False
        if 'generated' in kw and kw['generated']:
            self.create_file = True

        if not self.create_file:
            # find the existing file
            test_files = []
            if self.lesson_deploy:
                test_files.append( os.path.join(lesson_src, self.deploy_subfolder, path) )
                test_files.append( os.path.join(lesson_src, path) )
            if len(include_stack) > 0:
                test_files.append( os.path.join(os.path.dirname(include_stack[-1]), path) )
            test_files.append( os.path.join(karma_root, path) )

            for f in test_files:
                abs_path = os.path.abspath(f)
                if os.path.isfile(abs_path):
                     self.src = abs_path
        else:
            self.src = self.absolute_path()

    def deploy_folder(self):
        return os.path.abspath( os.path.join(lesson_dest, self.deploy_subfolder) )

    def name(self):
        return self._name

    def preload(self):
        return self._name != None

    def src_path(self):
        return self.src

    def relative_path(self, start=None, **kw):
        if start == None or start == '':
            # default relative is to lesson output
            start = lesson_dest
        elif start == 'deploy':
            start = self.deploy_folder()

        rel_path = os.path.relpath(self.absolute_path(), start)
        if 'web' in kw and kw['web']:
            rel_path = string.replace(rel_path, '\\', '/')

        return rel_path

    def absolute_path(self):
        if self.lesson_deploy:
            return os.path.join(
                self.deploy_folder(),
                self.basename()
            )
        else:
            return self.src

    def basename(self):
        return os.path.basename(self.src)

    def make_available(self):
        if self.create_file:
            f = open(self.absolute_path(), 'w')
            print >>f, self.data
            f.close()
        elif self.lesson_deploy:
            check_file_exists(self.src_path())
            shutil.copy(self.src_path(), self.absolute_path())

    def write(self, x):
        self.data = self.data + x


class GeneratedFile(File):
    def __init__(self, path, name=None, **kw):
        kw['generated'] = True
        File.__init__(self, path, name, **kw)

class KarmaFile(File):
    def __init__(self, path, name=None, **kw):
        kw['karma'] = True
        File.__init__(self, path, name, **kw)

class ImageFile(File):
    def __init__(self, path, name=None, **kw):
        kw['type'] = 'image'
        File.__init__(self, path, name, **kw)

class AudioFile(File):
    def __init__(self, path, name=None, **kw):
        kw['type'] = 'audio'
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

karma_java_script_files = [
    KarmaFile('js/external/jquery-1.4.2.js', 'jquery'),
    KarmaFile('js/external/jquery-ui-1.8.2.js', 'jquery-ui'),
    KarmaFile('js/external/jquery.ui.core.js', 'ui.core'),
    KarmaFile('js/external/jquery.ui.mouse.js', 'ui.mouse'),
    KarmaFile('js/external/jquery.ui.widget.js', 'ui.widget'),
    KarmaFile('js/external/jquery.ui.position.js', 'ui.position'),
    KarmaFile('js/external/jquery.ui.draggable.js', 'ui.draggable'),
    KarmaFile('js/external/jquery.ui.droppable.js', 'ui.droppable'),
    KarmaFile('js/jquery.watermarkinput.js', 'jquery.watermarkinput'),
    KarmaFile('js/ui.scoreboard.js', 'ui.scoreboard'),
    KarmaFile('js/jquery.svg.js', 'jquery.svg'),
    KarmaFile('js/karma.js', 'karma'),
    KarmaFile('js/global.js', 'global'),
    KarmaFile('js/common.js', 'common'),
    KarmaFile('js/jquery.clickable.js', 'jquery.clickable'),
    KarmaFile('js/multiple-choice.js', 'multiple-choice'),
    KarmaFile('js/clock.js', 'clock'),
    KarmaFile('js/jquery.i18n.js', 'i18n'),
    KarmaFile('js/jquery.strings.js', 'jquery.strings'),
    KarmaFile('js/jquery.keyfilter.js', 'jquery.keyfilter')
    ]

karma_css_files = [
    KarmaFile('css/global.css', 'global'),
    KarmaFile('css/ui.scoreboard.css', 'ui.scoreboard')
    ]

karma_audio_files = [
    KarmaFile('audio/en_correct.ogg', 'correct', type='audio'),
    KarmaFile('audio/en_incorrect.ogg', 'incorrect', type='audio'),
    KarmaFile('audio/ne_correct.ogg', 'ne_correct', type='audio'),
    KarmaFile('audio/ne_incorrect.ogg', 'ne_incorrect', type='audio'),
    KarmaFile('audio/byebye.ogg', 'byebye', type='audio'),
    KarmaFile('audio/trigger.ogg', 'trigger', type='audio')
    ]

karma_image_files = [

    ]

favicon = KarmaFile('image/favicon.ico', 'favicon')
title_block_lt = KarmaFile('image/title_block_lt.png', 'title_block_lt')
title_block_rt = KarmaFile('image/title_block_rt.png', 'title_block_rt')


#TBD: factor this out in a separate file, so it is easy to provide
#     your own header/footer
#TBD: make header/footer customizable
def generate_header(dir, body, title):
    header = body.div(id='header')

    header.div(id='topbtn_left').div(id='linkBackLesson',
                                     title='Back',
                                     className='linkBack')

    lesson_title = header.div(id='lesson_title')
    lesson_title.img(src=title_block_lt.relative_path(dir, web=True),
                     width=33, height=75, align='absmiddle')
    lesson_title.text(title)
    lesson_title.img(src=title_block_rt.relative_path(dir, web=True),
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


def include_dependencies(files):
    result = []
    visited = set()
    deps = {}
    for dep in java_script_dependencies:
        deps[dep[1]] = deps.setdefault(dep[1], []) + [dep[0]]
    js_files = {}
    for f in karma_java_script_files:
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
    def __init__(self):
        self.parent_directory = ''
        self.directory = ''
        self.title = ''
        self.lesson_title = ''
        self.java_script_files = []
        self.css_files = []
        self.image_files = []
        self.audio_files = []
        self.divs = [createDiv('content')]
        self.footer_configuration = dict(link_previous=True,
                                         link_next=True,
                                         scoreboard=False,
                                         link_check_answer=False)

    def copy_files(self):
        def create_dir(d):
            if not os.path.exists(d):
                os.makedirs(d)
        create_dir(self.directory)
        os.chdir(self.directory)
        map(create_dir, ['css', 'js', 'js/locale', 'assets/image', 'assets/audio', 'assets/video'])

        for f in self.java_script_files + self.css_files:
            f.make_available()
        for f in self.image_files + self.audio_files:
            f[1].make_available()
        # if a screenshot.jpg exists in the source, copy it to the dest
        screenshot_img = os.path.join(lesson_src, 'screenshot.jpg')
        if (os.path.exists(screenshot_img)):
            shutil.copy(screenshot_img, os.path.join(self.directory, 'screenshot.jpg'))

        self.compile_translations()

    def compile_translations(self):
        # compile translation JS files from MO files

        for srcfile in os.listdir(lesson_src):
            if fnmatch.fnmatch(srcfile, '*.mo'):
                lang = os.path.splitext(srcfile)[0]
                srcpath = os.path.join(lesson_src, srcfile)
                targpath = os.path.join(self.directory, 'js', 'locale', lang +'.js')
                json_translations = mo2js.gettext_json(open(srcpath, 'r'), True)

                f = codecs.open(targpath, encoding='utf-8', mode='w+')
                f.write('$.i18n.storeLocaleStrings("%s",\n' % lang);
                f.write(json_translations)
                f.write(');\n');
                f.write('$.i18n.setLocale("%s");\n' % lang);

    def set_directory(self, dir):
        self.directory = os.path.abspath( os.path.join(self.parent_directory, dir) )
        lesson_dest = self.directory

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
                  href=favicon.relative_path(None, web=True))
        all_java_script_files = include_dependencies(self.java_script_files)
        for file in sort_java_script_files(all_java_script_files):
            head.script(type='text/javascript',
                        src=file.relative_path(None, web=True))
        body = html.body()
        generate_header(self.directory, body, self.lesson_title)
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

def lesson(grade, subject, title, week, browser_title=None, lesson_title=None, locale=None):
    def camelcase(str):
        words = str.replace("'", '').split()
        return ''.join([words[0].lower()] + [x.capitalize() for x in words[1:]])

    dirname = '%s_%s_%s_%s_K' % (grade, subject, camelcase(title), week);
    print 'writing lesson to ' + dirname
    theLesson.set_directory( dirname )
    theLesson.lesson_title = lesson_title or title
    theLesson.title = browser_title or 'Class %s %s %s' % (grade, subject, title)
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
        theLesson.java_script_files.append(File('js/jquery.i18n.'+ locale +'.js', type='js', karma=True))

        locale_mo = frob_path(locale + '.mo')
        if os.path.exists(locale_mo):
            targpath = os.path.join(lesson_dest, 'js', 'locale', locale +'.js')
            theLesson.java_script_files.append(File(targpath, None, type='js', karma=True))


def resolve_karma_file(path, name, karma_files, **kw):
    for f in karma_files:
        if f.name() == name:
            return f
    return File(path, name, **kw)


def java_script(name, **kw):
    kw['type'] = 'js'
    result = resolve_karma_file(name, name, karma_java_script_files, **kw)
    if name in [f.name() for f in theLesson.java_script_files]:
        print 'Warning: the java_script file \'' + name + '\' is included twice.'
    else:
        theLesson.java_script_files.append(result)
    return result


def css(name):
    result = resolve_karma_file(name, name, karma_css_files, type='css')
    theLesson.css_files.append(result)
    return result


def image(file, name=None):
    search_framework_files = []
    if name == None:
        name = file
        search_framework_files = karma_image_files
    result = resolve_karma_file(file, name, search_framework_files, type='image')
    theLesson.image_files.append([name, result])
    return result


def audio(file, name=None):
    search_framework_files = []
    if name == None:
        name = file
        search_framework_files = karma_audio_files
    result = resolve_karma_file(file, name, search_framework_files, type='audio')
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
        java_script('../../deploy/karma/js/scoreboard.js') #TBD: fix path


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


if __name__ == '__main__':
    parser = OptionParser(usage="Usage: %prog [options] file")
    parser.add_option('-d', '--debug', dest='debug', default=True,
                      help='use non-minimized JavaScript libraries')
    parser.add_option('-o', '--output', dest='output',
                      help='use output as a destination directory')
    parser.add_option('-k', '--karma', dest='karma',
                      help='DEPRECATED - path to the karma directory')
    parser.add_option('-a', '--all', dest='all', action='store_true',
                      help='generate all lessons/*/description.py definitions')
    (options, args) = parser.parse_args()
    debug = options.debug

    if not args and not options.all:
        print 'Specify a file as an argument.'
        parser.print_help()
        sys.exit(1)

    if options.karma:
        print "WARNING: 'karma' option (-k, --karma) is deprecated and no longer needed"

    process_descriptions = []
    if options.all:
        lesson_folder = os.path.join(script_root, 'lessons')
        for root, dirs, files in os.walk(lesson_folder):
            if 'description.py' in files:
                process_descriptions.append( os.path.abspath(os.path.join(script_root, root, 'description.py')) )
    else:
        process_descriptions.append(args[0])

    for description in process_descriptions:
        os.chdir(script_root)
        description = os.path.abspath(description)
        lesson_src = os.path.abspath(os.path.dirname(description))

        theLesson = Lesson()
        theLesson.parent_directory = os.path.abspath(os.path.join(script_root, 'deploy', 'Activities'))
        theLesson.java_script_files.append(File('lesson-karma.js', None, type='js', generated=True))

        include_stack.append(description)
        check_file_exists(description)
        execfile(description)
        include_stack.pop()

        theLesson.copy_files()
        theLesson.print_html_on(codecs.open('index.html', 'w', 'UTF-8'))
        theLesson.print_karma_js_on(open('js/lesson-karma.js', 'w'))
