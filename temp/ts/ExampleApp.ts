import View = require('View');
import Encode = require('Encode');
import IExampleAppModel = require('IExampleAppModel');
import ExampleAppcss = require('ExampleApp.css');
View.loadStyles(ExampleAppcss.styles);
import ExampleAppModel = require('ExampleAppModel');
import Header = require('Header');

class ExampleApp extends View {
    public header: Header;

    public _bindings = [
        {
            "id": "0"
        },
        {
            "id": "1",
            "className": {
                "sectionVisible": "showBenefits"
            }
        }
    ];

    constructor(data?: any) {
        super(data);

        this.viewName = 'ExampleApp';
        this.baseClass = 'c-' + this.viewName + (this.baseClass ? ' ': '');
        this.viewModelType = ExampleAppModel;
        this.addChild(this.header = new Header({ items: [{ name: 'Create' }, { name: 'Share' }, { name: 'Discover' }] }));
    }

    public onRenderHtml(viewModel: IExampleAppModel): string {
        return '' +
            '<' + this.baseTag + ' id="' + this.id + '_0" ' + this.genStyle(this.baseStyle) + ' ' + this.genClass('foo ' + this.baseClass) + '>' +
                this.header.renderHtml() +
                '<section page="info">' +
                    '<h1>' +
                        'OneJS is a tiny web framework.' +
                    '</h1>' +
                    '<p>' +
                        'OneJS enables you to build easily reusable web components. They can be self contained as a single JavaScript file that can be included via RequireJS AMD modules.' +
                    '</p>' +
                    '<h2 js-userActionTODOEXAMPLE="click:toggle(showBenefits)">' +
                        'Benefits' +
                    '</h2>' +
                    '<ul id="' + this.id + '_1" ' + this.genClass('', ['sectionVisible','showBenefits']) + '>' +
                        '<li>' +
                            'Small footprint. (8k minified, 5k gzipped)' +
                        '</li>' +
                        '<li>' +
                            'Start with just a view template, grow your control with a JavaScript view model when you&#39;re ready.' +
                        '</li>' +
                        '<li>' +
                            'Performance first, no fluffy parsing the DOM for bindings at runtime.' +
                        '</li>' +
                        '<li>' +
                            'No dependency on future browser standards, IE8 friendly.' +
                        '</li>' +
                        '<li>' +
                            'No dependencies on external libraries, works out of the box.' +
                        '</li>' +
                        '<li>' +
                            'Components written in MVVM pattern, forcing clean separation between presentation and logic.' +
                        '</li>' +
                        '<li>' +
                            'TypeScript used as an intermediate output to enforce static code analysis.' +
                        '</li>' +
                        '<li>' +
                            'Less css friendly.' +
                        '</li>' +
                        '<li>' +
                            'Localization friendly. Resources included as AMD modules, which can be remapped with RequireJS config.' +
                        '</li>' +
                        '<li>' +
                            'Selenium test automation friendly. Navigational TypeScript test stubs generated from views, so product changes break tests at build time rather than at runtime.' +
                        '</li>' +
                    '</ul>' +
                    '<h2>' +
                        'How it works:' +
                    '</h2>' +
                    '<p>' +
                        'You write a view template for your component:' +
                    '</p>' +
                    '<pre>' +
                        'Example' +
                    '</pre>' +
                    '<p>' +
                        'They compile to anything to you want. You can add your own generators here. Our default compiler pregenerates a TypeScript class, because we love static code analysis! Example:' +
                    '</p>' +
                    '<pre>' +
                        'TypeScript example here' +
                    '</pre>' +
                    '<p>' +
                        '...of course, the build system can continue to produce JavaScript:' +
                    '</p>' +
                    '<pre>' +
                        'JavaScript compiled output here' +
                    '</pre>' +
                    '<p>' +
                        'To use, you simply use RequireJS to load your main JavaScript:' +
                    '</p>' +
                    '<pre>' +
                        'Example html page loading module' +
                    '</pre>' +
                '</section>' +
                '<section page="create"></section>' +
            '</' + this.baseTag + '>' +
            '';
    }
}

export = ExampleApp;
