import ViewModel = require('ViewModel');

class HeaderModel extends ViewModel {
    data = {
        logoText: 'OneJS',
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
            return document.location.hash === data.command.url;
        }
    }

    onInitialize() {
        this.events.on(window, 'hashchange', this.change);
    }

}

export = HeaderModel;