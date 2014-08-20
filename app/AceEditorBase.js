var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View'], function(require, exports, View) {
    var AceEditorBase = (function (_super) {
        __extends(AceEditorBase, _super);
        function AceEditorBase() {
            _super.apply(this, arguments);
        }
        AceEditorBase.prototype.onActivate = function () {
            var _this = this;

            require(['ace'], function () {
                if (_this._state == 2) {
                    var editor = _this._editor = ace.edit(_this.subElements.editor);
                    var viewModel = _this.getViewModel();

                    _this._editor.getSession().setMode('ace/mode/' + viewModel.editorType);
                    editor.setValue(viewModel.content);
                }
            });
        };

        AceEditorBase.prototype.onDeactivate = function () {
        };
        return AceEditorBase;
    })(View);

    
    return AceEditorBase;
});
