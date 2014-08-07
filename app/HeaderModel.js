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
            this.commandsExpanded = false;
            this.selectedCommand = null;
            this.commands = [];
        }
        HeaderModel.prototype.isSelected = function (data) {
            return (data.command && this.selectedCommand === data.command);
        };
        return HeaderModel;
    })(ViewModel);

    
    return HeaderModel;
});
