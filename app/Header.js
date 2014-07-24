var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View', 'Header.css'], function(require, exports, View, Headercss) {
    View.loadStyles(Headercss.styles);

    var Header = (function (_super) {
        __extends(Header, _super);
        function Header(data) {
            _super.call(this, data);
            this._bindings = [
                {
                    "id": "0"
                }
            ];

            this.viewName = 'Header';
            this.baseClass = 'c-' + this.viewName + (this.baseClass ? ' ' : '');
        }
        Header.prototype.onRenderHtml = function (viewModel) {
            return '' + '<' + this.baseTag + ' id="' + this.id + '_0" ' + this.genStyle(this.baseStyle) + ' ' + this.genClass(this.baseClass) + '>' + '<div class="logoImage"></div>' + '<div class="logo">' + 'OneJS' + '</div>' + '<ul class="commands">' + '<li class="selected">' + 'About' + '</li>' + '<li>' + 'Create' + '</li>' + '<li>' + 'Share' + '</li>' + '<li>' + 'Discover' + '</li>' + '</ul>' + '</' + this.baseTag + '>' + '';
        };
        return Header;
    })(View);

    
    return Header;
});
