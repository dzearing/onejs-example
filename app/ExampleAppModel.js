var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ViewModel', 'TypeScriptGenerator'], function(require, exports, ViewModel, TypeScriptGenerator) {
    var ExampleAppModel = (function (_super) {
        __extends(ExampleAppModel, _super);
        function ExampleAppModel() {
            _super.apply(this, arguments);
            this.strings = {
                title: 'OneJS is a tiny web framework.',
                subTitle: 'OneJS enables you to build easily reusable web components in an Model View ViewModel (MVVM) pattern. Views (templates) compile to TypeScript, so that type safety and static code analysis can be enforced. This allows for really nice scenarios, such as having an interface available to implement for your view model, based on the binding requirements of the View.'
            };
            this.pageKey = 'about';
        }
        ExampleAppModel.prototype.onActivate = function (childElements) {
            this._initializeEditors(childElements);
        };

        ExampleAppModel.prototype.isViewingPage = function (item) {
            return item.key == this.pageKey;
        };

        ExampleAppModel.prototype._initializeEditors = function (childElements) {
            require(['ace'], function () {
                // Editor setup.
                var viewEditor = ace.edit(childElements.viewEditor.id);
                var typeScriptEditor = ace.edit(childElements.typeScriptEditor.id);
                var usageEditor = ace.edit(childElements.usageEditor.id);

                viewEditor.getSession().setMode('ace/mode/html');

                // Hack to provide some example input.
                viewEditor.setValue('<js-view js-type="MyControl">\n    <div js-bind="text:title"></div>\n    <div js-bind="text:description"></div>\n</js-view>\n');

                viewEditor.clearSelection();
                viewEditor.getSession().on('change', updateTypeScript);

                typeScriptEditor.getSession().setMode('ace/mode/typescript');
                usageEditor.getSession().setMode('ace/mode/typescript');

                updateTypeScript();

                function updateTypeScript() {
                    var generator = new TypeScriptGenerator();
                    var val = '';

                    try  {
                        val = viewEditor.getValue();

                        if (val) {
                            val = generator.generate(val);
                        }
                    } catch (e) {
                        val = e;
                    }

                    typeScriptEditor.setValue(val);
                    typeScriptEditor.clearSelection();

                    // Hack to provide a demo of output that matches input.
                    if (generator.template) {
                        usageEditor.setValue('' + 'import ' + generator.template.name + ' = require(\'' + generator.template.name + '\');\n\n' + 'View.initializeRoot(' + generator.template.name + ', { name: \'Hello world.\'});\n');
                    }
                    usageEditor.clearSelection();
                }
            });
        };
        return ExampleAppModel;
    })(ViewModel);

    
    return ExampleAppModel;
});
