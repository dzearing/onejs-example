var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'HeaderModel', 'View', 'Repeater', 'Header.css'], function(require, exports, HeaderModel, View, Repeater, Headercss) {
    View.loadStyles(Headercss.styles);

    var HeaderBlock0Item = (function (_super) {
        __extends(HeaderBlock0Item, _super);
        function HeaderBlock0Item() {
            _super.apply(this, arguments);
            this.viewName = 'HeaderBlock0Item';
            this._bindings = [
                {
                    "id": "0",
                    "className": {
                        "selected": "$root.isViewingPage"
                    },
                    "events": {
                        "click": [
                            "$send(key, $root.pageKey)"
                        ]
                    }
                },
                {
                    "id": "1",
                    "attr": {
                        "href": "url"
                    },
                    "text": "text"
                }
            ];
        }
        HeaderBlock0Item.prototype.onRenderHtml = function () {
            return '' + '<li id="' + this.id + '_0" ' + this.genClass('command', ['selected', '$root.isViewingPage']) + '>' + '<a id="' + this.id + '_1" ' + this.genAttr('', ['href', 'url']) + '>' + this.genText('text') + '</a>' + '</li>' + '';
        };
        return HeaderBlock0Item;
    })(View);

    var HeaderBlock0 = (function (_super) {
        __extends(HeaderBlock0, _super);
        function HeaderBlock0() {
            _super.apply(this, arguments);
            this.viewName = 'HeaderBlock0';
            this.childViewType = HeaderBlock0Item;
            this._bindings = [
                {
                    "id": "0",
                    "childId": "surface"
                }
            ];
        }
        HeaderBlock0.prototype.onRenderHtml = function () {
            return '' + '<ul id="' + this.id + '_0" class="commands">' + this.renderItems() + '</ul>' + '';
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
                    "text": "logoText"
                }
            ];
        }
        Header.prototype.onInitialize = function () {
            this.headerBlock0.setData({ items: this.getValue('commands') });
        };

        Header.prototype.onRenderHtml = function () {
            return '' + '<div class="c-Header">' + '<div class="logoImage"></div>' + '<div id="' + this.id + '_0" class="logo">' + this.genText('logoText') + '</div>' + this.headerBlock0.renderHtml() + '</div>' + '';
        };
        return Header;
    })(View);

    
    return Header;
});
