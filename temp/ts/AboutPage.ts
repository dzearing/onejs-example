import AboutPageModel = require('AboutPageModel');
import DomUtils = require('DomUtils');
import View = require('View');
import AboutPageBase = require('AboutPageBase');
import ExamplePane = require('ExamplePane');
import AboutPagecss = require('AboutPage.css');

DomUtils.loadStyles(AboutPagecss.styles);

class AboutPage extends AboutPageBase {
    viewName = 'AboutPage';
    viewModelType = AboutPageModel;
    examplePane = <any>this.addChild(new ExamplePane());
    example2Pane = <any>this.addChild(new ExamplePane());
    example3Pane = <any>this.addChild(new ExamplePane());

    onViewModelChanged() {
        this.examplePane.setData(this.getValue('example1'));
        this.example2Pane.setData(this.getValue('example2'));
        this.example3Pane.setData(this.getValue('example3'));
    }

    onRenderHtml(): string {
        return '' +
            '<div class="c-AboutPage page">' +
                '<h1>' +
                    'OneJS is a tiny web framework.' +
                '</h1>' +
                '<p>' +
                    'OneJS is a small set of core classes which enable you to build easily reusable web components in an Model View ViewModel (MVVM) pattern.' +
                '</p>' +
                '<p>' +
                    'Utilizing RequireJS to load and optimize modules, you can include only the parts of OneJS you need. A barebones web page with data binding support only adds' +
                    '<span class="ref">' +
                        '5k (gzipped)' +
                    '</span>' +
                    'to the download size.' +
                '</p>' +
                '<p>' +
                    'For production purposes, OneJS uses a compiler to compile Views (templates) into TypeScript classes. These can be mixed together with other components, and TypeScript type checking can catch your bugs early. While this tranlates down into JavaScript classes for current browsers, it ensures future compatibility with ECMAScript 6 once it is fully supported.' +
                '</p>' +
                '<h2>' +
                    'Why' +
                '</h2>' +
                '<ul>' +
                    '<li>' +
                        'Performance first. No virtual DOM required to minimize DOM changes.' +
                    '</li>' +
                    '<li>' +
                        'Small footprint. (8k gzipped) RequireJS is the only dependency.' +
                    '</li>' +
                    '<li>' +
                        'Build reusable components, share them with others, reskin them.' +
                    '</li>' +
                    '<li>' +
                        'Easy to iterate with. Start with markup, build a view model for it when youre ready.' +
                    '</li>' +
                    '<li>' +
                        'Testable. Generated selenium test stubs make it easy to navigate your site.' +
                    '</li>' +
                    '<li>' +
                        'Localizable. Put your strings and css in amd modules, reroute as necessary.' +
                    '</li>' +
                    '<li>' +
                        'Interopable. Want to use a jQuery plugin? How about that Ace editor, which is being used on this page? OneJS won&#39;t get in your way.' +
                    '</li>' +
                    '<li>' +
                        'Extendable. Easy to create your own product base classes. Easy to create your own binding and eventing helpers that can be invoked from views directly.' +
                    '</li>' +
                '</ul>' +
                '<h2>' +
                    'Get started now' +
                '</h2>' +
                '<pre>' +
                    'git clone https://github.com/dzearing/od-wireframe' +
                '</pre>' +
                '<pre>' +
                    'cd od-wireframe' +
                '</pre>' +
                '<pre>' +
                    'npm i' +
                '</pre>' +
                '<pre>' +
                    'gulp' +
                '</pre>' +
                '<p>' +
                    'Then open the index.html locally to render.' +
                '</p>' +
                '<h2>' +
                    'How it works' +
                '</h2>' +
                '<p>' +
                    'OneJS encourages a separation between view and view models. You can build easy to consume, easy to reuse components that can be shared and reused.' +
                '</p>' +
                '<h2>' +
                    'Views' +
                '</h2>' +
                '<p>' +
                    'Let&#39;s start with a view template. A view template is defined by a' +
                    '<span class="ref">' +
                        'js-view' +
                    '</span>' +
                    'element, with a' +
                    '<span class="ref">' +
                        'js-type' +
                    '</span>' +
                    'attribute indicating the class name. Within it, you can put whatever markup you want:' +
                '</p>' +
                this.examplePane.renderHtml() +
                '<p>' +
                    'If you inspect the TypeScript tab, you will see a View subclass with a small set of imports and a render function that returns a string. This is generated by the OneJS compiler, which is available as a' +
                    '<a href="http://github.com/dzearing/gulp-onejs-compiler">' +
                        'gulp' +
                    '</a>' +
                    'plugin. We can instantiate that class and call its' +
                    '<span class="ref">' +
                        'renderHtml' +
                    '</span>' +
                    'method to programatically get the content as a string, which we can innerHTML into the page.' +
                '</p>' +
                '<h2>' +
                    'View models and binding' +
                '</h2>' +
                '<p>' +
                    'Ok, so now we have a class that can render our markup. But it&#39;s all hardcoded. This is where we should set up a view model to hold the values, so that they can be changed independently of the view. To do this, we add the' +
                    '<span class="ref">' +
                        'js-model' +
                    '</span>' +
                    'attribute to the view, and add' +
                    '<span class="ref">' +
                        'js-bind' +
                    '</span>' +
                    'binding attributes to the various elements to map what property goes where.' +
                '</p>' +
                this.example2Pane.renderHtml() +
                '<p>' +
                    'Binding syntax is mostly flexible, but with performance in mind. js-bind has support for binding text, html, attributes, css values, and toggling classes. The source can be any property or function in the view model&#39;s data heirarchy. See the binding documentation for more information, or jump to the following examples:' +
                '</p>' +
                '<ul>' +
                    '<li>' +
                        '<a href="#/docs">' +
                            'Example: binding text' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/docs">' +
                            'Example: binding html' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/docs">' +
                            'Example: binding attributes' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/docs">' +
                            'Example: binding classNames' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/docs">' +
                            'Example: repeating' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/docs">' +
                            'Example: conditionals' +
                        '</a>' +
                    '</li>' +
                '</ul>' +
                '<p>' +
                    'This is where a gulp or grunt build workflow keeps things refreshed. We use a generator that can read the xhtml template, and generate a JavaScript or TypeScript class for anyone to consume. The class has a list of OneJS AMD dependencies, which means that we can use the build workflow to easily package up JavaScript dependencies together.' +
                '</p>' +
                '<h2>' +
                    'Using the view in other views' +
                '</h2>' +
                this.example3Pane.renderHtml() +
                '<h2>' +
                    'Adding view specific logic' +
                '</h2>' +
                '<h2>' +
                    'Merge your styles in' +
                '</h2>' +
                '<h2>' +
                    'Using resources and avoiding singletons' +
                '</h2>' +
            '</div>' +
            '';
    }
}

export = AboutPage;
