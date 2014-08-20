import AceEditorModel = require('AceEditorModel');
import View = require('View');
import AceEditorBase = require('AceEditorBase');

class AceEditor extends AceEditorBase {
    viewName = 'AceEditor';
    viewModelType = AceEditorModel;

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","edit"], bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "attr": {
                "data-key": "key"
            },
            "childId": "editor"
        }
    ];
}

export = AceEditor;
