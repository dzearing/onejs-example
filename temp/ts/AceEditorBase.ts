import View = require('View');

class AceEditorBase extends View {
    _editor;

    onActivate() {
        var _this = this;

        require(['ace'], function() {
            if (_this._state == 2) {
                var editor = _this._editor = ace.edit(_this.subElements.editor);
                var viewModel = _this.getViewModel();

                _this._editor.getSession().setMode('ace/mode/' + viewModel.editorType);
                editor.setValue(viewModel.content);
            }
        });
    }

    onDeactivate() {

    }
}

export = AceEditorBase;