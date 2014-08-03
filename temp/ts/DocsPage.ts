import View = require('View');
import DomUtils = require('DomUtils');
import DocsPagecss = require('DocsPage.css');

DomUtils.loadStyles(DocsPagecss.styles);

class DocsPage extends View {
    viewName = 'DocsPage';

    onRenderHtml(): string {
        return '' +
            '<div class="c-DocsPage">' +
                '<div class="index">' +
                    '<a class="link large">' +
                        'Getting started' +
                    '</a>' +
                    '<a class="link large">' +
                        'Examples' +
                    '</a>' +
                    '<a class="link large">' +
                        'Reference' +
                    '</a>' +
                    '<a class="link large">' +
                        'Getting started' +
                    '</a>' +
                    '<a class="link large">' +
                        'Template syntax' +
                    '</a>' +
                '</div>' +
            '</div>' +
            '';
    }
}

export = DocsPage;
