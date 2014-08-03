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
            this.data = {
                pageType: 'AboutPage',
                isViewingPage: function (data) {
                    return (data && data.command && data.command.pageType == this.pageType);
                }
            };
        }
        return ExampleAppModel;
    })(ViewModel);

    
    return ExampleAppModel;
});
