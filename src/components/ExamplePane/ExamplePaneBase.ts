import View = require('View');
import TypeScriptGenerator = require('TypeScriptGenerator');

class ExamplePaneBase extends View {
    _editorId = this.id + 'editor';
    _editors = {};

    onActivate() {
        this._findEditors();
    }

    _findEditors() {
        var _this = this;

        require(['ace'], function() {
            if (_this._state == 2) {

                _this._editors = {};

                var panes = _this.getViewModel().panes;

                for (var paneIndex = 0; paneIndex < panes.length; paneIndex++) {
                    var pane = panes[paneIndex];

                    if (pane.hasEditor) {
                        _this._editors[pane.key] = {
                            pane: pane,
                            editor: null
                        };
                    }
                }

                _this._findEditorElements(_this.children);
                _this._initializeEditors();
            }
        });
    }

    _findEditorElements(childViews) {
        var _this = this;

        for (var i = 0; i < childViews.length; i++) {
            var view = childViews[i];

            if (view.subElements && view.subElements.editor) {
                var key = view.subElements.editor.getAttribute('data-key');

                if (_this._editors[key]) {
                    _this._editors[key].editor = view._editor;
                    _this._editors[key].element = view.subElements.editor;
                }
            }

            _this._findEditorElements(view.children);
        }
    }

    _initializeEditors() {
        var _this = this;

        for (var editorKey in _this._editors) {
            var editorEntry = _this._editors[editorKey];
            var editor = editorEntry.editor;

            if (editorEntry.pane.updatesResults) {
                editor.getSession().on('change', updateEditors);
            }

            editor.clearSelection();
        }

        updateEditors();

        function updateEditors() {
            _this._updateViewGeneration();
            _this._updateResult();
        }
    }

    _updateViewGeneration() {
        var templatePane = this._editors['viewtemplate'];

        if (this._editors['html'] && templatePane) {
            var generator = new TypeScriptGenerator();
            var val = this._editors['html'].editor.getValue();

            try {
                val = generator.generate(val);
            } catch (e) {
                val = e.message;
            }

            val = val || '';

            templatePane.editor.setValue(val);
            templatePane.editor.clearSelection();
        }
    }

    _updateResult() {
        var iframeDoc = this.subElements.resultFrame.contentWindow.document;

        iframeDoc.open();

        var content = '<!doctype html>';

        content += '<html>';
        content += '<head>';
        content += '<style>';
        if (this._editors['less']) {
            content += this._editors['less'].editor.getValue();
        }
        content += '</style>';
        content += '</head>';
        content += '<body>';

        if (this._editors['html']) {
            content += this._editors['html'].editor.getValue();
        }

        content += '</body>';
        content += '</html>';

        iframeDoc.write(content);
        iframeDoc.close();
    }
}

export = ExamplePaneBase;