define(["require", "exports", 'ViewModel', 'EventGroup', 'Encode'], function(require, exports, ViewModel, EventGroup, Encode) {
    var ViewState;
    (function (ViewState) {
        ViewState[ViewState["CREATED"] = 0] = "CREATED";
        ViewState[ViewState["INACTIVE"] = 1] = "INACTIVE";
        ViewState[ViewState["ACTIVE"] = 2] = "ACTIVE";
        ViewState[ViewState["DISPOSED"] = 3] = "DISPOSED";
    })(ViewState || (ViewState = {}));

    var View = (function () {
        function View(data) {
            this.viewName = 'View';
            this.viewModelType = ViewModel;
            this._bindings = [];
            this._lastValues = {};
            this._state = 0 /* CREATED */;
            this.events = new EventGroup(this);
            this.children = [];
            this._initialData = data;
        }
        View.prototype.dispose = function () {
            if (this._state !== 3 /* DISPOSED */) {
                if (this._state == 2 /* ACTIVE */) {
                    this.deactivate();
                }

                this._state = 3 /* DISPOSED */;

                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].dispose();
                }

                this.clearChildren();
                this.events.dispose();
                this._viewModel.dispose();
            }
        };

        View.prototype.setData = function (data, forceUpdate) {
            if (this._state !== 3 /* DISPOSED */) {
                this.initialize();
                this._viewModel.setData(data, forceUpdate);
            }
        };

        View.prototype.initialize = function () {
            if (this._state === 0 /* CREATED */) {
                this._state = 1 /* INACTIVE */;

                this.id = this.viewName + '-' + (View._instanceCount++);

                this._viewModel = new this.viewModelType(this._initialData);
                this.onInitialize();
                this._viewModel.onInitialize();
            }
        };

        View.prototype.onInitialize = function () {
        };

        View.prototype.renderHtml = function () {
            var html;

            if (this._state !== 3 /* DISPOSED */) {
                this.initialize();
                html = this.onRenderHtml(this._viewModel);
            }

            return html;
        };

        View.prototype.onRenderHtml = function (viewModel) {
            return '<div></div>';
        };

        View.prototype.activate = function () {
            if (this._state === 1 /* INACTIVE */) {
                this._state = 2 /* ACTIVE */;

                this._bindEvents();
                this._findElements();
                this.updateView(true);

                this.onActivate();

                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].activate();
                }

                this._viewModel.onActivate(this._subElements);
            }
        };

        View.prototype.onActivate = function () {
        };

        View.prototype.deactivate = function () {
            if (this._state === 2 /* ACTIVE */) {
                this._state = 1 /* INACTIVE */;

                this.onDeactivate();

                this._subElements = null;
                this.events.off();

                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].deactivate();
                }

                this._viewModel.onDeactivate();
            }
        };

        View.prototype.onDeactivate = function () {
        };

        View.prototype.addChild = function (view) {
            view.parent = this;
            this.children.push(view);

            return view;
        };

        View.prototype.removeChild = function (view) {
            var childIndex = this.children.indexOf(view);
            var child = this.children[childIndex];

            if (childIndex > -1) {
                this.children.splice(childIndex, 1)[0].parent = null;
            }

            return view;
        };

        View.prototype.clearChildren = function () {
            while (this.children.length > 0) {
                this.removeChild(this.children[0]);
            }
        };

        View.prototype.updateView = function (updateValuesOnly) {
            for (var i = 0; this._bindings && i < this._bindings.length; i++) {
                var binding = this._bindings[i];

                for (var bindingType in binding) {
                    if (bindingType != 'id' && bindingType != 'events' && bindingType != 'childId' && bindingType != 'text' && bindingType != 'html') {
                        for (var bindingDest in binding[bindingType]) {
                            var sourcePropertyName = binding[bindingType][bindingDest];
                            var lastValue = this._lastValues[sourcePropertyName];
                            var currentValue = this.getValue(sourcePropertyName);

                            if (lastValue != currentValue) {
                                var el = this._subElements[binding.id];
                                this._lastValues[sourcePropertyName] = currentValue;

                                if (!updateValuesOnly) {
                                    if (bindingType == 'className') {
                                        toggleClass(el, bindingDest, currentValue);
                                    } else if (bindingType == 'attr') {
                                        if (currentValue) {
                                            el.setAttribute(bindingDest, currentValue);
                                        } else {
                                            el.removeAttribute(bindingDest);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        View.prototype.genStyle = function (defaultStyles, styleMap) {
            defaultStyles = defaultStyles || '';

            var styles = defaultStyles.split(';');
            var viewModel = this._viewModel;

            for (var i = 0; styleMap && i < styleMap.length; i += 2) {
                var styleRule = styleMap[i];
                var source = styleMap[i + 1];

                switch (styleRule) {
                    case 'display':
                    case 'display.inline-block':
                        styles.push('display: ' + (this.getValue(source) ? ((styleRule.indexOf('.') > -1) ? styleRule.split('.').pop() : 'block') : 'none'));
                        break;

                    default:
                        if (styleMap[i + 1]) {
                            styles.push(styleMap[i] + ': ' + Encode.toHtmlAttr(this.getValue(styleMap[i + 1])));
                        }
                        break;
                }
            }

            return 'style="' + styles.join('; ') + '"';
        };

        View.prototype.genClass = function (defaultClasses, classMap) {
            defaultClasses = defaultClasses || '';

            var classes = defaultClasses ? defaultClasses.split(' ') : [];

            for (var i = 0; classMap && i < classMap.length; i += 2) {
                if (this.getValue(classMap[i + 1])) {
                    classes.push(classMap[i]);
                }
            }

            return classes.length ? ('class="' + classes.join(' ') + '"') : '';
        };

        View.prototype.genAttr = function (defaultAttributes, attributeMap) {
            var attrString = '';
            var attributes = [];

            for (var i = 0; i < attributeMap.length; i += 2) {
                var val = this.getValue(attributeMap[i + 1]);
                if (val) {
                    attributes.push(attributeMap[i] + '="' + Encode.toHtmlAttr(val) + '"');
                }
            }

            return attributes.join(' ');
        };

        View.prototype.genText = function (propertyName) {
            return Encode.toJS(this.getValue(propertyName));
        };

        View.prototype.genHtml = function (propertyName) {
            return Encode.toHtml(this.getValue(propertyName));
        };

        View.prototype.getViewModel = function () {
            return this._viewModel;
        };

        View.prototype.getValue = function (propertyName) {
            var targetObject = this._getPropTarget(propertyName);

            propertyName = this._getPropName(propertyName);

            var targetValue = targetObject ? targetObject[propertyName] : '';

            if (typeof targetValue === 'function') {
                targetValue = targetValue.call(targetObject, this._viewModel, propertyName);
            }

            return targetValue || '';
        };

        View.prototype.setValue = function (propertyName, propertyValue) {
            var targetObject = this._getPropTarget(propertyName);

            if (targetObject) {
                var data = {};
                data[this._getPropName(propertyName)] = propertyValue;
                targetObject.setData(data);
            }
        };

        View.prototype._getPropName = function (propertyName) {
            var periodIndex = propertyName.lastIndexOf('.');

            if (periodIndex > -1) {
                propertyName = propertyName.substr(periodIndex + 1);
            }

            return propertyName;
        };

        View.prototype._getPropTarget = function (propertyName) {
            var propTarget = this._viewModel;
            var periodIndex = propertyName.indexOf('.');
            var propertyPart;

            while (periodIndex > -1 && propTarget) {
                propertyPart = propertyName.substr(0, periodIndex);

                if (propertyPart === '$parent') {
                    propTarget = this.parent.getViewModel();
                } else if (propertyPart === '$root') {
                    propTarget = this._getRoot().getViewModel();
                } else {
                    propTarget = propTarget[propertyPart];
                }
                propertyName = propertyName.substr(periodIndex + 1);
                periodIndex = propertyName.indexOf('.');
            }

            return propTarget;
        };

        View.loadStyles = function (rules) {
            var styleEl = document.createElement('style');

            styleEl.type = "text/css";
            styleEl.appendChild(document.createTextNode(rules));
            document.head.appendChild(styleEl);
        };

        View.prototype._bindEvents = function () {
            this.events.on(this._viewModel, 'change', this.updateView);

            for (var i = 0; i < this._bindings.length; i++) {
                var binding = this._bindings[i];

                for (var bindingType in binding) {
                    if (bindingType != 'id' && bindingType != 'events') {
                        for (var bindingDest in binding[bindingType]) {
                            var source = binding[bindingType][bindingDest];
                            if (source.indexOf('$parent') > -1) {
                                this._viewModel.setData({
                                    '$parent': this.parent.getViewModel()
                                }, false);
                            }
                            if (source.indexOf('$root') > -1) {
                                this._viewModel.setData({
                                    '$root': this._getRoot().getViewModel()
                                }, false);
                            }
                        }
                    }
                }

                if (binding.events) {
                    for (var eventName in binding.events) {
                        var targetList = binding.events[eventName];
                        var targetElement = document.getElementById(this.id + '_' + binding.id);

                        for (var targetIndex = 0; targetIndex < targetList.length; targetIndex++) {
                            var target = targetList[targetIndex];

                            if (target[0] == '$') {
                                this._bindUtil(targetElement, eventName, target.substr(1));
                            } else {
                                var sourceMethod = this._viewModel[target];

                                if (sourceMethod) {
                                    this.events.on(targetElement, eventName, sourceMethod);
                                }
                            }
                        }
                    }
                }
            }
        };

        View.prototype._getRoot = function () {
            var root = this;

            while (root.parent) {
                root = root.parent;
            }

            return root;
        };

        View.prototype._bindUtil = function (element, eventName, util) {
            var _this = this;
            var paramIndex = util.indexOf('(');
            var utilName = util.substr(0, paramIndex);
            var params = util.substr(paramIndex + 1, util.length - paramIndex - 2).split(/[\s,]+/);
            var method = _this['_' + utilName];

            if (method) {
                _this.events.on(element, eventName, function () {
                    method.apply(_this, params);
                });
            }
        };

        View.prototype._toggle = function (propertyName) {
            this.setValue(propertyName, !this.getValue(propertyName));
        };

        View.prototype._send = function (sourcePropertyName, destinationPropertyName) {
            this.setValue(destinationPropertyName, this.getValue(sourcePropertyName));
        };

        View.prototype._bubble = function (eventName, propertyName) {
            var propertyValue = propertyName ? this.getValue(propertyName) : this.getViewModel();

            return this.events.raise(eventName, propertyValue, true);
        };

        View.prototype._findElements = function () {
            this._subElements = {};

            for (var i = 0; i < this._bindings.length; i++) {
                var binding = this._bindings[i];
                var element = document.getElementById(this.id + '_' + binding.id);

                this._subElements[binding.id] = element;
                if (binding.childId) {
                    this._subElements[binding.childId] = element;
                }
            }
        };
        View._instanceCount = 0;
        return View;
    })();

    function toggleClass(element, className, isEnabled) {
        var classList = element._classes = element._classes || (element.className ? element.className.split(' ') : []);
        var index = classList.indexOf(className);

        if (isEnabled) {
            if (index == -1) {
                classList.push(className);
            }
        } else if (index > -1) {
            classList.splice(index, 1);
        }

        element.className = classList.join(' ');
    }

    
    return View;
});
