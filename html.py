#! /usr/bin/env python2.6
# -*- coding: utf-8 -*-

import codecs
import sys


attribute_names = dict(
    httpEquiv='http-equiv',
    className='class'
    )


html_escapes = [(u'&', u'&amp;'),
                (u'>', u'&gt;'),
                (u'<', u'&lt;'),
                (u'"', u'&quot;'),
                (u"'", u'&apos;')]


def escape(string):
    for (x, y) in html_escapes:
        if x in string:
            string = string.replace(x, y)
    return string


class HtmlElementFactory():
    def __init__(self):
        self.children = []

    def create_element(self, tag, attrs, separate_closing_tag=True):
        result = HtmlElement(tag, separate_closing_tag)
        result.attr(**attrs)
        self.children.append(result)
        return result

    def html(self, **attrs):
        return self.create_element(u'html', attrs)

    def head(self, **attrs):
        return self.create_element(u'head', attrs)

    def body(self, **attrs):
        return self.create_element(u'body', attrs)

    def meta(self, **attrs):
        return self.create_element(u'meta', attrs, False)

    def link(self, **attrs):
        return self.create_element(u'link', attrs, False)

    def title(self, **attrs):
        return self.create_element(u'title', attrs)

    def script(self, **attrs):
        return self.create_element(u'script', attrs)

    def a(self, **attrs):
        return self.create_element(u'a', attrs)

    def div(self, **attrs):
        return self.create_element(u'div', attrs)

    def span(self, **attrs):
        return self.create_element(u'span', attrs)

    def img(self, **attrs):
        return self.create_element(u'img', attrs)

    def text(self, txt):
        result = HtmlText(txt)
        self.children.append(result)
        return result

    def innerhtml(self, html):
        result = HtmlSource(html)
        self.children.append(result)
        return result

    def comment(self, txt):
        result = HtmlComment(txt)
        self.children.append(result)
        return result

    def print_on(self, stream):
        for child in self.children:
            child.print_on(stream)


class HtmlDocument(HtmlElementFactory):
    def __init__(self):
        HtmlElementFactory.__init__(self)

    def print_on(self, stream):
        print >>stream, '<!DOCTYPE html>'
        HtmlElementFactory.print_on(self, stream)


class HtmlElement(HtmlElementFactory):
    def __init__(self, tag, separate_closing_tag):
        HtmlElementFactory.__init__(self)
        self.tag = tag
        self.attributes = {}
        self._separate_closing_tag = separate_closing_tag

    def attr(self, **kw):
        self.attributes = kw
        return self

    def print_on(self, stream):
        def attribute_key_to_string(k):
            return attribute_names[k] if k in attribute_names else k

        def attribute_to_string(kv):
            return u'%s="%s"' % (attribute_key_to_string(kv[0]),
                                 unicode(kv[1]))

        def attributes_to_string(attrs):
            if len(attrs):
                return u' ' + u' '.join([attribute_to_string(kv)
                                         for kv in attrs.items()])
            else:
                return u''

        attributes_string = attributes_to_string(self.attributes)

        if self._separate_closing_tag:
            tag_open = u'<%s%s>' % (self.tag, attributes_string)
            tag_close = u'</%s>' % self.tag
            if len(self.children):
                print >>stream, tag_open
                HtmlElementFactory.print_on(self, stream)
                print >>stream, tag_close
            else:
                print >>stream, tag_open + tag_close
        else:
            print >>stream, u'<%s%s/>' % (self.tag, attributes_string)


class HtmlText():
    def __init__(self, txt):
        self.text = txt

    def print_on(self, stream):
        print >>stream, escape(self.text)


class HtmlComment():
    def __init__(self, txt):
        if (txt.find('-->') != -1):
            print >>sys.stderr, 'Unable to deal with \'-->\' in comment string.'
            sys.exit(1)
        self.text = txt

    def print_on(self, stream):
        print >>stream, '<!--', self.text, '-->'


class HtmlSource():
    def __init__(self, txt):
        self.text = txt

    def print_on(self, stream):
        print >>stream, self.text
