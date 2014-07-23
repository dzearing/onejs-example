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
            this.showBenefits = false;
        }
        ExampleAppModel.prototype.onClick = function (eventArgs) {
            alert('hi');

            return true;
        };
        return ExampleAppModel;
    })(ViewModel);

    
    return ExampleAppModel;
});
