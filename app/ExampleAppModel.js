var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ViewModel'], function(require, exports, ViewModel) {
    var ExampleAppModel = (function (_super) {
        __extends(ExampleAppModel, _super);
        function ExampleAppModel() {
            _super.apply(this, arguments);
            this.pageCommands = [
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
                }];
            this.selectedPage = this.pageCommands[0];
        }
        ExampleAppModel.prototype.isViewingPage = function (data) {
            return (data && data.command && data.command.key == this.selectedPage.key);
        };

        ExampleAppModel.prototype.onInitialize = function () {
            this.__events.on(window, 'hashchange', this._onHashChanged);
        };

        ExampleAppModel.prototype._onHashChanged = function () {
            var hashValue = document.location.hash;
            var commands = this.pageCommands;

            for (var i = 0; commands && i < commands.length; i++) {
                if (hashValue.indexOf(commands[i].url) == 0) {
                    this.selectedPage = commands[i];
                    break;
                }
            }

            this.change();
        };
        return ExampleAppModel;
    })(ViewModel);

    
    return ExampleAppModel;
});
