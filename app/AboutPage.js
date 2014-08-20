var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'AboutPageModel', 'AboutPageBase', 'ExamplePane', 'DomUtils', 'AboutPage.css'], function(require, exports, AboutPageModel, AboutPageBase, ExamplePane, DomUtils, AboutPagecss) {
    DomUtils.loadStyles(AboutPagecss.styles);

    var AboutPage = (function (_super) {
        __extends(AboutPage, _super);
        function AboutPage() {
            _super.apply(this, arguments);
            this.viewName = 'AboutPage';
            this.viewModelType = AboutPageModel;
            this.viewsExamplePane = this.addChild(new ExamplePane());
            this.viewModelsExamplePane = this.addChild(new ExamplePane());
            this.viewInViewExamplePane = this.addChild(new ExamplePane());
            this.eventingExamplePane = this.addChild(new ExamplePane());
        }
        AboutPage.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.viewsExamplePane.setData(this.getValue('viewsExample'));
            this.viewModelsExamplePane.setData(this.getValue('viewModelsExample'));
            this.viewInViewExamplePane.setData(this.getValue('viewInViewExample'));
            this.eventingExamplePane.setData(this.getValue('eventingExample'));
        };

        AboutPage.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "c-AboutPage page"], null, [
                _this._ce("p", ["class", "warn"], null, [
                    _this._ct("Warning: design is being reviewed and instructions subject to change.")
                ]),
                _this._ce("h1", [], null, [
                    _this._ct("OneJS is a toolset for building reusable web things.")
                ]),
                _this._ce("p", [], null, [
                    _this._ce("b", [], null, [
                        _this._ct("Don't think of it as \"yet another JavaScript framework.\"")
                    ]),
                    _this._ct("It's a small set of JavaScript classes that provide a common core for producing reusable control libraries while minimizing impact on file size.")
                ]),
                _this._ce("p", [], null, [
                    _this._ce("b", [], null, [
                        _this._ct("You only load what you need.")
                    ]),
                    _this._ct("Everything is modular and is required using "),
                    _this._ce("a", ["href", "http://requirejs.org/"], null, [
                        _this._ct("RequireJS.")
                    ]),
                    _this._ct(" If you only need the View class, you only bundle that with your code. If you use repeat blocks, you include the Repeater class. If you use Selection, you include that. Grow your core only as big as you need it to be. A barebones reusable web component, merged with the common core only adds 3k to the package. No more demanding yet another framework on their site.")
                ]),
                _this._ce("p", [], null, [
                    _this._ce("b", [], null, [
                        _this._ct("Start with html and css, make it reusable.")
                    ]),
                    _this._ct(" Creating an easily instantiatable JavaScript view class is a matter of adding tags around your markup and piping it through a template compiler.")
                ]),
                _this._ce("p", [], null, [
                    _this._ce("b", [], null, [
                        _this._ct("Simple to understand.")
                    ]),
                    _this._ct(" HTML templates compile to easily consumable JavaScript classes, so that they can be reused over and over.")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("OneJS consists of")
                ]),
                _this._ce("ol", [], null, [
                    _this._ce("li", [], null, [
                        _this._ct("A "),
                        _this._ce("a", ["href", "https://github.com/dzearing/onejs", "target", "_blank"], null, [
                            _this._ct("OneJS")
                        ]),
                        _this._ct(" core JavaScript library.")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("A "),
                        _this._ce("a", ["href", "https://github.com/dzearing/onejs-compiler", "target", "_blank"], null, [
                            _this._ct("template compiler")
                        ]),
                        _this._ct(" that can validate your html and binding correctness, and output a JavaScript or TypeScript class which can be instantiated and rendered. Available as a "),
                        _this._ce("a", ["href", "https://github.com/dzearing/gulp-onejs-compiler", "target", "_blank"], null, [
                            _this._ct("gulp plugin.")
                        ])
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("A "),
                        _this._ce("a", ["href", "http://github.com/dzearing/gulp-csstojs", "target", "_blank"], null, [
                            _this._ct("css to js converter")
                        ]),
                        _this._ct(" that converts css into a JavaScript module which can be bundled, loaded on demand, and remapped for localization purposes.")
                    ])
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Try it")
                ]),
                _this._ce("p", [], null, [
                    _this._ce("b", [], null, [
                        _this._ct("1.")
                    ]),
                    _this._ct("Install "),
                    _this._ce("a", ["href", "http://nodejs.org/", "target", "_blank"], null, [
                        _this._ct("node.js")
                    ]),
                    _this._ct(". We use node to build stuff and run tests. We also use "),
                    _this._ce("a", ["href", "http://gulpjs.com", "target", "_blank"], null, [
                        _this._ct("gulp")
                    ]),
                    _this._ct(" as our build tool of choice.")
                ]),
                _this._ce("p", [], null, [
                    _this._ce("b", [], null, [
                        _this._ct("2.")
                    ]),
                    _this._ct("Get to a command line where you can run \"npm\" and install the OneJS project generator.")
                ]),
                _this._ce("p", ["class", "code"], null, [
                    _this._ct("npm install -g generator-onejs")
                ]),
                _this._ce("p", [], null, [
                    _this._ce("b", [], null, [
                        _this._ct("3.")
                    ]),
                    _this._ct(" Make a new directory, and cd into it.")
                ]),
                _this._ce("p", ["class", "code"], null, [
                    _this._ct("mkdir my-onejs-project && cd $_")
                ]),
                _this._ce("p", [], null, [
                    _this._ce("b", [], null, [
                        _this._ct("4.")
                    ]),
                    _this._ct("Run the generator to generate a new OneJS view project. Follow the prompts, etc.")
                ]),
                _this._ce("p", ["class", "code"], null, [
                    _this._ct("yo onejs")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("Spin up a server/browser with watch/livereload support, which will auto build your stuff and refresh your page:")
                ]),
                _this._ce("p", ["class", "code"], null, [
                    _this._ct("gulp serve")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("You should see a browser open with an example page. "),
                    _this._ce("a", ["href", "#/tutorial"], null, [
                        _this._ct("Proceed to the tutorial and start making reusable stuff!")
                    ])
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("How it works")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("OneJS encourages a separation between view and view models. You can build easy to consume, easy to reuse components that can be shared and reused.")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Views")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("Let's start with a view template. A view template is defined by a "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("js-view")
                    ]),
                    _this._ct(" element, with a "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("js-type")
                    ]),
                    _this._ct(" attribute indicating the class name. Within it, you can put whatever markup you want. This is piped through the onejs-compiler (here, running in the browser) which can output the view to a JavaScript (or TypeScript) class which can be intantiated and rendered on demand:")
                ]),
                _this.viewsExamplePane.renderElement(),
                _this._ce("p", [], null, [
                    _this._ct("If you inspect the TypeScript tab, you will see a View subclass with a small set of imports and a render function that returns a string. This is generated by the OneJS compiler, which is available as a "),
                    _this._ce("a", ["href", "http://github.com/dzearing/gulp-onejs-compiler"], null, [
                        _this._ct("gulp")
                    ]),
                    _this._ct(" plugin. We can instantiate that class and call its "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("renderHtml")
                    ]),
                    _this._ct(" method to programatically get the content as a string, which we can innerHTML into the page.")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("View models and binding")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("Now we have a class that can render our markup, but it's values are hardcoded. To make this component dynamic, we should set up a view model to hold default states, so that they can be changed independently of the view. To do this, we add the "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("js-model")
                    ]),
                    _this._ct(" attribute to the view, and add "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("js-bind")
                    ]),
                    _this._ct(" binding attributes to the various elements to map what property goes where.")
                ]),
                _this.viewModelsExamplePane.renderElement(),
                _this._ce("p", [], null, [
                    _this._ct("The "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("js-bind")
                    ]),
                    _this._ct(" attribute has support for binding text, html, attributes, css values, and toggling classes. The source can be any property or function in the view model's data heirarchy. See the binding documentation for more information, or jump to the following examples:")
                ]),
                _this._ce("ul", [], null, [
                    _this._ce("li", [], null, [
                        _this._ce("a", ["href", "#/docs"], null, [
                            _this._ct("Example: binding text")
                        ])
                    ]),
                    _this._ce("li", [], null, [
                        _this._ce("a", ["href", "#/docs"], null, [
                            _this._ct("Example: binding html")
                        ])
                    ]),
                    _this._ce("li", [], null, [
                        _this._ce("a", ["href", "#/docs"], null, [
                            _this._ct("Example: binding attributes")
                        ])
                    ]),
                    _this._ce("li", [], null, [
                        _this._ce("a", ["href", "#/docs"], null, [
                            _this._ct("Example: binding class name toggles")
                        ])
                    ]),
                    _this._ce("li", [], null, [
                        _this._ce("a", ["href", "#/docs"], null, [
                            _this._ct("Example: repeating")
                        ])
                    ]),
                    _this._ce("li", [], null, [
                        _this._ce("a", ["href", "#/docs"], null, [
                            _this._ct("Example: conditionals")
                        ])
                    ])
                ]),
                _this._ce("p", [], null, [
                    _this._ct("This is where a gulp or grunt build workflow keeps things refreshed. We use a generator that can read the xhtml template, and generate a JavaScript or TypeScript class for anyone to consume. The class has a list of OneJS AMD dependencies, which means that we can use the build workflow to easily package up JavaScript dependencies together.")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Using the view in other views")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("Having hardcoded values in a view model is fine for static or default values, but really the consumer of the view should be able instantiate your view easily and pass along state that overrides those defaults.")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("In the example below, we define an App view that renders two instances of the FavoriteThings control within using the "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("js-view")
                    ]),
                    _this._ct(" element. The "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("js-name")
                    ]),
                    _this._ct(" attribute defines the member name of the child, in case we want to reference it later in a view base. The "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("js-type")
                    ]),
                    _this._ct(" attribute defines the view type, which the generated class will automatically import and inject in the generated markup. The "),
                    _this._ce("span", ["class", "ref"], null, [
                        _this._ct("js-data")
                    ]),
                    _this._ct(" attribute is used to pass along a value in the parent's view model.")
                ]),
                _this.viewInViewExamplePane.renderElement(),
                _this._ce("h2", [], null, [
                    _this._ct("Adding eventing")
                ]),
                _this._ce("p", ["class", "warn"], null, [
                    _this._ct("This is TBD. Element events probably should only be directly hooked up to the view itself, not to the view model. However there can be utilities to auto forward calls to the view model to make the \"consumer provides the handler\" scenario require no code.")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("Eventing in OneJS templates can be handled in a few different ways:")
                ]),
                _this._ce("ul", [], null, [
                    _this._ce("li", [], null, [
                        _this._ct("Auto bind an event to a handler on the view model using the "),
                        _this._ce("span", ["class", "ref"], null, [
                            _this._ct("js-userAction")
                        ]),
                        _this._ct(" attribute. This is useful when a consumer of the view might want to pass in their event handling implementation to the view.")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Bind an event to a helper to do common things, like "),
                        _this._ce("span", ["class", "ref"], null, [
                            _this._ct("$toggle")
                        ]),
                        _this._ct(", shown below, which can toggle a state.")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Manually bind events within a base view. (TBD. This might be auto.) This is typically done when the event handling should be abstracted from the consumer. The base view can for example gather DOM state and translate that state to the view model.")
                    ])
                ]),
                _this.eventingExamplePane.renderElement(),
                _this._ce("h2", [], null, [
                    _this._ct("Adding view specific logic")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Merge your styles in")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Using resources and avoiding singletons")
                ])
            ]));
        };
        return AboutPage;
    })(AboutPageBase);

    
    return AboutPage;
});
