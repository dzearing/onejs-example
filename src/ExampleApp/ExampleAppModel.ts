import ViewModel = require('ViewModel');
import IExampleAppModel = require('IExampleAppModel');

class ExampleAppModel extends ViewModel implements IExampleAppModel {
    showBenefits: boolean = false;

    onClick(eventArgs?: any): boolean {
        alert('hi');

        return true;
    }
}

export = ExampleAppModel;