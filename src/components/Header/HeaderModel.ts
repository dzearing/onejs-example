import ViewModel = require('ViewModel');

class HeaderModel extends ViewModel {
    logoText = 'OneJS';
    commandsExpanded = false;
    selectedCommand =  null;
    commands = [];

    isSelected(data) {
        return (data.command && this.selectedCommand === data.command);
    }

    execute(command) {
        this.selectedCommand = command;
        this.commandsExpanded = false;
        this.change();

        window.location.href = command.url;

        return false;
    }

}

export = HeaderModel;