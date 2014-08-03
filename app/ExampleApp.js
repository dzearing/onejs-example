var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ExampleAppModel', 'ExampleAppBase', 'Header', 'ContentControl', 'DomUtils', 'ExampleApp.css'], function(require, exports, ExampleAppModel, ExampleAppBase, Header, ContentControl, DomUtils, ExampleAppcss) {
    DomUtils.loadStyles(ExampleAppcss.styles);

    var ExampleApp = (function (_super) {
        __extends(ExampleApp, _super);
        function ExampleApp() {
            _super.apply(this, arguments);
            this.viewName = 'ExampleApp';
            this.viewModelType = ExampleAppModel;
            this.header = this.addChild(new Header());
            this.content = this.addChild(new ContentControl());
        }
        ExampleApp.prototype.onViewModelChanged = function () {
            this.content.setData({ contentType: this.getValue('pageType') });
        };

        ExampleApp.prototype.onRenderHtml = function () {
            return '' + '<div class="c-ExampleApp">' + this.header.renderHtml() + '<div class="centered">' + this.content.renderHtml() + '</div>' + '</div>' + '';
        };
        return ExampleApp;
    })(ExampleAppBase);

    
    return ExampleApp;
});
