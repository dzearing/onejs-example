var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View'], function(require, exports, View) {
    var ExampleAppBase = (function (_super) {
        __extends(ExampleAppBase, _super);
        function ExampleAppBase() {
            _super.apply(this, arguments);
        }
        return ExampleAppBase;
    })(View);

    
    return ExampleAppBase;
});
