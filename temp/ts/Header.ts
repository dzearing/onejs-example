import HeaderModel = require('HeaderModel');
import View = require('View');
import Repeater = require('Repeater');
import Headercss = require('Header.css');

View.loadStyles(Headercss.styles);

class HeaderBlock0Item extends View {
    viewName = 'HeaderBlock0Item';

    onRenderHtml(): string {
        return '' +
            '<li id="' + this.id + '_0" ' + this.genClass('command', ['selected','$root.isViewingPage']) + '>' +
                '<a id="' + this.id + '_1" ' + this.genAttr('', ['href','url']) + '>' +
                    this.genText('text') +
                '</a>' +
            '</li>' +
            '';
    }

    _bindings = [
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

class HeaderBlock0 extends Repeater {
    viewName = 'HeaderBlock0';
    childViewType = HeaderBlock0Item;

    onRenderHtml(): string {
        return '' +
            '<ul id="' + this.id + '_0" class="commands">' +
                this.renderItems() + 
            '</ul>' +
            '';
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
    private headerBlock0: HeaderBlock0 = <HeaderBlock0>this.addChild(new HeaderBlock0());

    onInitialize() {
        this.headerBlock0.setData({ items: this.getValue('commands') });
    }

    onRenderHtml(): string {
        return '' +
            '<div class="c-Header">' +
                '<div class="logoImage"></div>' +
                '<div id="' + this.id + '_0" class="logo">' +
                    this.genText('logoText') +
                '</div>' +
                this.headerBlock0.renderHtml() +
            '</div>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "text": "logoText"
        }
    ];
}

export = Header;
