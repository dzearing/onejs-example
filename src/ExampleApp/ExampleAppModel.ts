import ViewModel = require('ViewModel');
import IExampleAppModel = require('IExampleAppModel');

class ExampleAppModel extends ViewModel implements IExampleAppModel {
    paragraphHtml1: string = 'default para 1';
    paragraphHtml2: string = 'default para 2';
    isVisible: string = 'true';
    isSeperatorVisible: boolean = false;

    onClick(eventArgs?: any): boolean {
        alert('hi');

        return true;
    }
}

export = ExampleAppModel;