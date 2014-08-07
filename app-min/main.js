define("EventGroup",["require","exports"],function(){var e=function(){function e(t){this._id=e._uniqueId++,this._parent=t,this._eventRecords=[]}return e.prototype.dispose=function(){this.off(),this._parent=null},e.prototype.on=function(e,t,n){function i(){var e=n.apply(o,arguments);return e===!1&&arguments[0]&&arguments[0].preventDefault&&arguments[0].preventDefault(),e}var o=this._parent,r={target:e,eventName:t,parent:o,callback:n,elementCallback:null};e.__events=e.__events||{},e.__events[t]=e.__events[t]||{count:0},e.__events[t][this._id]=e.__events[t][this._id]||[],e.__events[t][this._id].push(r),e.__events[t].count++,e.addEventListener&&(r.elementCallback=i,e.addEventListener(t,i),"click"===t&&e.addEventListener("touchstart",i)),this._eventRecords.push(r)},e.prototype.off=function(e,t,n){for(var i=0;i<this._eventRecords.length;i++){var o=this._eventRecords[i];if(!(e&&e!==o.target||t&&t!==o.eventName||n&&n!==o.callback)){var r=o.target.__events[o.eventName],a=r[this._id];1!==a.length&&n?a.splice(a.indexOf(o),1):delete o.target.__events[o.eventName][this._id],--r.count||delete o.target.__events[o.eventName],o.target.removeEventListener&&(o.target.removeEventListener(o.eventName,o.elementCallback),"click"===t&&e.removeEventListener("touchstart",o.elementCallback)),this._eventRecords.splice(i,1)}}},e.prototype.raise=function(e,t,n){for(var i,o=this._parent;o&&i!==!1;){var r=o.__events?o.__events[e]:null;for(var a in r)for(var s=r[a],d=0;i!==!1&&d<s.length;d++){var l=s[d];i=l.callback.call(l.parent,t)}o=n?o.parent:null}return i},e.prototype.declare=function(e){var t=this._parent.__declaredEvents=this._parent.__declaredEvents||{};if("string"==typeof e)t[e]=!0;else for(var n=0;n<e.length;n++)t[e[n]]=!0},e.prototype.autoWire=function(t,n){t=t||this._parent,n="on"+(n||"");var i=this._parent.constructor.prototype;for(var o in i)if("function"==typeof i[o]&&0===o.indexOf(n)){var r=o.substr(n.length,1).toLowerCase()+o.substr(n.length+1);e.isDeclared(t,r)&&this.on(this._parent,r,this._parent[o])}},e.isObserved=function(e,t){return e&&e.__events&&e.__events[t]},e.isDeclared=function(e,t){return e&&e.__declaredEvents&&e.__declaredEvents[t]},e._uniqueId=0,e}();return e}),define("ViewModel",["require","exports","EventGroup"],function(e,t,n){var i=function(){function e(t){this.__id=e.__instanceCount++,this.__events=new n(this),this.__events.declare("change"),this.setData(t)}return e.prototype.dispose=function(){this.__events.dispose()},e.prototype.setData=function(e,t){var i=!1;for(var o in e)if(e.hasOwnProperty(o)&&0!==o.indexOf("__")&&"setData"!==o&&"dispose"!==o&&"change"!==o){var r=this[o],a=e[o];r!==a&&(r&&n.isDeclared(r,"change")&&this.__events.off(r),this[o]=a,i=!0,a&&n.isDeclared(a,"change")&&this.__events.on(a,"change",this.change))}(i&&t!==!1||t===!0)&&this.__events.raise("change")},e.prototype.onInitialize=function(){},e.prototype.change=function(e){this.__events.raise("change",e)},e.__instanceCount=0,e}();return i});var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n};define("ExampleAppModel",["require","exports","ViewModel"],function(e,t,n){var i=function(e){function t(){e.apply(this,arguments),this.pageCommands=[{key:"about",viewType:"AboutPage",text:"About",url:"#/about"},{key:"docs",viewType:"DocsPage",text:"Documentation",url:"#/docs"},{key:"create",viewType:"AboutPage",text:"Create",url:"#/create"},{key:"share",viewType:"AboutPage",text:"Share",url:"#/share"},{key:"discover",viewType:"AboutPage",text:"Discover",url:"#/discover"}],this.selectedPage=this.pageCommands[0]}return __extends(t,e),t.prototype.isViewingPage=function(e){return e&&e.command&&e.command.key==this.selectedPage.key},t.prototype.onInitialize=function(){this.__events.on(window,"hashchange",this._onHashChanged)},t.prototype._onHashChanged=function(){for(var e=document.location.hash,t=this.pageCommands,n=0;t&&n<t.length;n++)if(0==e.indexOf(t[n].url)){this.selectedPage=t[n];break}this.change()},t}(n);return i}),define("Encode",["require","exports"],function(){var e=function(){function e(){}return e.toHtml=function(t){return String(e.toSafe(t)).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},e.toHtmlAttr=function(t){return e.toHtml(t)},e.toJS=function(e){return e||""},e.toUrl=function(t){return e.toSafe(t)},e.toSafe=function(e){return e||""},e}();return e}),define("DomUtils",["require","exports"],function(){var e=function(){function e(){}return e.toggleClass=function(e,t,n){var i=e._classes=e._classes||(e.className?e.className.split(" "):[]),o=i.indexOf(t);n?-1==o&&i.push(t):o>-1&&i.splice(o,1),e.className=i.join(" ")},e.loadStyles=function(e){var t=document.createElement("style");t.type="text/css",t.appendChild(document.createTextNode(e)),document.head.appendChild(t)},e}();return e}),define("View",["require","exports","ViewModel","EventGroup","Encode","DomUtils"],function(e,t,n,i,o,r){var a;!function(e){e[e.CREATED=0]="CREATED",e[e.INACTIVE=1]="INACTIVE",e[e.ACTIVE=2]="ACTIVE",e[e.DISPOSED=3]="DISPOSED"}(a||(a={}));var s=function(){function e(e){this.viewName="View",this.viewModelType=n,this._bindings=[],this._lastValues={},this._state=0,this.loadStyles=r.loadStyles,this.events=new i(this),this.activeEvents=new i(this),this.children=[],this._initialData=e}return e.prototype.dispose=function(){if(3!==this._state){2==this._state&&this.deactivate(),this._state=3;for(var e=0;e<this.children.length;e++)this.children[e].dispose();this.clearChildren(),this.events.dispose(),this.activeEvents.dispose(),this._viewModel.dispose()}},e.prototype.onInitialize=function(){},e.prototype.onRenderHtml=function(){return""},e.prototype.onActivate=function(){},e.prototype.onDeactivate=function(){},e.prototype.onViewModelChanged=function(){},e.prototype.setData=function(e,t){3!==this._state&&(this.initialize(),this._viewModel.setData(e,t))},e.prototype.initialize=function(){if(0===this._state){this._state=1,this.id=this.viewName+"-"+e._instanceCount++,this._viewModel=new this.viewModelType(this._initialData),this.events.on(this._viewModel,"change",this.evaluateView),this._viewModel.onInitialize(),this.onViewModelChanged(),this.onInitialize();for(var t=0;t<this.children.length;t++)this.children[t].initialize()}},e.prototype.renderHtml=function(){var e;return 3!==this._state&&(this.initialize(),e=this.onRenderHtml(this._viewModel)),e},e.prototype.activate=function(){if(1===this._state){this._state=2,this._bindEvents(),this._findElements(),this.updateView(!0);for(var e=0;e<this.children.length;e++)this.children[e].activate();this.onActivate()}},e.prototype.deactivate=function(){if(2===this._state){this._state=1,this.onDeactivate(),this._subElements=null,this.activeEvents.off();for(var e=0;e<this.children.length;e++)this.children[e].deactivate()}},e.prototype.addChild=function(e,t){return e.parent=this,e.owner=t,this.children.push(e),e},e.prototype.removeChild=function(e){{var t=this.children.indexOf(e);this.children[t]}return t>-1&&(this.children.splice(t,1)[0].parent=null),e},e.prototype.clearChildren=function(){for(;this.children.length>0;)this.removeChild(this.children[0])},e.prototype.evaluateView=function(){this.onViewModelChanged(),this.updateView()},e.prototype.updateView=function(e){if(2===this._state)for(var t=0;this._bindings&&t<this._bindings.length;t++){var n=this._bindings[t];for(var i in n)if("id"!=i&&"events"!=i&&"childId"!=i&&"text"!=i&&"html"!=i)for(var o in n[i]){var a=n[i][o],s=n.id+i+"."+o,d=this._lastValues[s],l=this.getValue(a);if(d!=l){var c=this._subElements[n.id];this._lastValues[s]=l,e||(console.log(this.viewName+" updateView"+this.id),"className"==i?r.toggleClass(c,o,l):"attr"==i&&(l?c.setAttribute(o,l):c.removeAttribute(o)))}}}},e.prototype.getViewModel=function(){return this._viewModel},e.prototype.getValue=function(e){var t=this._getPropTarget(e);e=this._getPropName(e);var n=t&&t.target?t.target[e]:"";return"function"==typeof n&&(n=n.call(t.target,this._viewModel,e)),n},e.prototype.setValue=function(e,t){var n=this._getPropTarget(e),i=n.view.getViewModel();i&&(n.target[this._getPropName(e)]=t,i.change())},e.prototype._getPropName=function(e){var t=e.lastIndexOf(".");return t>-1&&(e=e.substr(t+1)),e},e.prototype._getPropTarget=function(e){for(var t,n=this,i=n.getViewModel(),o=e.indexOf(".");o>-1&&i;)t=e.substr(0,o),"$parent"===t?(n=this.parent.owner||this.parent,i=n?n.getViewModel():null):"$root"===t?(n=this._getRoot(),i=n.getViewModel()):i=i[t],e=e.substr(o+1),o=e.indexOf(".");return{originView:this,view:n,target:i}},e.prototype._getRoot=function(){for(var e=this;e.parent;)e=e.parent;return e},e.prototype._genStyle=function(e,t){e=e||"";for(var n=e.split(";"),i=(this._viewModel,0);t&&i<t.length;i+=2){var r=t[i],a=t[i+1];switch(r){case"display":case"display.inline-block":n.push("display: "+(this.getValue(a)?r.indexOf(".")>-1?r.split(".").pop():"block":"none"));break;default:t[i+1]&&n.push(t[i]+": "+o.toHtmlAttr(this.getValue(t[i+1])))}}return'style="'+n.join("; ")+'"'},e.prototype._genClass=function(e,t){e=e||"";for(var n=e?e.split(" "):[],i=0;t&&i<t.length;i+=2)this.getValue(t[i+1])&&n.push(t[i]);return n.length?'class="'+n.join(" ")+'"':""},e.prototype._genAttr=function(e,t){for(var n=[],i=0;i<t.length;i+=2){var r=this.getValue(t[i+1]);r&&n.push(t[i]+'="'+o.toHtmlAttr(r)+'"')}return n.join(" ")},e.prototype._genText=function(e){return o.toJS(this.getValue(e))},e.prototype._genHtml=function(e){return o.toHtml(this.getValue(e))},e.prototype._bindEvents=function(){for(var e=0;e<this._bindings.length;e++){var t=this._bindings[e];for(var n in t)if("id"!=n&&"events"!=n)for(var i in t[n]){var o=t[n][i];o.indexOf("$parent")>-1&&this._viewModel.setData({$parent:(this.owner||this.parent).getViewModel()},!1),o.indexOf("$root")>-1&&this._viewModel.setData({$root:this._getRoot().getViewModel()},!1)}if(t.events)for(var r in t.events)for(var a=t.events[r],s=document.getElementById(this.id+"_"+t.id),d=0;d<a.length;d++){var l=a[d];if("$"==l[0])this._bindUtil(s,r,l.substr(1));else{var c=this._viewModel[l];c&&this.activeEvents.on(s,r,c)}}}},e.prototype._bindUtil=function(e,t,n){var i=this,o=n.indexOf("("),r=n.substr(0,o),a=n.substr(o+1,n.length-o-2).split(/[\s,]+/),s=i["_"+r];s&&i.events.on(e,t,function(){return s.apply(i,a)})},e.prototype._toggle=function(e){return this.setValue(e,!this.getValue(e)),!1},e.prototype._send=function(e,t){this.setValue(t,this.getValue(e))},e.prototype._bubble=function(e,t){var n=t?this.getValue(t):this.getViewModel();return this.events.raise(e,n,!0)},e.prototype._findElements=function(){this._subElements={};for(var e=0;e<this._bindings.length;e++){var t=this._bindings[e],n=document.getElementById(this.id+"_"+t.id);this._subElements[t.id]=n,t.childId&&(this._subElements[t.childId]=n)}},e._instanceCount=0,e}();return s});var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n};define("ExampleAppBase",["require","exports","View"],function(e,t,n){var i=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t}(n);return i});var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n};define("HeaderModel",["require","exports","ViewModel"],function(e,t,n){var i=function(e){function t(){e.apply(this,arguments),this.logoText="OneJS",this.commandsExpanded=!1,this.selectedCommand=null,this.commands=[]}return __extends(t,e),t.prototype.isSelected=function(e){return e.command&&this.selectedCommand===e.command},t}(n);return i});var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n};define("Repeater",["require","exports","View"],function(e,t,n){var i=function(e){function t(){e.apply(this,arguments),this.viewName="Repeater",this.collectionName="items",this.itemName="item",this.indexName="index",this.childViewType=n,this._bindings=[{id:"0",childId:"surface"}]}return __extends(t,e),t.prototype.onRenderHtml=function(){return'<div id="'+this.id+'_0">'+this.renderItems()+"</div>"},t.prototype.renderItems=function(){var e=this.getValue(this.collectionName),t="";this.clearChildren();for(var n=0;e&&n<e.length;n++){var i,o=this.addChild(new this.childViewType,this.owner);i={},i[this.collectionName]=e,i[this.itemName]=e[n],i[this.indexName]=n,o.setData(i),t+=o.renderHtml()}return t},t}(n);return i}),define("Header.css",["require","exports"],function(e,t){t.styles='.c-Header{background:#f3f3f3;color:#666;position:fixed;width:100%;z-index:10;box-shadow:0 0 20px 20px rgba(255,255,255,.8);white-space:nowrap;opacity:.96}.c-Header .hamburgerButton{display:none;width:50px;height:50px;vertical-align:top;background:url(data:image/gif;base64,R0lGODlhEAANAJEAAAAAAP///2Gi3v///yH5BAEAAAMALAAAAAAQAA0AAAIUlI+py30Do5y0SoezNrb7uYXiUQAAOw==) center no-repeat #e8e8e8;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.c-Header .logoImage{display:inline-block;vertical-align:top;padding-left:20px;width:28px;height:50px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAASCAYAAABIB77kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAARtJREFUeNq0VdERgjAMfXj+ywaygYzACLoBG8gIuoEj4AZuYJ1A3AA3KBM8f4KXw7aA1nfX44AmL3lp0oQkZiIDUAHI5d0CuMiyo9Yk56ySpKUblmQ+5iMJZJhJFimARp7Xkfg7sWnnZnhiGC1JI6sZ/DOhDOeSGY9s2cDOK+3SIePeI8YZQAmgAFDLXn1oKgBGlWGSpKdAZv2h8aFWftKpkhqPs0Jk44TaDoNIfYSlw8CqyGt+h2ZImDmISPKioss9e6ZiqwlNoGbbH4l6HDShCznJivHQij8k/Bw1nZouG8TFMSFpAazUx5v0GhEfz4U0rEZ/Czz/QLheyNTYKYKVTBHzB8KH67YoZNqnAO6xazh2/8Vqi/foew0A8accxaWTTLUAAAAASUVORK5CYII=) right no-repeat #5a9edd}.c-Header .logo{display:inline-block;height:50px;line-height:50px;padding-left:5px;padding-right:20px;margin-right:10px;font-size:1.3em;font-family:"Segoe UI Light","Segoe UI Web Light","Segoe UI Web Regular","Segoe UI","Segoe UI Symbol",HelveticaNeue-Light,"Helvetica Neue",Arial,sans-serif;background:#5a9edd;color:#fff;box-shadow:inset -26px 0 7px -20px rgba(0,0,0,.08)}.c-Header .commandArea{display:inline-block;vertical-align:top}.c-Header .commandArea .commands{display:inline-block;list-style-type:none;margin:0;padding:0;vertical-align:top;height:50px;line-height:50px}.c-Header .commandArea .commands li{display:inline-block;vertical-align:top;margin:0 5px;-webkit-tap-highlight-color:transparent}.c-Header .commandArea .commands li a{text-decoration:none;color:inherit;display:inline-block;height:50px;line-height:50px;vertical-align:top;padding:0 10px}.c-Header .commandArea .commands li.selected,.c-Header .commandArea .commands li.selected:hover{border-bottom:5px solid #5a9edd;line-height:50px;height:45px;background:linear-gradient(to bottom,rgba(232,232,232,0) 0,rgba(232,232,232,.4) 78%,rgba(90,158,221,.2) 100%) #e8e8e8}.c-Header .commandArea .commands li:hover{background:#e8e8e8}@media (max-width:640px){.c-Header{background:#5a9edd}.c-Header .hamburgerButton{display:inline-block}.c-Header .logo{box-shadow:none}.c-Header .commandArea{display:block;max-height:0;overflow:hidden}.c-Header .commandArea.isExpanded{max-height:300px;transition:max-height .2s ease-in}.c-Header .commandArea.isExpanded .commands{height:auto;display:block;background:#888;color:#f3f3f3}.c-Header .commandArea.isExpanded .commands li{display:block;margin:0;padding:5px}.c-Header .commandArea.isExpanded .commands li a{display:block;font-size:1.5em}.c-Header .commandArea.isExpanded .commands li.selected:hover,.c-Header .commandArea.isExpanded .commands li:hover{background:#a2a2a2;color:inherit}.c-Header .commandArea.isExpanded .commands li.selected{border-bottom:none;line-height:inherit;background:#a2a2a2;height:50px}}'});var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n};define("Header",["require","exports","HeaderModel","View","Repeater","DomUtils","Header.css"],function(e,t,n,i,o,r,a){r.loadStyles(a.styles);var s=function(e){function t(){e.apply(this,arguments),this.viewName="HeaderBlock0Item",this._bindings=[{id:"0",className:{selected:"$parent.isSelected"},events:{click:["$send(command, $parent.selectedCommand)"]}},{id:"1",attr:{href:"command.url"},text:"command.text"}]}return __extends(t,e),t.prototype.onRenderHtml=function(){return'<li id="'+this.id+'_0" '+this._genClass("command",["selected","$parent.isSelected"])+'><a id="'+this.id+'_1" '+this._genAttr("",["href","command.url"])+">"+this._genText("command.text")+"</a></li>"},t}(i),d=function(e){function t(){e.apply(this,arguments),this.viewName="HeaderBlock0",this.childViewType=s,this.itemName="command",this._bindings=[{id:"0",childId:"surface"}]}return __extends(t,e),t.prototype.onRenderHtml=function(){return'<ul id="'+this.id+'_0" class="commands">'+this.renderItems()+"</ul>"},t}(o),l=function(e){function t(){e.apply(this,arguments),this.viewName="Header",this.viewModelType=n,this.headerBlock0=this.addChild(new d),this._bindings=[{id:"0",events:{click:["$toggle(commandsExpanded)"]}},{id:"1",text:"logoText"},{id:"2",className:{isExpanded:"commandsExpanded"}}]}return __extends(t,e),t.prototype.onInitialize=function(){e.prototype.onInitialize.call(this),this.headerBlock0.owner=this},t.prototype.onViewModelChanged=function(){e.prototype.onViewModelChanged.call(this),this.headerBlock0.setData({items:this.getValue("commands")})},t.prototype.onRenderHtml=function(){return'<div class="c-Header"><div id="'+this.id+'_0" class="hamburgerButton"></div><div class="logoImage"></div><div id="'+this.id+'_1" class="logo">'+this._genText("logoText")+'</div><div id="'+this.id+'_2" '+this._genClass("commandArea",["isExpanded","commandsExpanded"])+">"+this.headerBlock0.renderHtml()+"</div></div>"},t}(i);return l});var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n};define("ContentControl",["require","exports","View"],function(e,t,n){var i=function(t){function n(){t.apply(this,arguments)}return __extends(n,t),n.prototype.getContentType=function(){return this.getViewModel().contentType},n.prototype.onInitialize=function(){this.updateContent()},n.prototype.onRenderHtml=function(){var e='<div id="'+this.id+'">';return this.activeControl&&(e+=this.activeControl.renderHtml()),e+="</div>"},n.prototype.onActivate=function(){this.containerElement=document.getElementById(this.id)},n.prototype.onViewModelChanged=function(){this.updateContent()},n.prototype.updateContent=function(){var t=this,n=t.getContentType(t.getViewModel());n!=t.activeContentType?(t.activeContentType=n,t.activeControl&&(t.activeControl.dispose(),t.removeChild(t.activeControl)),e([n],function(e){2==t._state&&n==t.activeContentType&&(t.activeControl=t.addChild(new e),t.activeControl.setData(t.getViewModel()),t.swapInControl(t.activeControl))})):t.activeControl&&t.activeControl.setData(t.getViewModel())},n.prototype.swapInControl=function(e){this.containerElement.innerHTML=e.renderHtml(),e.activate()},n}(n);return i}),define("ExampleApp.css",["require","exports"],function(e,t){t.styles='body{padding:0;margin:0;position:absolute;top:0;left:0;width:100%;height:100%;font-family:"Segoe UI","Segoe UI Symbol",HelveticaNeue-Light,"Helvetica Neue",Arial,sans-serif}h1{font-family:"Segoe UI Light","Segoe UI Web Light","Segoe UI Web Regular","Segoe UI","Segoe UI Symbol",HelveticaNeue-Light,"Helvetica Neue",Arial,sans-serif;font-weight:400;font-size:2em;color:#5a9edd}h2{font-family:"Segoe UI Light","Segoe UI Web Light","Segoe UI Web Regular","Segoe UI","Segoe UI Symbol",HelveticaNeue-Light,"Helvetica Neue",Arial,sans-serif;font-size:1.5em;font-weight:400;color:#5a9edd}h3{font-family:"Segoe UI Light","Segoe UI Web Light","Segoe UI Web Regular","Segoe UI","Segoe UI Symbol",HelveticaNeue-Light,"Helvetica Neue",Arial,sans-serif;font-size:1.1em;font-weight:400;color:#5a9edd;margin:0;padding:20px 0 10px}ol{list-style-image:url(data:image/gif;base64,R0lGODlhDQAJAKIAAAAAAP///1qe3cza5////wAAAAAAAAAAACH5BAEAAAQALAAAAAANAAkAAAMZSLoswpA4MaKa1eLluMvSFFLQtEUmiJJRAgA7)}li,p{font-size:.8em}li{line-height:2em}a{color:#0093e6;padding:2px 5px;text-decoration:none}a:visited{color:#0093e6}a:hover{text-decoration:underline}.ref{padding:2px 5px;margin:4px;background:#e8e8e8;border:1px solid #ddd;font-family:Consolas,"Courier New";white-space:nowrap}.warn{background:#ffffb6}.code{word-wrap:break-word;border-left:5px solid #5a9edd;margin-left:20px;padding:10px;font-family:Consolas,"Courier New";font-size:.8em;background:#f3f3f3}.c-ExampleApp .centered{text-align:center;padding-top:50px}.c-ExampleApp .page{display:inline-block;max-width:800px;padding:10px 20px;text-align:left}@media (max-width:640px){h1{font-size:1.3em}h2{font-size:1.1em}}'});var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n};define("ExampleApp",["require","exports","ExampleAppModel","ExampleAppBase","Header","ContentControl","DomUtils","ExampleApp.css"],function(e,t,n,i,o,r,a,s){a.loadStyles(s.styles);var d=function(e){function t(){e.apply(this,arguments),this.viewName="ExampleApp",this.viewModelType=n,this.header=this.addChild(new o),this.content=this.addChild(new r)}return __extends(t,e),t.prototype.onViewModelChanged=function(){e.prototype.onViewModelChanged.call(this),this.header.setData({commands:this.getValue("pageCommands"),selectedCommand:this.getValue("selectedPage")}),this.content.setData({contentType:this.getValue("selectedPage.viewType")})},t.prototype.onRenderHtml=function(){return'<div class="c-ExampleApp">'+this.header.renderHtml()+'<div class="centered">'+this.content.renderHtml()+"</div></div>"},t}(i);return d}),define("main",["require","exports","ExampleApp"],function(e,t,n){var i=new n;document.body.innerHTML=i.renderHtml(),i.activate()});