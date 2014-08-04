var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n};define(["require","exports","ViewModel"],function(e,t,n){var i=function(e){function t(){e.apply(this,arguments),this.data={strings:{title:"OneJS is a tiny web framework.",subTitle:"OneJS enables you to build easily reusable web components in an Model View ViewModel (MVVM) pattern. Views (templates) compile to TypeScript, so that type safety and static code analysis can be enforced. This allows for really nice scenarios, such as having an interface available to implement for your view model, based on the binding requirements of the View."},viewsExample:{panes:[{key:"html",hasEditor:!0,editorType:"html",updatesResults:!0,title:"FavoriteThings.html",content:'<js-view js-type="FavoriteThings">\n    <div class="c-FavoriteThings">\n        <b>My Favorite things</b>\n        <ul>\n            <li>Whiskers on kittens</li>\n            <li>Warm woolen mittens</li>\n        </ul>\n    </div>\n</js-view>'},{key:"viewtemplate",hasEditor:!0,updatesResults:!1,editorType:"typescript",title:"Generated TypeScript",content:'.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'},{key:"less",hasEditor:!0,updatesResults:!0,editorType:"less",title:"FavoriteThings.css",content:'.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'}],selectedPane:"html"},viewModelsExample:{panes:[{key:"html",hasEditor:!0,editorType:"html",updatesResults:!0,title:"View",content:'<js-view js-type="FavoriteThings" js-model="FavoriteThingsModel">\n    <div class="c-FavoriteThings">\n        <b js-bind="text:title"></b>\n        <ul js-repeat="thing in things">\n            <li js-bind="text:thing"></li>\n        </ul>\n    </div>\n</js-view>'},{key:"viewmodel",hasEditor:!0,updatesResults:!0,editorType:"typescript",title:"ViewModel",content:"import ViewModel = require('ViewModel');\n\nclass FavoriteThingsModel extends ViewModel {\n    data = {\n        title: 'MyFavorite things',\n        things: [\n            'Whiskers on kittens',\n            'Warm woolen mittens'\n        ]\n    };\n}\n\nexport = FavoriteThingsModel;\n"},{key:"less",hasEditor:!0,updatesResults:!0,editorType:"less",title:"Styles",content:'.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'}],selectedPane:"html",isResultPaneVisible:!1},viewInViewExample:{panes:[{key:"html",hasEditor:!0,editorType:"html",updatesResults:!0,title:"App.html",content:'<js-view js-type="App" js-model="AppModel">\n\n    <js-view\n        js-name="tomStuff"\n        js-type="FavoriteThings"\n        js-data="tom" ></js-view>\n\n    <js-view\n        js-name="bobStuff"\n        js-type="FavoriteThings"\n        js-data="bob" ></js-view>\n        \n</js-view>\n'},{key:"viewmodel",hasEditor:!0,updatesResults:!0,editorType:"typescript",title:"AppModel.js",content:"import ViewModel = require('ViewModel');\n\nclass AppModel extends ViewModel {\n    data = {\n        tom: {\n            title: 'Tom\\'s favs',\n            things: [\n                'Watches',\n                'Football'\n            ]\n        },\n        bob: {\n            title: 'Bob\\'s favs',\n            things: [\n                'Movies'\n            ]\n        }\n   };\n}\n\nexport = AppModel;\n"}],selectedPane:"html",isResultPaneVisible:!1},eventingExample:{panes:[{key:"html",hasEditor:!0,editorType:"html",updatesResults:!0,title:"ToggleButton.html",content:'<js-view js-type="ToggleButton" js-model="ToggleButtonModel">\n    <button\n        js-bind="text:title,className.isActive:isActive"\n        js-userAction="click:onClick,click:$toggle(isActive)"></button>\n</js-view>\n'},{key:"viewmodel",hasEditor:!0,updatesResults:!0,editorType:"typescript",title:"ToggleButtonModel.js",content:"import ViewModel = require('ViewModel');\n\nclass ToggleButtonModel extends ViewModel {\n    data = {\n        isActive: false,\n        onClick: function() { alert('toggling!'); }\n   };\n}\n\nexport = ToggleButtonModel;\n"}],selectedPane:"html",isResultPaneVisible:!1}}}return __extends(t,e),t}(n);return i});