var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ViewModel'], function(require, exports, ViewModel) {
    var ExamplePaneModel = (function (_super) {
        __extends(ExamplePaneModel, _super);
        function ExamplePaneModel() {
            _super.apply(this, arguments);
            this.panes = [
                {
                    key: 'html',
                    hasEditor: true,
                    updatesResults: true,
                    editorType: 'html',
                    title: 'HTML',
                    content: '<div>Hello world</div>'
                }, {
                    key: 'less',
                    hasEditor: true,
                    updatesResults: true,
                    editorType: 'less',
                    title: 'Less',
                    content: '.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'
                }];
            this.isResultPaneVisible = true;
            this.selectedPane = 'html';
        }
        ExamplePaneModel.prototype.isPaneSelected = function (data) {
            return data.pane.key == this.selectedPane;
        };
        return ExamplePaneModel;
    })(ViewModel);

    
    return ExamplePaneModel;
});
