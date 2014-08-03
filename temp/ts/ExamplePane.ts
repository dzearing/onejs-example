import ExamplePaneModel = require('ExamplePaneModel');
import DomUtils = require('DomUtils');
import View = require('View');
import ExamplePaneBase = require('ExamplePaneBase');
import Repeater = require('Repeater');
import ExamplePanecss = require('ExamplePane.css');

DomUtils.loadStyles(ExamplePanecss.styles);

class ExamplePaneBlock0Item extends View {
    viewName = 'ExamplePaneBlock0Item';

    onRenderHtml(): string {
        return '' +
            '<div id="' + this.id + '_0" ' + this._genClass('pane', ['isSelected','$parent.isPaneSelected']) + '>' +
                '<div id="' + this.id + '_1" class="title">' +
                    this._genText('pane.title') +
                '</div>' +
                '<div id="' + this.id + '_2" ' + this._genAttr('', ['data-key','pane.key']) + ' class="edit"></div>' +
            '</div>' +
            '';
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
                    "$send(pane.key, $parent.selectedPane)"
                ]
            }
        },
        {
            "id": "2",
            "attr": {
                "data-key": "pane.key"
            },
            "childId": "editor"
        }
    ];
}

class ExamplePaneBlock0 extends Repeater {
    viewName = 'ExamplePaneBlock0';
    childViewType = ExamplePaneBlock0Item;
    itemName = "pane";

    onRenderHtml(): string {
        return '' +
            '<div id="' + this.id + '_0">' +
                this.renderItems() + 
            '</div>' +
            '';
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
        this.examplePaneBlock0.owner = this;
    }

    onViewModelChanged() {
        this.examplePaneBlock0.setData({ items: this.getValue('panes') });
    }

    onRenderHtml(): string {
        return '' +
            '<div id="' + this.id + '_0" ' + this._genClass('c-ExamplePane', ['showResults','isResultPaneVisible']) + '>' +
                '<div class="tab2col1">' +
                    this.examplePaneBlock0.renderHtml() +
                '</div>' +
                '<div class="tab2col2">' +
                    '<div id="' + this.id + '_1" ' + this._genClass('pane', ['isSelected','isResultPaneVisible']) + '>' +
                        '<div id="' + this.id + '_2" class="title">' +
                            'Result' +
                        '</div>' +
                        '<div class="edit">' +
                            '<iframe id="' + this.id + '_3" class="result"></iframe>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '';
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
                    "$toggle(isResultPaneVisible)"
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
