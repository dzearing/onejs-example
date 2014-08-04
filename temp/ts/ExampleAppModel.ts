import ViewModel = require('ViewModel');

class ExampleAppModel extends ViewModel {
    data = {

        pageType: 'AboutPage',

        isViewingPage: function(data) {
            return (data && data.command && data.command.pageType == this.pageType);
        }
    };

}

export = ExampleAppModel;