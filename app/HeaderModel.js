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
            this.logoText = 'OneJS';
            this.commands = [
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
        return HeaderModel;
    })(ViewModel);

    
    return HeaderModel;
});
