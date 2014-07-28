import ViewModel = require('ViewModel');

class HeaderModel extends ViewModel {
    public logoText = 'OneJS';
    public commands = [
        {
            key: 'about',
            text: 'About',
            url: '#/about'
        },
        {
            key: 'docs',
            text: 'Documentation',
            url: '#/docs'
        },
        {
            key: 'create',
            text: 'Create',
            url: '#/create'
        },
        {
            key: 'share',
            text: 'Share',
            url: '#/share'
        },
        {
            key: 'discover',
            text: 'Discover',
            url: '#/discover'
        }
    ];
}

export = HeaderModel;