var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ExamplePaneModel', 'View', 'ExamplePaneBase', 'Repeater', 'DomUtils', 'ExamplePane.css'], function(require, exports, ExamplePaneModel, View, ExamplePaneBase, Repeater, DomUtils, ExamplePanecss) {
    DomUtils.loadStyles(ExamplePanecss.styles);

    var ExamplePaneBlock0Item = (function (_super) {
        __extends(ExamplePaneBlock0Item, _super);
        function ExamplePaneBlock0Item() {
            _super.apply(this, arguments);
            this.viewName = 'ExamplePaneBlock0Item';
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
        ExamplePaneBlock0Item.prototype.onRenderHtml = function () {
            return '' + '<div id="' + this.id + '_0" ' + this._genClass('pane', ['isSelected', '$parent.isPaneSelected']) + '>' + '<div id="' + this.id + '_1" class="title">' + this._genText('pane.title') + '</div>' + '<div id="' + this.id + '_2" ' + this._genAttr('', ['data-key', 'pane.key']) + ' class="edit"></div>' + '</div>' + '';
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
        ExamplePaneBlock0.prototype.onRenderHtml = function () {
            return '' + '<div id="' + this.id + '_0">' + this.renderItems() + '</div>' + '';
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
        ExamplePane.prototype.onInitialize = function () {
            this.examplePaneBlock0.owner = this;
        };

        ExamplePane.prototype.onViewModelChanged = function () {
            this.examplePaneBlock0.setData({ items: this.getValue('panes') });
        };

        ExamplePane.prototype.onRenderHtml = function () {
            return '' + '<div id="' + this.id + '_0" ' + this._genClass('c-ExamplePane', ['showResults', 'isResultPaneVisible']) + '>' + '<div class="tab2col1">' + this.examplePaneBlock0.renderHtml() + '</div>' + '<div class="tab2col2">' + '<div id="' + this.id + '_1" ' + this._genClass('pane', ['isSelected', 'isResultPaneVisible']) + '>' + '<div id="' + this.id + '_2" class="title">' + 'Result' + '</div>' + '<div class="edit">' + '<iframe id="' + this.id + '_3" class="result"></iframe>' + '</div>' + '</div>' + '</div>' + '</div>' + '';
        };
        return ExamplePane;
    })(ExamplePaneBase);

    
    return ExamplePane;
});
