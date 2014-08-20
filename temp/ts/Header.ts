import HeaderModel = require('HeaderModel');
import View = require('View');
import Repeater = require('Repeater');
import DomUtils = require('DomUtils');
import Headercss = require('Header.css');

DomUtils.loadStyles(Headercss.styles);

class HeaderBlock0Item extends View {
    viewName = 'HeaderBlock0Item';

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("li", ["class","command"], bindings[0], [
            _this._ce("a", [], bindings[1])
        ]));
    }

    _bindings = [
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

class HeaderBlock0 extends Repeater {
    viewName = 'HeaderBlock0';
    childViewType = HeaderBlock0Item;
    itemName = "command";

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("ul", ["class","commands"], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class Header extends View {
    viewName = 'Header';
    viewModelType = HeaderModel;
    headerBlock0 = <any>this.addChild(new HeaderBlock0());

    onInitialize() {
        super.onInitialize();
        this.headerBlock0.owner = this;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.headerBlock0.setData({ items: this.getValue('commands') });
    }

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","c-Header"], null, [
            _this._ce("div", ["class","hamburgerButton"], bindings[0]),
            _this._ce("div", ["class","logoImage"]),
            _this._ce("div", ["class","logo"], bindings[1]),
            _this._ce("div", ["class","commandArea"], bindings[2], [
                _this.headerBlock0.renderElement()
            ])
        ]));
    }

    _bindings = [
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

export = Header;
