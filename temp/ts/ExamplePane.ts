import ExamplePaneModel = require('ExamplePaneModel');
import View = require('View');
import ExamplePaneBase = require('ExamplePaneBase');
import Repeater = require('Repeater');
import AceEditor = require('AceEditor');
import DomUtils = require('DomUtils');
import ExamplePanecss = require('ExamplePane.css');

DomUtils.loadStyles(ExamplePanecss.styles);

class ExamplePaneBlock0Item extends View {
    viewName = 'ExamplePaneBlock0Item';
    editor = <any>this.addChild(new AceEditor());

    onViewModelChanged() {
        super.onViewModelChanged();
        this.editor.setData(this.getValue('pane'));
    }

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","pane"], bindings[0], [
            _this._ce("div", ["class","title"], bindings[1]),
            _this.editor.renderElement()
        ]));
    }

    _bindings = [
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

class ExamplePaneBlock0 extends Repeater {
    viewName = 'ExamplePaneBlock0';
    childViewType = ExamplePaneBlock0Item;
    itemName = "pane";

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", [], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class ExamplePane extends ExamplePaneBase {
    viewName = 'ExamplePane';
    viewModelType = ExamplePaneModel;
    examplePaneBlock0 = <any>this.addChild(new ExamplePaneBlock0());

    onInitialize() {
        super.onInitialize();
        this.examplePaneBlock0.owner = this;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.examplePaneBlock0.setData({ items: this.getValue('panes') });
    }

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","c-ExamplePane"], bindings[0], [
            _this._ce("div", ["class","tab2col1"], null, [
                _this.examplePaneBlock0.renderElement()
            ]),
            _this._ce("div", ["class","tab2col2"], null, [
                _this._ce("div", ["class","pane"], bindings[1], [
                    _this._ce("div", ["class","title"], bindings[2], [
                        _this._ct("Result")
                    ]),
                    _this._ce("div", ["class","edit"], null, [
                        _this._ce("iframe", ["class","result"], bindings[3])
                    ])
                ])
            ])
        ]));
    }

    _bindings = [
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

export = ExamplePane;
