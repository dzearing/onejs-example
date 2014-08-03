import View = require('View');
import TypeScriptGenerator = require('TypeScriptGenerator');

class ExamplePaneBase extends View {

    _editors = {};

    onActivate() {
        this._findEditors();
        this._initializeEditors();
    }

    _findEditors() {
        var _this = this;

        _this._editors = {};

        var panes = _this.getViewModel().data.panes;

        for (var paneIndex = 0; paneIndex < panes.length; paneIndex++) {
            var pane = panes[paneIndex];

            if (pane.hasEditor) {
                _this._editors[pane.key] = {
                    pane: pane
                };
            }
        }


        findEditorElements(_this.children);

        function findEditorElements(childViews) {
            for (var i = 0; i < childViews.length; i++) {
                var view = childViews[i];

                if (view._subElements && view._subElements.editor) {
                    var key = view._subElements.editor.getAttribute('data-key');

                    if (_this._editors[key]) {
                        _this._editors[key].element = view._subElements.editor;
                    }
                }

                findEditorElements(view.children);
            }
        }
    }

    _initializeEditors() {
        var _this = this;

        require(['ace'], function() {
            if (_this._state == 2) {


                for (var editorKey in _this._editors) {
                    var editorEntry = _this._editors[editorKey];
                    var editor;

                    editorEntry.editor = editor = ace.edit(editorEntry.element.id);
                    editor.getSession().setMode('ace/mode/' + editorEntry.pane.editorType);
                    editor.setValue(editorEntry.pane.content);

                    if (editorEntry.pane.updatesResults) {
                        editor.getSession().on('change', updateEditors);
                    }

                    editor.clearSelection();

                }

                updateEditors();
            }

            function updateEditors() {
                _this._updateViewGeneration();
                _this._updateResult();
            }
        });

    }

    _updateViewGeneration() {
        if (this._editors['html'] && this._editors['viewtemplate']) {
            var generator = new TypeScriptGenerator();
            var val = this._editors['html'].editor.getValue();

            try {
                val = generator.generate(val);
            } catch (e) {
                val = e;
            }

            val = val || '';

            this._editors['viewtemplate'].editor.setValue(val);
        }
    }

    _updateResult() {
        var iframeDoc = this._subElements.resultFrame.contentWindow.document;

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