import ViewModel = require('ViewModel');

class ExampleAppModel extends ViewModel {
    pageCommands = [{
        key: 'about',
        viewType: 'AboutPage',
        text: 'About',
        url: '#/about'
    }, {
        key: 'docs',
        viewType: 'DocsPage',
        text: 'Documentation',
        url: '#/docs'
    }, {
        key: 'create',
        viewType: 'AboutPage',
        text: 'Create',
        url: '#/create'
    }, {
        key: 'share',
        viewType: 'AboutPage',
        text: 'Share',
        url: '#/share'
    }, {
        key: 'discover',
        viewType: 'AboutPage',
        text: 'Discover',
        url: '#/discover'
    }];

    selectedPage = this.pageCommands[0];

    isViewingPage(data) {
        return (data && data.command && data.command.key == this.selectedPage.key);
    }

    onInitialize() {
        this.__events.on(window, 'hashchange', this._onHashChanged);
    }

    _onHashChanged() {
        var hashValue = document.location.hash;
        var commands = this.pageCommands;

        for (var i = 0; commands && i < commands.length; i++) {
            if (hashValue.indexOf(commands[i].url) == 0) {
                this.selectedPage = commands[i];
                break;
            }
        }

        this.change();
    }
}

export = ExampleAppModel;