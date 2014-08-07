import ViewModel = require('ViewModel');

class ExamplePaneModel extends ViewModel {
    panes = [{
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

    isResultPaneVisible = true;

    selectedPane = 'html';

    isPaneSelected(data) {
        return data.pane.key == this.selectedPane;
    }
}

export = ExamplePaneModel;