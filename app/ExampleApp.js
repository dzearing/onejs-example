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
            _super.prototype.onViewModelChanged.call(this);
            this.header.setData({ commands: this.getValue('pageCommands'), selectedCommand: this.getValue('selectedPage') });
            this.content.setData({ contentType: this.getValue('selectedPage.viewType') });
        };

        ExampleApp.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "c-ExampleApp"], null, [
                _this.header.renderElement(),
                _this._ce("div", ["class", "centered"], null, [
                    _this.content.renderElement()
                ])
            ]));
        };
        return ExampleApp;
    })(ExampleAppBase);

    
    return ExampleApp;
});
