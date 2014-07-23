import ExampleApp = require('ExampleApp');

var app = new ExampleApp({ paragraphHtml1: 'Hello <b>World!</b>' });

document.body.innerHTML = app.renderHtml();
app.activate();
