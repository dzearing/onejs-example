define(["require", "exports", 'ExampleApp'], function(require, exports, ExampleApp) {
    var app = new ExampleApp();

    document.body.innerHTML = app.renderHtml();
    app.activate();
});
