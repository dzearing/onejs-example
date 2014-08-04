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
                    '<h3>' +
                        'Guides' +
                    '</h3>' +
                    '<ul>' +
                        '<li>' +
                            'Creating a OneJS site' +
                        '</li>' +
                        '<li>' +
                            'Creating/publishing controls' +
                        '</li>' +
                        '<li>' +
                            'Navigation and routing' +
                        '</li>' +
                        '<li>' +
                            'Working with observables' +
                        '</li>' +
                        '<li>' +
                            'Managing selection' +
                        '</li>' +
                        '<li>' +
                            'Exposing resources' +
                        '</li>' +
                        '<li>' +
                            'Making ajax calls' +
                        '</li>' +
                        '<li>' +
                            'Writing a functional test' +
                        '</li>' +
                    '</ul>' +
                    '<h3>' +
                        'Template reference' +
                    '</h3>' +
                    '<ul>' +
                        '<li>' +
                            'Template syntax guide' +
                        '</li>' +
                        '<li>' +
                            'Binding utilities' +
                        '</li>' +
                    '</ul>' +
                    '<h3>' +
                        'OneJS API reference' +
                    '</h3>' +
                    '<ul>' +
                        '<li>' +
                            'View class' +
                        '</li>' +
                        '<li>' +
                            'EventGroup class' +
                        '</li>' +
                        '<li>' +
                            'ViewModel class' +
                        '</li>' +
                        '<li>' +
                            'DomUtils class' +
                        '</li>' +
                        '<li>' +
                            'Encode class' +
                        '</li>' +
                        '<li>' +
                            'Repeater class' +
                        '</li>' +
                        '<li>' +
                            'ContentControl class' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
                '<div class="content">' +
                    '<h2>' +
                        'Navigation and routing' +
                    '</h2>' +
                    '<p>' +
                        'TODO' +
                    '</p>' +
                    '<h2>' +
                        'Working with observables' +
                    '</h2>' +
                    '<p>' +
                        'TODO' +
                    '</p>' +
                    '<h2>' +
                        'Managing selection' +
                    '</h2>' +
                    '<p>' +
                        'TODO' +
                    '</p>' +
                    '<h2>' +
                        'Exposing resources' +
                    '</h2>' +
                    '<p>' +
                        'TODO' +
                    '</p>' +
                    '<h2>' +
                        'Making ajax calls' +
                    '</h2>' +
                    '<p>' +
                        'TODO' +
                    '</p>' +
                    '<h2>' +
                        'Template syntax guide' +
                    '</h2>' +
                    '<p>' +
                        'TODO' +
                    '</p>' +
                    '<h2>' +
                        'Binding utilities' +
                    '</h2>' +
                    '<p>' +
                        'TODO' +
                    '</p>' +
                '</div>' +
            '</div>' +
            '';
    }
}

export = DocsPage;
