var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View', 'TypeScriptGenerator'], function(require, exports, View, TypeScriptGenerator) {
    var ExamplePaneBase = (function (_super) {
        __extends(ExamplePaneBase, _super);
        function ExamplePaneBase() {
            _super.apply(this, arguments);
            this._editorId = this.id + 'editor';
            this._editors = {};
        }
        ExamplePaneBase.prototype.onActivate = function () {
            this._findEditors();
        };

        ExamplePaneBase.prototype._findEditors = function () {
            var _this = this;

            require(['ace'], function () {
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
        };

        ExamplePaneBase.prototype._findEditorElements = function (childViews) {
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
        };

        ExamplePaneBase.prototype._initializeEditors = function () {
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
        };

        ExamplePaneBase.prototype._updateViewGeneration = function () {
            var templatePane = this._editors['viewtemplate'];

            if (this._editors['html'] && templatePane) {
                var generator = new TypeScriptGenerator();
                var val = this._editors['html'].editor.getValue();

                try  {
                    val = generator.generate(val);
                } catch (e) {
                    val = e.message;
                }

                val = val || '';

                templatePane.editor.setValue(val);
                templatePane.editor.clearSelection();
            }
        };

        ExamplePaneBase.prototype._updateResult = function () {
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
        };
        return ExamplePaneBase;
    })(View);

    
    return ExamplePaneBase;
});
