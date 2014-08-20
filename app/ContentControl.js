var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View'], function(require, exports, View) {
    var ContentControl = (function (_super) {
        __extends(ContentControl, _super);
        function ContentControl() {
            _super.apply(this, arguments);
            this.viewName = "ContentControl";
        }
        ContentControl.prototype.getContentType = function (data) {
            return this.getViewModel().contentType;
        };

        ContentControl.prototype.onInitialize = function () {
            this.updateContent();
        };

        ContentControl.prototype.onRenderElement = function () {
            this.element = this._ce('div');

            if (this.activeControl) {
                this.element.appendChild(this.activeControl.renderElement());
            }

            return this.element;
        };

        ContentControl.prototype.onViewModelChanged = function () {
            this.updateContent();
        };

        ContentControl.prototype.updateContent = function () {
            var _this = this;
            var desiredContentType = _this.getContentType(_this.getViewModel());

            if (desiredContentType != _this.activeContentType) {
                _this.activeContentType = desiredContentType;

                if (_this.activeControl) {
                    _this.activeControl.dispose();
                    _this.removeChild(_this.activeControl);
                }

                require([desiredContentType], function (controlType) {
                    if (_this._state == 2 && desiredContentType == _this.activeContentType) {
                        _this.activeControl = _this.addChild(new controlType());
                        _this.activeControl.setData(_this.getViewModel());
                        _this.swapInControl(_this.activeControl);
                    }
                });
            } else {
                if (_this.activeControl) {
                    _this.activeControl.setData(_this.getViewModel());
                }
            }
        };

        ContentControl.prototype.swapInControl = function (newControl) {
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }

            this.element.appendChild(newControl.renderElement());
            newControl.activate();
        };
        return ContentControl;
    })(View);

    
    return ContentControl;
});
