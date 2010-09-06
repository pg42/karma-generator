#! /usr/bin/env python2.6
# -*- coding: utf-8 -*-

import html
import string

def start_html(lesson):
    displayGrade = u'०१२३४५६७८९'[lesson.grade()];
    displaySubject = {
        'English': 'English',
        'Maths':u'गणित',
        'Nepali':u'नेपाली' }[lesson.subject()];
    karma = lesson.karma

    doc = html.HtmlDocument()
    with doc.html():
        with doc.head():
            with doc.title():
                doc.text(lesson.lesson_title)
            doc.meta_utf8()
            doc.favicon(karma.image('favicon').relative_path(None, web=True))
            doc.css(karma.css('kstart').relative_path(None, web=True))
            for f in ['jquery', 'kstart']:
                doc.java_script(karma.java_script(f).relative_path(None, web=True))
        with doc.body(id='kStart'):
            with doc.div(id='top'):
                doc.div(id='backBtn', title='Back')
                with doc.div(id='topMiddle'):
                    doc.div(id='topDesc', className='center').text(u'साझा शिक्षा ई-पाटीद्वारा निर्मित')
                    doc.div(id='topE-Paath', className='center').text(u'ई-पाठ')
            with doc.div(id='middle'):
                with doc.div(id='grade', className='center'):
                    doc.span(id='gradeText').text(u'कक्षा:')
                    doc.span(id='gradeNum').text(displayGrade)
                doc.div(id='subject', className='center').text(displaySubject)
                with doc.div(id='lessonTitle', className='center'):
                    doc.a(href='./index.html').text(lesson.lesson_title)
                doc.div(id='lessonDesc', className='center').text(lesson.summary)
                with doc.div(id='teachersNoteBtn', className='button'):
                    with doc.a(href='./kDoc.html?back=start.html&doc=teachersNote'):
                        doc.div().text(u'Teacher\'s Note')
                        doc.div().text(u'पाठविवरण')
            with doc.div(id='bottom'):
                doc.div(id='logo', title=u'साझा शिक्षा ई-पाटी द्वारा निर्मित')
            doc.div(id='logoHelp')
    return doc

def index_html_header(doc, karma, dir, body, titles):
    def create_title(text):
        def img(name):
            return doc.img(src=karma.image(name).relative_path(dir, web=True),
                           width=33, height=75, align='absmiddle')

        with doc.div(className='lesson_title'):
            img('title_block_lt')
            doc.text(text)
            img('title_block_rt')

    with doc.div(id='header'):
        with doc.div(id='topbtn_left'):
            doc.div(id='linkBackLesson', title='Back', className='linkBack')
        for title in titles:
            create_title(title)
        with doc.div(className='topbtn_right'):
            doc.div(title='Help', id='linkHelp')
        with doc.div(className='topbtn_right'):
            doc.div(id='linkOle', title=u'साझा शिक्षा ई-पाटी द्वारा निर्मित')


def index_html_footer(doc, subject, body, config):
    with doc.div(id='footer'):
        if config['link_next']:
            doc.div(title='Next', id='linkNextLesson', className='linkNext')
        if config['link_previous']:
            doc.div(title='Previous', id='linkPrevLesson', className='linkBack')
        if config['scoreboard']:
            doc.div(id='score_box', display='none')

        with doc.div(className='botbtn_right'):
            if subject == 'English':
                doc.div(title='Play Again', id='linkPlayAgain', className='english').text('Play Again')
            else:
                doc.div(title='Play Again', id='linkPlayAgain', className='nepali').text(u'फेरी खेलौँ')

        if config['link_check_answer']:
            with doc.div(className='botbtn_right'):
                doc.div(title='Check Answer', id='linkCheck')


def index_html(lesson, warning_text_lines):
    karma = lesson.karma
    doc = html.HtmlDocument()
    for line in warning_text_lines:
        doc.comment(string.replace(line, '--', '__'))
    with doc.html():
        with doc.head():
            doc.title().text(lesson.title)
            doc.meta_utf8()
            for file in lesson.css_files:
                doc.css(file.relative_path(None, web=True))
            doc.favicon(karma.image('favicon').relative_path(None, web=True))
            for file in lesson.all_java_script_files():
                doc.java_script(file.relative_path(None, web=True))
        with doc.body() as body:
            titles = [lesson.lesson_title]
            if lesson.subject() == 'Maths' and lesson.lesson_title != lesson.start_title:
                titles.append(lesson.start_title)
            index_html_header(doc, karma, lesson.directory, body, titles)
            body.children.extend(lesson.divs)
            index_html_footer(doc, lesson.subject(), body,
                              lesson.footer_configuration)
    return doc

def kdoc_html(lesson):
    karma = lesson.karma
    subject = unicode(lesson.subject())
    title = unicode(lesson.title)
    doc = html.HtmlDocument()
    with doc.html():
        with doc.head():
            doc.title().text('Lesson Plan for {0} {1}'.format(subject,title))
            doc.meta_utf8()
            doc.favicon(karma.image('favicon').relative_path(None, web=True))
            for css in ['karma', 'ui.kHeader', 'kDoc']:
                doc.css(karma.css(css).relative_path(None, web=True))
            for js in ['jquery', 'jquery-ui', 'karma', 'ui.kHeader', 'kDoc']:
                doc.java_script(karma.java_script(js).relative_path(None, web=True))
        with doc.body(id='kDoc'):
            doc.div(id='kHeader')
            with doc.div(id='kHelp', title='Help'):
                doc.text(u'पाठविवरणर पाठयोजना सहज तरिकाले पढ्न तपाईले निम्न कार्य गर्न सक्नु हुन्छ ।')
                doc.br()
                doc.text(u'पाठ पृष्टको दाईने तर्फको ठाडो  रेखा तल माथि गर्दा')
                doc.br()
                doc.text(u'तपाईले हाल पढिरहेको पृष्टलाई आवश्यकता अनुसार तल माथि गर्न सक्नुहुन्छ')
            doc.iframe(id='iframeLessonPlan', src='')
    return doc
