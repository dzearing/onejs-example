import View = require('View');
import DomUtils = require('DomUtils');
import DocsPagecss = require('DocsPage.css');

DomUtils.loadStyles(DocsPagecss.styles);

class DocsPage extends View {
    viewName = 'DocsPage';

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","c-DocsPage"], null, [
            _this._ce("div", ["class","index"], null, [
                _this._ce("h3", [], null, [
                    _this._ct("Guides")
                ]),
                _this._ce("ul", [], null, [
                    _this._ce("li", [], null, [
                        _this._ct("Creating a OneJS site")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Creating/publishing controls")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Navigation and routing")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Working with observables")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Managing selection")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Exposing resources")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Making ajax calls")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Writing a functional test")
                    ])
                ]),
                _this._ce("h3", [], null, [
                    _this._ct("Template reference")
                ]),
                _this._ce("ul", [], null, [
                    _this._ce("li", [], null, [
                        _this._ct("Template syntax guide")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Binding utilities")
                    ])
                ]),
                _this._ce("h3", [], null, [
                    _this._ct("OneJS API reference")
                ]),
                _this._ce("ul", [], null, [
                    _this._ce("li", [], null, [
                        _this._ct("View class")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("EventGroup class")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("ViewModel class")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("DomUtils class")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Encode class")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("Repeater class")
                    ]),
                    _this._ce("li", [], null, [
                        _this._ct("ContentControl class")
                    ])
                ])
            ]),
            _this._ce("div", ["class","content"], null, [
                _this._ce("h2", [], null, [
                    _this._ct("Navigation and routing")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("TODO")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Working with observables")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("TODO")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Managing selection")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("TODO")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Exposing resources")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("TODO")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Making ajax calls")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("TODO")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Template syntax guide")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("TODO")
                ]),
                _this._ce("h2", [], null, [
                    _this._ct("Binding utilities")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("TODO")
                ])
            ])
        ]));
    }
}

export = DocsPage;
