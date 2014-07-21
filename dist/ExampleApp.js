var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View', 'Encode', 'ExampleAppModel', 'Header'], function(require, exports, View, Encode, ExampleAppModel, Header) {
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
                    "html": "paragraphHtml1",
                    "css": {
                        "display": "isVisible"
                    }
                },
                {
                    "id": "2",
                    "html": "paragraphHtml2"
                },
                {
                    "id": "3",
                    "className": {
                        "myclass": "isSeperatorVisible"
                    }
                },
                {
                    "id": "4",
                    "events": {
                        "click": "onClick"
                    }
                }
            ];

            this.viewName = 'ExampleApp';
            this.viewModelType = ExampleAppModel;
            this.addChild(this.header = new Header());
        }
        ExampleApp.prototype.onRenderHtml = function (viewModel) {
            return '' + '<' + this.baseTag + ' id="' + this.id + '_0" ' + View.genStyle(this.baseStyle) + ' ' + View.genClass('foo' + this.baseClass) + '>' + this.header.renderHtml() + '<div id="' + this.id + '_1" ' + View.genStyle('', ['display', 'isVisible']) + '>' + Encode.toSafe(viewModel.paragraphHtml1) + '</div>' + '<div></div>' + '<div id="' + this.id + '_2">' + Encode.toSafe(viewModel.paragraphHtml2) + '</div>' + '<div id="' + this.id + '_3" ' + View.genClass('seperator', ['myclass', 'isSeperatorVisible']) + '></div>' + '<button id="' + this.id + '_4">' + 'Click me' + '</button>' + '</' + this.baseTag + '>' + '';
        };
        return ExampleApp;
    })(View);

    
    return ExampleApp;
});
