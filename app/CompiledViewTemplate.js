define(["require", "exports", 'xmldom', './ViewTemplateDefinition'], function(require, exports, XMLDOM, ViewTemplateDefinition) {
    /// <summary>
    /// Represents a compiled view template. Provides a parse method to populate its public
    /// properties. The "errors" property will be populated with an array of strings, if any
    /// occur during parsing.
    /// </summary>
    var CompiledViewTemplate = (function () {
        function CompiledViewTemplate(templateContent) {
            this._blockCount = 0;
            this._annotationCount = 0;
            if (templateContent) {
                this.parse(templateContent);
            } else {
                this._reset();
            }
        }
        CompiledViewTemplate.prototype.parse = function (templateContent) {
            this._reset();
            this.parseRootElement(new XMLDOM.DOMParser().parseFromString(templateContent, 'application/xhtml+xml').documentElement);
        };

        CompiledViewTemplate.prototype.parseRootElement = function (element) {
            this.documentElement = element;
            this.name = element.getAttribute('js-type');
            this.baseViewType = element.getAttribute('js-baseType') || 'View';
            this.viewModelType = element.getAttribute('js-model') || '';
            this.options = element.getAttribute('js-options') || '';
            this.cssInclude = (element.getAttribute('js-css') || '');

            // If name has periods in it, just use the last part for now.
            if (this.name.indexOf('.') > -1) {
                var nameParts = this.name.split('.');
                this.name = nameParts[nameParts.length - 1];
            }

            this._parseElementChildren(element);
        };

        CompiledViewTemplate.prototype._parseElement = function (element) {
            // Do baseline validation and any custom validation stage for the specific element type.
            if (this._validateElementIsExpected(element) && this._validateAttributes(element) && this._performCustomStage('validate', element)) {
                // The element is valid, process it.
                this._performCustomStage('process', element);

                if (element.tagName !== 'js-view') {
                    this._parseElementChildren(element);
                }
            }
        };

        CompiledViewTemplate.prototype._parseElementChildren = function (element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var childElement = element.childNodes[i];

                switch (childElement.nodeType) {
                    case element.ELEMENT_NODE:
                        this._parseElement(childElement);
                        break;
                    case element.TEXT_NODE:
                        var value = element.textContent.trim();

                        if (!value) {
                            element.removeChild(childElement);
                            i--;
                        }
                        break;
                }
            }
        };

        CompiledViewTemplate.prototype._reset = function () {
            this.name = '';
            this.viewModelType = '';
            this.options = '';
            this.annotations = {};
            this.childViews = {};
            this.properties = {};
            this.cssInclude = '';
            this.subTemplates = [];
            this.events = [];
            this.errors = [];
            this.documentElement = null;

            this._annotationCount = 0;
        };

        CompiledViewTemplate.prototype._addError = function (errorMessage, element) {
            var lineNumber = element ? element['lineNumber'] : undefined;
            var columnNumber = element ? element['columnNumber'] : undefined;
            var position = (lineNumber !== undefined && columnNumber !== undefined) ? ('(line: ' + lineNumber + ', col: ' + columnNumber + ') ') : '';

            this.errors.push(position + errorMessage);
        };

        CompiledViewTemplate.prototype._performCustomStage = function (stageName, element) {
            var elementDefinition = this._getDefinition(element);
            var isValid = true;
            var stageEventMethodName = '_' + stageName + this._getHandlerName(elementDefinition.id) + 'Element';

            if (!this[stageEventMethodName] || this[stageEventMethodName].call(this, element, elementDefinition)) {
                for (var attributeName in elementDefinition.attributes) {
                    var stageAttributeMethodName = '_' + stageName + this._getHandlerName(attributeName) + 'Attribute';
                    var attributeValue = element.getAttribute(attributeName);

                    if (this[stageAttributeMethodName] && attributeValue && this[stageAttributeMethodName].call(this, element, elementDefinition, attributeValue) === false) {
                        isValid = false;
                        break;
                    }
                }
            } else {
                isValid = false;
            }

            return isValid;
        };

        CompiledViewTemplate.prototype._validateElementIsExpected = function (element) {
            var elementDefinition = this._getDefinition(element);
            var isValid = true;
            var parentElement = element.parentNode;
            var parentDefinition = this._getDefinition(parentElement);

            if (parentDefinition && parentDefinition.children.indexOf(elementDefinition.id) === -1) {
                this._addError('The element "' + element.tagName + '" is not a valid child for the element "' + parentElement.tagName + '".', element);
                isValid = false;
            }

            return isValid;
        };

        CompiledViewTemplate.prototype._validateAttributes = function (element) {
            var isValid = true;
            var elementDefinition = this._getDefinition(element);

            for (var attributeName in elementDefinition.attributes) {
                var attribute = elementDefinition.attributes[attributeName];
                if (attribute.isRequired && !element.getAttribute(attributeName)) {
                    isValid = false;
                    this._addError('The element "' + element.tagName + '" was missing a required attribute "' + attributeName + '".', element);
                }
            }

            return isValid;
        };

        CompiledViewTemplate.prototype._validateRepeatAttribute = function (element, elementDefintion, attributeValue) {
            element.removeAttribute('js-repeat');

            var repeatSource = attributeValue.split(' in ')[1];

            var itemTemplate = new CompiledViewTemplate();
            var repeatBlockType = this.name + 'Block' + this._blockCount++;
            var repeatItemType = repeatBlockType + 'Item';
            var rootSurfaceElement = element.cloneNode(true);

            while (element.attributes.length) {
                element.removeAttribute(element.attributes[0].name);
            }

            while (element.childNodes.length) {
                element.removeChild(element.childNodes[0]);
            }

            var itemPlaceholderNode = element.cloneNode();

            element.tagName = 'js-view';

            var itemTemplateElement = element.cloneNode();

            element.setAttribute('js-name', this._toCamelCase(repeatBlockType));
            element.setAttribute('js-type', repeatBlockType);
            element.setAttribute('js-baseType', 'Repeater');
            element.setAttribute('js-options', '{ childViewType: \'' + repeatItemType + '\' }');
            element.setAttribute('js-data', '{ items: this.getValue(\'' + repeatSource + '\') }');

            itemTemplateElement.setAttribute('js-name', this._toCamelCase(repeatItemType));
            itemTemplateElement.setAttribute('js-type', repeatItemType);

            while (rootSurfaceElement.childNodes.length) {
                var childNode = rootSurfaceElement.childNodes[0];

                itemTemplateElement.appendChild(childNode);
            }

            itemPlaceholderNode.tagName = 'js-items';

            rootSurfaceElement.setAttribute('js-id', 'surface');
            rootSurfaceElement.appendChild(itemPlaceholderNode);

            element.appendChild(rootSurfaceElement);

            itemTemplate.parseRootElement(itemTemplateElement);
            this.subTemplates.push(itemTemplate);

            //containerTemplate.parseRootElement(containerViewElement);
            //this.subTemplates.push(containerTemplate);
            return true;
        };

        CompiledViewTemplate.prototype._processViewElement = function (element) {
            var subTemplate = new CompiledViewTemplate();
            var name = element.getAttribute('js-name');

            subTemplate.parseRootElement(element);

            var childView = this.childViews[name] = {
                name: name,
                type: element.getAttribute('js-type') || '',
                baseType: subTemplate.baseViewType,
                options: element.getAttribute('js-options') || '',
                data: element.getAttribute('js-data') || '',
                shouldImport: (element.childNodes.length == 0)
            };

            if (!childView.shouldImport) {
                this.subTemplates.push(subTemplate);
            }

            return true;
        };

        /*
        private _validateSectionElement(element: HTMLElement, elementDefinition): boolean {
        var isValid = true;
        
        if (!element.getAttribute('js-if') && !element.getAttribute('js-repeat')) {
        this._addError('The element "js-section" requires either a "js-if" or "js-repeat" attribute.', element);
        isValid = false;
        }
        
        return isValid;
        }
        
        private _processViewElement(element): boolean {
        var annotation = this._getAnnotation(element);
        
        this.name = element.getAttribute('js-name');
        element.removeAttribute('js-name');
        
        this.viewModelType = element.getAttribute('js-model') || '';
        element.removeAttribute('js-model');
        
        this.cssInclude = (element.getAttribute('js-css') || '');
        element.removeAttribute('js-css');
        
        this.cssInclude
        if (this.name.indexOf('.') > -1) {
        var nameParts = this.name.split('.');
        this.name = nameParts[nameParts.length - 1];
        }
        
        return true;
        }
        
        private _processControlElement(element): boolean {
        var parentNode = element.parentNode;
        var name = element.getAttribute('js-name');
        
        if (this.childViews[name]) {
        this._addError('The is more than 1 control with the name "' + name + '".', element);
        } else {
        this.childViews[name] = {
        name: name,
        type: element.getAttribute('js-type') || '',
        data: element.getAttribute('js-data')
        };
        }
        
        return true;
        }
        */
        CompiledViewTemplate.prototype._processIdAttribute = function (element, elementDefinition, attributeValue) {
            var childId = element.getAttribute('js-id');
            var annotation;

            if (childId) {
                annotation = this._getAnnotation(element);
                annotation.childId = childId;
                element.removeAttribute('js-id');
            }

            return true;
        };

        /*
        private _processRepeatAttribute(element, elementDefinition, attributeValue): boolean {
        var subTemplate = new CompiledViewTemplate();
        var repeatBlockName = this.name + 'Block' + this.subTemplates.length;
        var firstChildElement;
        
        while (element.childNodes.length) {
        if (!firstChildElement && element.childNodes[0].nodeType == element.ELEMENT_NODE) {
        firstChildElement = element.childNodes[0];
        }
        element.removeChild(element.childNodes[0]);
        }
        
        var baseTag = element.tagName;
        
        element.tagName = 'js-view';
        element.setAttribute('js-name', this._toCamelCase(repeatBlockName));
        element.setAttribute('js-type', 'Repeater');
        element.setAttribute('js-data', '{ baseTag: \'' + baseTag + '\', childControl: ' + repeatBlockName + ' }');
        
        this._processControlElement(element);
        
        firstChildElement.setAttribute('js-view', repeatBlockName);
        
        subTemplate.parseRootElement(firstChildElement);
        this.subTemplates.push(subTemplate);
        
        element.removeAttribute('js-repeat');
        
        return true;
        }
        */
        CompiledViewTemplate.prototype._processBindAttribute = function (element, elementDefinition, attributeValue) {
            var _this = this;
            var annotation = _this._getAnnotation(element);

            // The current compiler allows semicolons or commas.
            attributeValue = attributeValue.replace(/;/g, ',');

            attributeValue.match(/([a-zA-Z0-9-_$:.]*\([^\)]+\)|[^,^(^)]+)/g).forEach(function (binding) {
                var bindingDestSource = binding.split(':');
                var dest = bindingDestSource[0].trim();
                var source = bindingDestSource[1].trim();
                var subDest = dest.split('.');

                if (subDest.length > 1) {
                    dest = subDest.shift();
                    subDest = subDest.join('.');
                } else {
                    subDest = dest;
                    dest = 'attr';
                }

                var expectedSourceType = (source.indexOf('is') == 0) ? 'boolean' : 'string';

                switch (dest) {
                    case 'attr':
                        if (subDest === 'text') {
                            annotation.text = source;
                        } else if (subDest === 'html') {
                            annotation.html = source;
                        } else {
                            var attributeBindings = annotation['attr'] = annotation['attr'] || {};

                            attributeBindings[subDest] = source;
                        }

                        break;

                    case 'className':
                        var classBindings = annotation['className'] = annotation['className'] || {};

                        expectedSourceType = 'boolean';
                        classBindings[subDest] = source;
                        break;

                    case 'css':
                        var styleBindings = annotation['css'] = annotation['css'] || {};

                        styleBindings[subDest.toLowerCase()] = source;
                        break;
                }

                if (!_this.properties[source]) {
                    _this.properties[source] = {
                        name: source,
                        type: expectedSourceType
                    };
                }

                element.removeAttribute('js-bind');
            });

            return true;
        };

        CompiledViewTemplate.prototype._processUserActionAttribute = function (element, elementDefinition, attributeValue) {
            var _this = this;
            var annotation = _this._getAnnotation(element);
            var events = annotation.events = annotation.events || {};

            // This match isn't quite right, doesn't ignore whitespace.
            attributeValue.match(/([a-zA-Z0-9-_$:.]*\([^\)]+\)|[^,^(^)]+)/g).forEach(function (event) {
                event = event.split(':');

                var eventName = event[0].trim();
                var callbackName = event[1].trim();

                events[eventName] = events[eventName] || [];
                events[eventName].push(callbackName);
            });

            element.removeAttribute('js-userAction');

            return true;
        };

        CompiledViewTemplate.prototype._getDefinition = function (element) {
            var definition = null;
            var definitionId = ViewTemplateDefinition[element.tagName] ? element.tagName : 'default';

            element = element.nodeType === element.DOCUMENT_NODE ? null : element;

            if (element) {
                definition = ViewTemplateDefinition[definitionId];
                definition.id = definitionId;
            }

            return definition;
        };

        CompiledViewTemplate.prototype._getHandlerName = function (propertyName) {
            if (propertyName.substr(0, 3) === 'js-') {
                propertyName = propertyName.substr(3);
            }

            propertyName = propertyName.substr(0, 1).toUpperCase() + propertyName.substr(1);

            return propertyName;
        };

        CompiledViewTemplate.prototype._getAnnotation = function (element) {
            if (!element['annotation']) {
                var id = String(this._annotationCount++);

                this.annotations[id] = element['annotation'] = {
                    id: id
                };
            }

            return element['annotation'];
        };

        CompiledViewTemplate.prototype._toCamelCase = function (val) {
            val = val || '';

            val = val[0].toLowerCase() + val.substr(1);

            return val;
        };
        return CompiledViewTemplate;
    })();

    
    return CompiledViewTemplate;
});
