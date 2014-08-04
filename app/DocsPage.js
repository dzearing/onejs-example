var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View', 'DomUtils', 'DocsPage.css'], function(require, exports, View, DomUtils, DocsPagecss) {
    DomUtils.loadStyles(DocsPagecss.styles);

    var DocsPage = (function (_super) {
        __extends(DocsPage, _super);
        function DocsPage() {
            _super.apply(this, arguments);
            this.viewName = 'DocsPage';
        }
        DocsPage.prototype.onRenderHtml = function () {
            return '' + '<div class="c-DocsPage">' + '<div class="index">' + '<h3>' + 'Guides' + '</h3>' + '<ul>' + '<li>' + 'Navigation and routing' + '</li>' + '<li>' + 'Working with observables' + '</li>' + '<li>' + 'Managing selection' + '</li>' + '<li>' + 'Exposing resources' + '</li>' + '<li>' + 'Making ajax calls' + '</li>' + '<li>' + 'Writing a functional test' + '</li>' + '</ul>' + '<h3>' + 'Template reference' + '</h3>' + '<ul>' + '<li>' + 'Template syntax guide' + '</li>' + '<li>' + 'Binding utilities' + '</li>' + '</ul>' + '<h3>' + 'OneJS API reference' + '</h3>' + '<ul>' + '<li>' + 'View class' + '</li>' + '<li>' + 'EventGroup class' + '</li>' + '<li>' + 'ViewModel class' + '</li>' + '<li>' + 'DomUtils class' + '</li>' + '<li>' + 'Encode class' + '</li>' + '<li>' + 'Repeater class' + '</li>' + '<li>' + 'ContentControl class' + '</li>' + '</ul>' + '</div>' + '<div class="content">' + '<h2>' + 'Navigation and routing' + '</h2>' + '<p>' + 'TODO' + '</p>' + '<h2>' + 'Working with observables' + '</h2>' + '<p>' + 'TODO' + '</p>' + '<h2>' + 'Managing selection' + '</h2>' + '<p>' + 'TODO' + '</p>' + '<h2>' + 'Exposing resources' + '</h2>' + '<p>' + 'TODO' + '</p>' + '<h2>' + 'Making ajax calls' + '</h2>' + '<p>' + 'TODO' + '</p>' + '<h2>' + 'Template syntax guide' + '</h2>' + '<p>' + 'TODO' + '</p>' + '<h2>' + 'Binding utilities' + '</h2>' + '<p>' + 'TODO' + '</p>' + '</div>' + '</div>' + '';
        };
        return DocsPage;
    })(View);

    
    return DocsPage;
});
