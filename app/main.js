define(["require", "exports", 'ExampleApp'], function(require, exports, ExampleApp) {
    var app = new ExampleApp();

    document.body.appendChild(app.renderElement());
    app.activate();
});
