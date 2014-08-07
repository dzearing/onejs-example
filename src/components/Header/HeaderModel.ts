import ViewModel = require('ViewModel');

class HeaderModel extends ViewModel {
    logoText = 'OneJS';
    commandsExpanded = false;
    selectedCommand =  null;
    commands = [];

    isSelected(data) {
        return (data.command && this.selectedCommand === data.command);
    }

}

export = HeaderModel;