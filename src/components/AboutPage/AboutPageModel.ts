import ViewModel = require('ViewModel');

class AboutPageModel extends ViewModel {
    strings = {
        title: 'OneJS is a tiny web framework.',
        subTitle: 'OneJS enables you to build easily reusable web components in an Model View ViewModel (MVVM) pattern. Views (templates) compile to TypeScript, so that type safety and static code analysis can be enforced. This allows for really nice scenarios, such as having an interface available to implement for your view model, based on the binding requirements of the View.',
    };

    viewsExample = {
        panes: [{
            key: 'html',
            hasEditor: true,
            editorType: 'xml',
            updatesResults: true,
            title: 'FavoriteThings.html',
            content: '<js-view js-type="FavoriteThings">\n    <div class="c-FavoriteThings">\n        <b>My Favorite things</b>\n        <ul>\n            <li>Whiskers on kittens</li>\n            <li>Warm woolen mittens</li>\n        </ul>\n    </div>\n</js-view>'
        }, {
            key: 'viewtemplate',
            hasEditor: true,
            updatesResults: false,
            editorType: 'typescript',
            title: 'Generated TypeScript',
            content: ''
        }, {
            key: 'less',
            hasEditor: true,
            updatesResults: true,
            editorType: 'less',
            title: 'FavoriteThings.css',
            content: '.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'
        }],
        selectedPane: 'html'
    }

    viewModelsExample = {
        panes: [{
            key: 'html',
            hasEditor: true,
            editorType: 'xml',
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
            title: 'Styles',
            content: '.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'
        }],
        selectedPane: 'html',
        isResultPaneVisible: false
    };

    viewInViewExample = {
        panes: [{
            key: 'html',
            hasEditor: true,
            editorType: 'xml',
            updatesResults: true,
            title: 'App.html',
            content: '<js-view js-type="App" js-model="AppModel">\n\n    <js-view\n        js-name="tomStuff"\n        js-type="FavoriteThings"\n        js-data="tom" ></js-view>\n\n    <js-view\n        js-name="bobStuff"\n        js-type="FavoriteThings"\n        js-data="bob" ></js-view>\n        \n</js-view>\n'
        }, {
            key: 'viewmodel',
            hasEditor: true,
            updatesResults: true,
            editorType: 'typescript',
            title: 'AppModel.ts',
            content: 'import ViewModel = require(\'ViewModel\');\n\nclass AppModel extends ViewModel {\n    data = {\n        tom: {\n            title: \'Tom\\\'s favs\',\n            things: [\n                \'Watches\',\n                \'Football\'\n            ]\n        },\n        bob: {\n            title: \'Bob\\\'s favs\',\n            things: [\n                \'Movies\'\n            ]\n        }\n   };\n}\n\nexport = AppModel;\n'
        }],
        selectedPane: 'html',
        isResultPaneVisible: false
    };

    eventingExample ={
        panes: [{
            key: 'html',
            hasEditor: true,
            editorType: 'xml',
            updatesResults: true,
            title: 'ToggleButton.html',
            content: '<js-view js-type="ToggleButton" js-model="ToggleButtonModel">\n    <button\n        js-bind="text:title,className.isActive:isActive"\n        js-userAction="click:onClick,click:$toggle(isActive)"></button>\n</js-view>\n'
        }, {
            key: 'viewmodel',
            hasEditor: true,
            updatesResults: true,
            editorType: 'typescript',
            title: 'ToggleButtonModel.ts',
            content: 'import ViewModel = require(\'ViewModel\');\n\nclass ToggleButtonModel extends ViewModel {\n    data = {\n        isActive: false,\n        onClick: function() { alert(\'toggling!\'); }\n   };\n}\n\nexport = ToggleButtonModel;\n'
        }],
        selectedPane: 'html',
        isResultPaneVisible: false
    };
}

export = AboutPageModel;