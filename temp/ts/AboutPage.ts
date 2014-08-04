import AboutPageModel = require('AboutPageModel');
import View = require('View');
import AboutPageBase = require('AboutPageBase');
import ExamplePane = require('ExamplePane');
import DomUtils = require('DomUtils');
import AboutPagecss = require('AboutPage.css');

DomUtils.loadStyles(AboutPagecss.styles);

class AboutPage extends AboutPageBase {
    viewName = 'AboutPage';
    viewModelType = AboutPageModel;
    viewsExamplePane = <any>this.addChild(new ExamplePane());
    viewModelsExamplePane = <any>this.addChild(new ExamplePane());
    example3Pane = <any>this.addChild(new ExamplePane());

    onViewModelChanged() {
        this.viewsExamplePane.setData(this.getValue('viewsExample'));
        this.viewModelsExamplePane.setData(this.getValue('viewModelsExample'));
        this.example3Pane.setData(this.getValue('viewInViewExample'));
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
                    'Utilizing RequireJS to load and optimize modules, you can include only the parts of OneJS you need. A barebones reusable web component, merged in wtih the common core including data binding support adds' +
                    '<span class="ref">' +
                        '5k (gzipped)' +
                    '</span>' +
                    'to the download size. This means sites won&#39;t have to download a larger  framework just to use your component.' +
                '</p>' +
                '<p>' +
                    'For production purposes, OneJS uses a compiler to compile Views (templates) into TypeScript classes. These can be mixed together with other components, and TypeScript type checking can catch your bugs early. When we&#39;re ready to update our site, we pipe all classes through compilers/optimizers (tsc, less, cssminify, uglify2, etc) to provide a fully optimized site.' +
                '</p>' +
                '<h2>' +
                    'Why' +
                '</h2>' +
                '<ol>' +
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
                '</ol>' +
                '<h2>' +
                    'Get started now' +
                '</h2>' +
                '<div class="code">' +
                    '<div>' +
                        'git clone https://github.com/dzearing/od-wireframe' +
                    '</div>' +
                    '<div>' +
                        'cd od-wireframe' +
                    '</div>' +
                    '<div>' +
                        'npm i' +
                    '</div>' +
                    '<div>' +
                        'gulp' +
                    '</div>' +
                '</div>' +
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
                    'attribute indicating the class name. Within it, you can put whatever markup you want. This is piped through the onejs-compiler (here, running in the browser) which can output the view to a JavaScript (or TypeScript) class which can be intantiated and rendered on demand:' +
                '</p>' +
                this.viewsExamplePane.renderHtml() +
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
                    'Now we have a class that can render our markup, but it&#39;s values are hardcoded. To make this component dynamic, we should set up a view model to hold default states, so that they can be changed independently of the view. To do this, we add the' +
                    '<span class="ref">' +
                        'js-model' +
                    '</span>' +
                    'attribute to the view, and add' +
                    '<span class="ref">' +
                        'js-bind' +
                    '</span>' +
                    'binding attributes to the various elements to map what property goes where.' +
                '</p>' +
                this.viewModelsExamplePane.renderHtml() +
                '<p>' +
                    'The' +
                    '<span class="ref">' +
                        'js-bind' +
                    '</span>' +
                    'attribute has support for binding text, html, attributes, css values, and toggling classes. The source can be any property or function in the view model&#39;s data heirarchy. See the binding documentation for more information, or jump to the following examples:' +
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
                            'Example: binding class name toggles' +
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
                '<p>' +
                    'Having hardcoded values in a view model is fine for static or default values, but really the consumer of the view should be able instantiate your view easily and pass along state that overrides those defaults.' +
                '</p>' +
                '<p>' +
                    'In the example below, we define an App view that renders two instances of the FavoriteThings control within using the' +
                    '<span class="ref">' +
                        'js-view' +
                    '</span>' +
                    'element. The' +
                    '<span class="ref">' +
                        'js-name' +
                    '</span>' +
                    'attribute defines the member name of the child, in case we want to reference it later in a view base. The' +
                    '<span class="ref">' +
                        'js-type' +
                    '</span>' +
                    'attribute defines the view type, which the generated class will automatically import and inject in the generated markup. The' +
                    '<span class="ref">' +
                        'js-data' +
                    '</span>' +
                    'attribute is used to pass along a value in the parent&#39;s view model.' +
                '</p>' +
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
