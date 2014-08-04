import HeaderModel = require('HeaderModel');
import View = require('View');
import Repeater = require('Repeater');
import DomUtils = require('DomUtils');
import Headercss = require('Header.css');

DomUtils.loadStyles(Headercss.styles);

class HeaderBlock0Item extends View {
    viewName = 'HeaderBlock0Item';

    onRenderHtml(): string {
        return '' +
            '<li id="' + this.id + '_0" ' + this._genClass('command', ['selected','$parent.isSelected']) + '>' +
                '<a id="' + this.id + '_1" ' + this._genAttr('', ['href','command.url']) + '>' +
                    this._genText('command.text') +
                '</a>' +
            '</li>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "selected": "$parent.isSelected"
            },
            "events": {
                "click": [
                    "$send(command.viewType, $root.pageType)",
                    "$send(command.key, $parent.selectedKey)"
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
    headerBlock0 = <any>this.addChild(new HeaderBlock0());

    onInitialize() {
        this.headerBlock0.owner = this;
    }

    onViewModelChanged() {
        this.headerBlock0.setData({ items: this.getValue('commands') });
    }

    onRenderHtml(): string {
        return '' +
            '<div class="c-Header">' +
                '<div id="' + this.id + '_0" class="hamburgerButton"></div>' +
                '<div class="logoImage"></div>' +
                '<div id="' + this.id + '_1" class="logo">' +
                    this._genText('logoText') +
                '</div>' +
                '<div id="' + this.id + '_2" ' + this._genClass('commandArea', ['isExpanded','commandsExpanded']) + '>' +
                    this.headerBlock0.renderHtml() +
                '</div>' +
            '</div>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "events": {
                "click": [
                    "$toggle(commandsExpanded)"
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
