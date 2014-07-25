import View = require('View');
import Encode = require('Encode');
import IExampleAppModel = require('IExampleAppModel');
import ExampleAppModel = require('ExampleAppModel');
import Header = require('Header');
import ExampleAppcss = require('ExampleApp.css');

View.loadStyles(ExampleAppcss.styles);

class ExampleApp extends View {
    public header: Header;

    public _bindings = [
        {
            "id": "0"
        },
        {
            "id": "1",
            "text": "title"
        },
        {
            "id": "2",
            "text": "subTitle"
        },
        {
            "id": "3",
            "childId": "viewEditor"
        },
        {
            "id": "4",
            "childId": "typeScriptEditor"
        },
        {
            "id": "5",
            "childId": "usageEditor"
        },
        {
            "id": "6",
            "childId": "viewModelEditor"
        }
    ];

    constructor(data?: any) {
        super(data);

        this.viewName = 'ExampleApp';
        this.baseClass = 'c-' + this.viewName + (this.baseClass ? ' ': '');
        this.viewModelType = ExampleAppModel;
        this.addChild(this.header = new Header());
    }

    public onRenderHtml(viewModel: IExampleAppModel): string {
        return '' +
            '<' + this.baseTag + ' id="' + this.id + '_0" ' + this.genStyle(this.baseStyle) + ' ' + this.genClass('foo ' + this.baseClass) + '>' +
                this.header.renderHtml() +
                '<div class="centered">' +
                    '<div class="page">' +
                        '<h1 id="' + this.id + '_1">' +
                            Encode.toJS(viewModel.title) +
                        '</h1>' +
                        '<p id="' + this.id + '_2">' +
                            Encode.toJS(viewModel.subTitle) +
                        '</p>' +
                        '<h2 js-userActionTODOEXAMPLE="click:toggle(showBenefits)">' +
                            'Why' +
                        '</h2>' +
                        '<ul>' +
                            '<li>' +
                                'Performance first, no fluffy parsing the DOM for bindings at runtime.' +
                            '</li>' +
                            '<li>' +
                                'Small footprint. (8k minified, 5k gzipped) RequireJS is the only dependency.' +
                            '</li>' +
                            '<li>' +
                                'Build reusable components, share them with others, reskin them.' +
                            '</li>' +
                            '<li>' +
                                'Easy to iterate with. Start with markup, build a view model for it when youre ready.' +
                            '</li>' +
                            '<li>' +
                                'TypeScript used as an intermediate output to enforce static code analysis.' +
                            '</li>' +
                            '<li>' +
                                'Less css friendly.' +
                            '</li>' +
                        '</ul>' +
                        '<h2>' +
                            'Overview' +
                        '</h2>' +
                        '<p>' +
                            'Diagram here!' +
                        '</p>' +
                        '<h2>' +
                            'How views work' +
                        '</h2>' +
                        '<p>' +
                            'You write an html template for your component:' +
                        '</p>' +
                        '<div id="' + this.id + '_3" js-id="viewEditor" class="editor"></div>' +
                        '<p>' +
                            'Using the onejs-compiler (grunt and gulp plugins available), this generates a TypeScript View subclass (and an ViewModel interface) that can be used as your root component, or referenced within other View templates. The only dependencies we require here are View and Encode:' +
                        '</p>' +
                        '<div id="' + this.id + '_4" js-id="typeScriptEditor" class="bigEditor"></div>' +
                        '<p>' +
                            'To render your root component, you can use the initializeRoot helper to render and activate it, forward browser resize events to it, and dispose it on unload:' +
                        '</p>' +
                        '<div id="' + this.id + '_5" js-id="usageEditor" class="editor"></div>' +
                        '<h2>' +
                            'Defining a ViewModel' +
                        '</h2>' +
                        '<p>' +
                            'You will want to have default values for your properties to make it easy to consume your component. You can associate a default view model with your view by providing a js-model attribute on the view, and defining the TypeScript class as a subclass of ViewModel:' +
                        '</p>' +
                        '<div id="' + this.id + '_6" js-id="viewModelEditor" class="editor"></div>' +
                        '<h2>' +
                            'How eventing works' +
                        '</h2>' +
                        '<p>' +
                            'Components can fire events and parents can observe those. For example, a header component may have a number of items, which should be observed by the app. Simple tasks, like flipping pages, can be done purely from the view template:' +
                        '</p>' +
                        '<div class="editor">' +
                            'Example' +
                        '</div>' +
                        '<h2>' +
                            'Using sub components' +
                        '</h2>' +
                        '<p>' +
                            'Content here' +
                        '</p>' +
                        '<h2>' +
                            'Load data from services' +
                        '</h2>' +
                        '<p>' +
                            'Describe xhr helpers, promises, and wrappers.' +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</' + this.baseTag + '>' +
            '';
    }
}

export = ExampleApp;
