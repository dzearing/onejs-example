var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ViewModel'], function(require, exports, ViewModel) {
    var HeaderModel = (function (_super) {
        __extends(HeaderModel, _super);
        function HeaderModel() {
            _super.apply(this, arguments);
            this.data = {
                logoText: 'OneJS',
                commandsExpanded: false,
                selectedKey: 'about',
                commands: [
                    {
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
                isSelected: function (data) {
                    return (this.view.getViewModel().data.selectedKey === data.command.key);
                }
            };
        }
        HeaderModel.prototype.onInitialize = function () {
            this.events.on(window, 'hashchange', this.onHashChanged);
        };

        HeaderModel.prototype.onHashChanged = function () {
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
        };
        return HeaderModel;
    })(ViewModel);

    
    return HeaderModel;
});
