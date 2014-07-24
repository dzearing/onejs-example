var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View', 'ExampleAppModel', 'Header', 'ExampleApp.css'], function(require, exports, View, ExampleAppModel, Header, ExampleAppcss) {
    View.loadStyles(ExampleAppcss.styles);

    var ExampleApp = (function (_super) {
        __extends(ExampleApp, _super);
        function ExampleApp(data) {
            _super.call(this, data);
            this._bindings = [
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

            this.viewName = 'ExampleApp';
            this.baseClass = 'c-' + this.viewName + (this.baseClass ? ' ' : '');
            this.viewModelType = ExampleAppModel;
            this.addChild(this.header = new Header({ items: [{ name: 'Create' }, { name: 'Share' }, { name: 'Discover' }] }));
        }
        ExampleApp.prototype.onRenderHtml = function (viewModel) {
            return '' + '<' + this.baseTag + ' id="' + this.id + '_0" ' + this.genStyle(this.baseStyle) + ' ' + this.genClass('foo ' + this.baseClass) + '>' + this.header.renderHtml() + '<div class="centered">' + '<div class="page">' + '<h1>' + 'OneJS is a tiny web framework.' + '</h1>' + '<p>' + 'OneJS enables you to build easily reusable web components. They can be easily reused and redistributed as JavaScript files that can be included via RequireJS AMD modules.' + '</p>' + '<h2 js-userActionTODOEXAMPLE="click:toggle(showBenefits)">' + 'Why' + '</h2>' + '<ul id="' + this.id + '_1" ' + this.genClass('', ['sectionVisible', 'showBenefits']) + '>' + '<li>' + 'Performance first, no fluffy parsing the DOM for bindings at runtime.' + '</li>' + '<li>' + 'Small footprint. (8k minified, 5k gzipped)' + '</li>' + '<li>' + 'Easy to iterate with. Start with markup, build a view model for it when you&#39;re ready.' + '</li>' + '<li>' + 'No dependencies on experimental browser features, external libraries.' + '</li>' + '<li>' + 'TypeScript used as an intermediate output to enforce static code analysis.' + '</li>' + '<li>' + 'Less css friendly.' + '</li>' + '</ul>' + '<h2>' + 'How it works' + '</h2>' + '<p>' + 'You write a view template for your component:' + '</p>' + '<pre>' + 'Example' + '</pre>' + '<p>' + 'They compile to anything to you want. You can add your own generators here. Our default compiler pregenerates a TypeScript class, because we love static code analysis! Example:' + '</p>' + '<pre>' + 'TypeScript example here' + '</pre>' + '<p>' + '...of course, the build system can continue to produce JavaScript:' + '</p>' + '<pre>' + 'JavaScript compiled output here' + '</pre>' + '<p>' + 'To use, you simply use RequireJS to load your main JavaScript:' + '</p>' + '<pre>' + 'Example html page loading module' + '</pre>' + '</div>' + '</div>' + '<section page="create"></section>' + '</' + this.baseTag + '>' + '';
        };
        return ExampleApp;
    })(View);

    
    return ExampleApp;
});
