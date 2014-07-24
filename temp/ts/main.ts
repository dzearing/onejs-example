import ExampleApp = require('ExampleApp');

var app = new ExampleApp();

document.body.innerHTML = app.renderHtml();
app.activate();
