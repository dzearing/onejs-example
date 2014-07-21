var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View'], function(require, exports, View) {
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
        }
        Header.prototype.onRenderHtml = function (viewModel) {
            return '' + '<' + this.baseTag + ' id="' + this.id + '_0" ' + View.genStyle(this.baseStyle) + ' ' + View.genClass(this.baseClass) + '>' + '<div>' + 'I am a header!' + '</div>' + '</' + this.baseTag + '>' + '';
        };
        return Header;
    })(View);

    
    return Header;
});
