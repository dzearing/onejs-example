import View = require('View');
import ContentControl = require('ContentControl');

class ExampleAppBase extends View {
    content: ContentControl;
/*
    constructor() {
        super();

         // Content
    }

    /
    onInitialize() {
        this.content.getContentType = function(data) {
            return data.viewType;
        }
        this.content.evaluateView();
    }
    */
}

export = ExampleAppBase;