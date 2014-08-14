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
    viewInViewExamplePane = <any>this.addChild(new ExamplePane());
    eventingExamplePane = <any>this.addChild(new ExamplePane());

    onViewModelChanged() {
        super.onViewModelChanged();
        this.viewsExamplePane.setData(this.getValue('viewsExample'));
        this.viewModelsExamplePane.setData(this.getValue('viewModelsExample'));
        this.viewInViewExamplePane.setData(this.getValue('viewInViewExample'));
        this.eventingExamplePane.setData(this.getValue('eventingExample'));
    }

    onRenderHtml(): string {
        return '' +
            '<div class="c-AboutPage page">' +
                '<h1>' +
                    'OneJS is a toolset for building reusable web things.' +
                '</h1>' +
                '<p class="warn">' +
                    'Warning: design is being reviewed and instructions subject to change.' +
                '</p>' +
                '<p>' +
                    '<b>' +
                        'Don&#39;t think of it as &quot;yet another JavaScript framework.&quot;' +
                    '</b>' +
                    'It&#39;s a small set of JavaScript classes that provide a common core for producing reusable control libraries while minimizing impact on file size.' +
                '</p>' +
                '<p>' +
                    '<b>' +
                        'You only load what you need.' +
                    '</b>' +
                    'Everything is modular and is required using' +
                    '<a href="http://requirejs.org/">' +
                        'RequireJS.' +
                    '</a>' +
                    'If you only need the View class, you only bundle that with your code. If you use repeat blocks, you include the Repeater class. If you use Selection, you include that. Grow your core only as big as you need it to be. A barebones reusable web component, merged with the common core only adds 3k to the package. No more demanding yet another framework on their site.' +
                '</p>' +
                '<p>' +
                    '<b>' +
                        'Start with html and css, make it reusable.' +
                    '</b>' +
                    'Creating an easily instantiatable JavaScript view class is a matter of adding tags around your markup and piping it through a template compiler.' +
                '</p>' +
                '<p>' +
                    '<b>' +
                        'Simple to understand.' +
                    '</b>' +
                    'HTML templates compile to easily understandable JavaScript classes, so that they can be reused over and over.' +
                '</p>' +
                '<h2>' +
                    'OneJS consists of' +
                '</h2>' +
                '<ol>' +
                    '<li>' +
                        'A' +
                        '<a href="https://github.com/dzearing/onejs" target="_blank">' +
                            'OneJS' +
                        '</a>' +
                        'core JavaScript library.' +
                    '</li>' +
                    '<li>' +
                        'A' +
                        '<a href="https://github.com/dzearing/onejs-compiler" target="_blank">' +
                            'template compiler' +
                        '</a>' +
                        'that can validate your html and binding correctness, and output a JavaScript or TypeScript class which can be instantiated and rendered. Available as a' +
                        '<a href="https://github.com/dzearing/gulp-onejs-compiler" target="_blank">' +
                            'gulp plugin.' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        'A' +
                        '<a href="http://github.com/dzearing/gulp-csstojs" target="_blank">' +
                            'css to js converter' +
                        '</a>' +
                        'that converts css into a JavaScript module which can be bundled, loaded on demand, and remapped for localization purposes.' +
                    '</li>' +
                '</ol>' +
                '<h2>' +
                    'Try it' +
                '</h2>' +
                '<p>' +
                    '<b>' +
                        'Step 1.' +
                    '</b>' +
                    'Install' +
                    '<a href="http://nodejs.org/" target="_blank">' +
                        'node.js' +
                    '</a>' +
                    '. We use node to build stuff and run tests. We also use' +
                    '<a href="http://gulpjs.com" target="_blank">' +
                        'gulp' +
                    '</a>' +
                    'as our build tool of choice.' +
                '</p>' +
                '<p>' +
                    '<b>' +
                        'Step 2.' +
                    '</b>' +
                    'Get to a command line where you can run &quot;npm&quot; and install the OneJS project generator.' +
                '</p>' +
                '<p class="code">' +
                    'npm install -g generator-onejs' +
                '</p>' +
                '<p>' +
                    '<b>' +
                        'Step 3.' +
                    '</b>' +
                    'Make a new directory, and cd into it.' +
                '</p>' +
                '<p class="code">' +
                    'mkdir my-onejs-project &amp;&amp; cd $_' +
                '</p>' +
                '<p>' +
                    '<b>' +
                        'Step 4.' +
                    '</b>' +
                    'Run the generator to generate a new OneJS view project. Follow the prompts, etc.' +
                '</p>' +
                '<p class="code">' +
                    'yo onejs' +
                '</p>' +
                '<p>' +
                    'Spin up a server/browser with watch/livereload support, which will auto build your stuff and refresh your page:' +
                '</p>' +
                '<p class="code">' +
                    'gulp serve' +
                '</p>' +
                '<p>' +
                    'You should see a browser open with an example page.' +
                    '<a href="#/tutorial">' +
                        'Proceed to the tutorial and start making reusable stuff!' +
                    '</a>' +
                '</p>' +
                '<h2>' +
                    'How it works' +
                '</h2>' +
                '<p>' +
                    'Making web content that renders on the client and can be easily reused should be simple. So lets start with simple. I mocked up a contact card.' +
                '</p>' +
                '<div class="code">' +
                    'Example here' +
                '</div>' +
                '<h2>' +
                    'Get started now' +
                '</h2>' +
                '<div class="code">' +
                    '<div>' +
                        'git clone https://github.com/dzearing/onejs-example' +
                    '</div>' +
                    '<div>' +
                        'cd onejs-example' +
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
                this.viewInViewExamplePane.renderHtml() +
                '<h2>' +
                    'Adding eventing' +
                '</h2>' +
                '<p class="warn">' +
                    'This is TBD. Element events probably should only be directly hooked up to the view itself, not to the view model. However there can be utilities to auto forward calls to the view model to make the &quot;consumer provides the handler&quot; scenario require no code.' +
                '</p>' +
                '<p>' +
                    'Eventing in OneJS templates can be handled in a few different ways:' +
                '</p>' +
                '<ul>' +
                    '<li>' +
                        'Auto bind an event to a handler on the view model using the' +
                        '<span class="ref">' +
                            'js-userAction' +
                        '</span>' +
                        'attribute. This is useful when a consumer of the view might want to pass in their event handling implementation to the view.' +
                    '</li>' +
                    '<li>' +
                        'Bind an event to a helper to do common things, like' +
                        '<span class="ref">' +
                            '$toggle' +
                        '</span>' +
                        ', shown below, which can toggle a state.' +
                    '</li>' +
                    '<li>' +
                        'Manually bind events within a base view. (TBD. This might be auto.) This is typically done when the event handling should be abstracted from the consumer. The base view can for example gather DOM state and translate that state to the view model.' +
                    '</li>' +
                '</ul>' +
                this.eventingExamplePane.renderHtml() +
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
