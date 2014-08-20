var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ExamplePaneModel', 'View', 'ExamplePaneBase', 'Repeater', 'AceEditor', 'DomUtils', 'ExamplePane.css'], function(require, exports, ExamplePaneModel, View, ExamplePaneBase, Repeater, AceEditor, DomUtils, ExamplePanecss) {
    DomUtils.loadStyles(ExamplePanecss.styles);

    var ExamplePaneBlock0Item = (function (_super) {
        __extends(ExamplePaneBlock0Item, _super);
        function ExamplePaneBlock0Item() {
            _super.apply(this, arguments);
            this.viewName = 'ExamplePaneBlock0Item';
            this.editor = this.addChild(new AceEditor());
            this._bindings = [
                {
                    "id": "0",
                    "className": {
                        "isSelected": "$parent.isPaneSelected"
                    }
                },
                {
                    "id": "1",
                    "text": "pane.title",
                    "events": {
                        "click": [
                            "$view.send('pane.key', '$parent.selectedPane')"
                        ]
                    }
                }
            ];
        }
        ExamplePaneBlock0Item.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.editor.setData(this.getValue('pane'));
        };

        ExamplePaneBlock0Item.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "pane"], bindings[0], [
                _this._ce("div", ["class", "title"], bindings[1]),
                _this.editor.renderElement()
            ]));
        };
        return ExamplePaneBlock0Item;
    })(View);

    var ExamplePaneBlock0 = (function (_super) {
        __extends(ExamplePaneBlock0, _super);
        function ExamplePaneBlock0() {
            _super.apply(this, arguments);
            this.viewName = 'ExamplePaneBlock0';
            this.childViewType = ExamplePaneBlock0Item;
            this.itemName = "pane";
            this._bindings = [
                {
                    "id": "0",
                    "childId": "surface"
                }
            ];
        }
        ExamplePaneBlock0.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", [], bindings[0], this.getChildElements()));
        };
        return ExamplePaneBlock0;
    })(Repeater);

    var ExamplePane = (function (_super) {
        __extends(ExamplePane, _super);
        function ExamplePane() {
            _super.apply(this, arguments);
            this.viewName = 'ExamplePane';
            this.viewModelType = ExamplePaneModel;
            this.examplePaneBlock0 = this.addChild(new ExamplePaneBlock0());
            this._bindings = [
                {
                    "id": "0",
                    "className": {
                        "showResults": "isResultPaneVisible"
                    }
                },
                {
                    "id": "1",
                    "className": {
                        "isSelected": "isResultPaneVisible"
                    }
                },
                {
                    "id": "2",
                    "events": {
                        "click": [
                            "$view.toggle('isResultPaneVisible')"
                        ]
                    }
                },
                {
                    "id": "3",
                    "childId": "resultFrame"
                }
            ];
        }
        ExamplePane.prototype.onInitialize = function () {
            _super.prototype.onInitialize.call(this);
            this.examplePaneBlock0.owner = this;
        };

        ExamplePane.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.examplePaneBlock0.setData({ items: this.getValue('panes') });
        };

        ExamplePane.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "c-ExamplePane"], bindings[0], [
                _this._ce("div", ["class", "tab2col1"], null, [
                    _this.examplePaneBlock0.renderElement()
                ]),
                _this._ce("div", ["class", "tab2col2"], null, [
                    _this._ce("div", ["class", "pane"], bindings[1], [
                        _this._ce("div", ["class", "title"], bindings[2], [
                            _this._ct("Result")
                        ]),
                        _this._ce("div", ["class", "edit"], null, [
                            _this._ce("iframe", ["class", "result"], bindings[3])
                        ])
                    ])
                ])
            ]));
        };
        return ExamplePane;
    })(ExamplePaneBase);

    
    return ExamplePane;
});
