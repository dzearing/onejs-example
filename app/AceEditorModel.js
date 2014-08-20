var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ViewModel'], function(require, exports, ViewModel) {
    var AceEditorModel = (function (_super) {
        __extends(AceEditorModel, _super);
        function AceEditorModel() {
            _super.apply(this, arguments);
            this.key = 'html';
            this.editorType = 'html';
            this.content = '<div>Hello world</div>';
        }
        return AceEditorModel;
    })(ViewModel);

    
    return AceEditorModel;
});
