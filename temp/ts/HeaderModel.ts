import ViewModel = require('ViewModel');

class HeaderModel extends ViewModel {
    data = {
        logoText: 'OneJS',

        commandsExpanded: false,

        selectedKey: 'about',

        commands: [{
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
        }],

        isSelected: function(data) {
            return (this.view.getViewModel().data.selectedKey === data.command.key);
        }
    }

    onInitialize() {
        this.events.on(window, 'hashchange', this.onHashChanged);
    }

    onHashChanged() {
        var hashValue = document.location.hash;
        var commands = this.data.commands;

        for (var i = 0; commands && i < commands.length; i++) {
            if (hashValue.indexOf(commands[i].url) == 0) {
                this.data.selectedKey = commands[i].key;
                break;
            }
        }

        this.data.commandsExpanded = false;

        this.change();
    }

}

export = HeaderModel;