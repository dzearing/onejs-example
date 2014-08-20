var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'AceEditorModel', 'AceEditorBase'], function(require, exports, AceEditorModel, AceEditorBase) {
    var AceEditor = (function (_super) {
        __extends(AceEditor, _super);
        function AceEditor() {
            _super.apply(this, arguments);
            this.viewName = 'AceEditor';
            this.viewModelType = AceEditorModel;
            this._bindings = [
                {
                    "id": "0",
                    "attr": {
                        "data-key": "key"
                    },
                    "childId": "editor"
                }
            ];
        }
        AceEditor.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "edit"], bindings[0]));
        };
        return AceEditor;
    })(AceEditorBase);

    
    return AceEditor;
});
