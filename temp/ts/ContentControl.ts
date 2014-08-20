import View = require('View');

class ContentControl extends View {
    viewName = "ContentControl";

    activeContentType: string;
    activeControl: View;

    public getContentType(data) {
        return this.getViewModel().contentType;
    }

    public onInitialize() {
        this.updateContent();
    }

    public onRenderElement() {
        this.element = this._ce('div');

        if (this.activeControl) {
            this.element.appendChild(this.activeControl.renderElement());
        }

        return this.element;
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
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }

        this.element.appendChild(newControl.renderElement());
        newControl.activate();
    }
}

export = ContentControl;