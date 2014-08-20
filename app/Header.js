var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'HeaderModel', 'View', 'Repeater', 'DomUtils', 'Header.css'], function(require, exports, HeaderModel, View, Repeater, DomUtils, Headercss) {
    DomUtils.loadStyles(Headercss.styles);

    var HeaderBlock0Item = (function (_super) {
        __extends(HeaderBlock0Item, _super);
        function HeaderBlock0Item() {
            _super.apply(this, arguments);
            this.viewName = 'HeaderBlock0Item';
            this._bindings = [
                {
                    "id": "0",
                    "className": {
                        "selected": "$parent.isSelected"
                    },
                    "events": {
                        "click": [
                            "$parent.execute(command)"
                        ]
                    }
                },
                {
                    "id": "1",
                    "attr": {
                        "href": "command.url"
                    },
                    "text": "command.text"
                }
            ];
        }
        HeaderBlock0Item.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("li", ["class", "command"], bindings[0], [
                _this._ce("a", [], bindings[1])
            ]));
        };
        return HeaderBlock0Item;
    })(View);

    var HeaderBlock0 = (function (_super) {
        __extends(HeaderBlock0, _super);
        function HeaderBlock0() {
            _super.apply(this, arguments);
            this.viewName = 'HeaderBlock0';
            this.childViewType = HeaderBlock0Item;
            this.itemName = "command";
            this._bindings = [
                {
                    "id": "0",
                    "childId": "surface"
                }
            ];
        }
        HeaderBlock0.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("ul", ["class", "commands"], bindings[0], this.getChildElements()));
        };
        return HeaderBlock0;
    })(Repeater);

    var Header = (function (_super) {
        __extends(Header, _super);
        function Header() {
            _super.apply(this, arguments);
            this.viewName = 'Header';
            this.viewModelType = HeaderModel;
            this.headerBlock0 = this.addChild(new HeaderBlock0());
            this._bindings = [
                {
                    "id": "0",
                    "events": {
                        "click": [
                            "$view.toggle('commandsExpanded')"
                        ]
                    }
                },
                {
                    "id": "1",
                    "text": "logoText"
                },
                {
                    "id": "2",
                    "className": {
                        "isExpanded": "commandsExpanded"
                    }
                }
            ];
        }
        Header.prototype.onInitialize = function () {
            _super.prototype.onInitialize.call(this);
            this.headerBlock0.owner = this;
        };

        Header.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.headerBlock0.setData({ items: this.getValue('commands') });
        };

        Header.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "c-Header"], null, [
                _this._ce("div", ["class", "hamburgerButton"], bindings[0]),
                _this._ce("div", ["class", "logoImage"]),
                _this._ce("div", ["class", "logo"], bindings[1]),
                _this._ce("div", ["class", "commandArea"], bindings[2], [
                    _this.headerBlock0.renderElement()
                ])
            ]));
        };
        return Header;
    })(View);

    
    return Header;
});
