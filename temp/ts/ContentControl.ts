import View = require('View');

class ContentControl extends View {
    containerElement: HTMLElement;
    activeContentType: string;
    activeControl: View;

    public getContentType(data) {
        return this.getViewModel().contentType;
    }

    public onInitialize() {
        this.updateContent();
    }

    public onRenderHtml() {
        var markup ='<div id="' + this.id + '">';

        if (this.activeControl) {
            markup += this.activeControl.renderHtml();
        }

        markup += '</div>';

        return markup;
    }

    public onActivate() {
        this.containerElement = document.getElementById(this.id);
    }

    public onViewModelChanged() {
        this.updateContent();
    }

    public updateContent() {
        var _this = this;
        var desiredContentType = _this.getContentType(_this.getViewModel());

        if (desiredContentType != _this.activeContentType) {
            _this.activeContentType = desiredContentType;

            if (_this.activeControl) {
                _this.activeControl.dispose();
                _this.removeChild(_this.activeControl);
            }

            require([ desiredContentType ], function(controlType) {
                if (_this._state == 2 && desiredContentType == _this.activeContentType) {
                    _this.activeControl = _this.addChild(new controlType());
                    _this.activeControl.setData(_this.getViewModel());
                    _this.swapInControl(_this.activeControl);
                }
            });
        }
        else {
            if (_this.activeControl) {
                _this.activeControl.setData(_this.getViewModel());
            }
        }
    }

    public swapInControl(newControl) {
        this.containerElement.innerHTML = newControl.renderHtml();
        newControl.activate();
    }
}

export = ContentControl;