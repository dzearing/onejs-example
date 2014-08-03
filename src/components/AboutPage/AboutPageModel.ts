import ViewModel = require('ViewModel');

class AboutPageModel extends ViewModel {
    data = {
        strings: {
            title: 'OneJS is a tiny web framework.',
            subTitle: 'OneJS enables you to build easily reusable web components in an Model View ViewModel (MVVM) pattern. Views (templates) compile to TypeScript, so that type safety and static code analysis can be enforced. This allows for really nice scenarios, such as having an interface available to implement for your view model, based on the binding requirements of the View.',
        },

        example1: {
            panes: [{
                key: 'html',
                hasEditor: true,
                editorType: 'html',
                updatesResults: true,
                title: 'View template',
                content: '<js-view js-type="FavoriteThings">\n    <div class="c-FavoriteThings">\n        <b>My Favorite things</b>\n        <ul>\n            <li>Whiskers on kittens</li>\n            <li>Warm woolen mittens</li>\n        </ul>\n    </div>\n</js-view>'
            }, {
                key: 'viewtemplate',
                hasEditor: true,
                updatesResults: false,
                editorType: 'typescript',
                title: 'Generated TypeScript',
                content: '.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'
            }, {
                key: 'less',
                hasEditor: true,
                updatesResults: true,
                editorType: 'less',
                title: 'Less',
                content: '.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'
            }],
            selectedPane: 'html'
        },
        example2: {
            panes: [{
                key: 'html',
                hasEditor: true,
                editorType: 'html',
                updatesResults: true,
                title: 'View',
                content: '<js-view js-type="FavoriteThings" js-model="FavoriteThingsModel">\n    <div class="c-FavoriteThings">\n        <b js-bind="text:title"></b>\n        <ul js-repeat="thing in things">\n            <li js-bind="text:thing"></li>\n        </ul>\n    </div>\n</js-view>'
            }, {
                key: 'viewmodel',
                hasEditor: true,
                updatesResults: true,
                editorType: 'typescript',
                title: 'ViewModel',
                content: 'import ViewModel = require(\'ViewModel\');\n\nclass FavoriteThingsModel extends ViewModel {\n    data = {\n        title: \'MyFavorite things\',\n        things: [\n            \'Whiskers on kittens\',\n            \'Warm woolen mittens\'\n        ]\n    };\n}\n\nexport = FavoriteThingsModel;\n'
            }, {
                key: 'less',
                hasEditor: true,
                updatesResults: true,
                editorType: 'less',
                title: 'Less',
                content: '.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'
            }],
            selectedPane: 'html',
            isResultPaneVisible: false
        }
    }
}

export = AboutPageModel;