var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'DomUtils', 'View', 'DocsPage.css'], function(require, exports, DomUtils, View, DocsPagecss) {
    DomUtils.loadStyles(DocsPagecss.styles);

    var DocsPage = (function (_super) {
        __extends(DocsPage, _super);
        function DocsPage() {
            _super.apply(this, arguments);
            this.viewName = 'DocsPage';
        }
        DocsPage.prototype.onRenderHtml = function () {
            return '' + '<div class="c-DocsPage">' + '<div class="index">' + '<a class="link large">' + 'Getting started' + '</a>' + '<a class="link large">' + 'Examples' + '</a>' + '<a class="link large">' + 'Reference' + '</a>' + '<a class="link large">' + 'Getting started' + '</a>' + '<a class="link large">' + 'Template syntax' + '</a>' + '</div>' + '</div>' + '';
        };
        return DocsPage;
    })(View);

    
    return DocsPage;
});
