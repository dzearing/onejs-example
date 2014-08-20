import ViewModel = require('ViewModel');

class AceEditorModel extends ViewModel {
    key = 'html';
    editorType = 'html';
    content = '<div>Hello world</div>';
}

export = AceEditorModel;