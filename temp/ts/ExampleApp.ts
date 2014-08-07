import ExampleAppModel = require('ExampleAppModel');
import View = require('View');
import ExampleAppBase = require('ExampleAppBase');
import Header = require('Header');
import ContentControl = require('ContentControl');
import DomUtils = require('DomUtils');
import ExampleAppcss = require('ExampleApp.css');

DomUtils.loadStyles(ExampleAppcss.styles);

class ExampleApp extends ExampleAppBase {
    viewName = 'ExampleApp';
    viewModelType = ExampleAppModel;
    header = <any>this.addChild(new Header());
    content = <any>this.addChild(new ContentControl());

    onViewModelChanged() {
        super.onViewModelChanged();
        this.header.setData({ commands: this.getValue('pageCommands'), selectedCommand: this.getValue('selectedPage') });
        this.content.setData({ contentType: this.getValue('selectedPage.viewType') });
    }

    onRenderHtml(): string {
        return '' +
            '<div class="c-ExampleApp">' +
                this.header.renderHtml() +
                '<div class="centered">' +
                    this.content.renderHtml() +
                '</div>' +
            '</div>' +
            '';
    }
}

export = ExampleApp;
