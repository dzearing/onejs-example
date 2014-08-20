define(["require","exports","ViewModel","EventGroup","DomUtils"],function(t,e,i,n,s){var r;!function(t){t[t.CREATED=0]="CREATED",t[t.INACTIVE=1]="INACTIVE",t[t.ACTIVE=2]="ACTIVE",t[t.DISPOSED=3]="DISPOSED"}(r||(r={}));var o=function(){function t(t){this.viewName="View",this.viewModelType=i,this.subElements={},this._bindings=[],this._lastValues={},this._state=0,this.events=new n(this),this.activeEvents=new n(this),this.children=[],this._inheritedModel=t}return t.prototype.dispose=function(){for(var t=0;t<this.children.length;t++)this.children[t].dispose();3!==this._state&&(2==this._state&&this.deactivate(),this._state=3,this.clearChildren(),this.events.dispose(),this.activeEvents.dispose(),this._inheritedModel||this._viewModel.dispose(),this.element&&(this.element.control=null,this.element=null))},t.prototype.onInitialize=function(){},t.prototype.onRenderElement=function(){this.element=this._ce("div")},t.prototype.onResize=function(){},t.prototype.onActivate=function(){},t.prototype.onDeactivate=function(){},t.prototype.onViewModelChanged=function(){},t.prototype.setData=function(t,e){3!==this._state&&(this.initialize(),this._viewModel.setData(t,e))},t.prototype.initialize=function(){if(0===this._state){this._state=1,this.id=this.viewName+"-"+t._instanceCount++,this._viewModel=this._inheritedModel?this._inheritedModel:new this.viewModelType,this.events.on(this._viewModel,"change",this.evaluateView),this._viewModel.initialize(),this.onViewModelChanged(),this.onInitialize();for(var e=0;e<this.children.length;e++)this.children[e].initialize()}},t.prototype.renderElement=function(){return 3!==this._state&&(this.initialize(),this.onRenderElement(),this.updateView(),this.element.control=this),this.element},t.prototype.activate=function(){for(var t=0;t<this.children.length;t++)this.children[t].activate();1===this._state&&(this._state=2,this._bindEvents(),this.onActivate())},t.prototype.resize=function(){if(2===this._state){this.onResize();for(var t=0;t<this.children.length;t++)this.children[t].resize()}},t.prototype.deactivate=function(){for(var t=0;t<this.children.length;t++)this.children[t].deactivate();2===this._state&&(this._state=1,this.onDeactivate(),this.subElements=null,this.activeEvents.off())},t.prototype.addChild=function(t,e){return t.parent=this,t.owner=e,this.children.push(t),t},t.prototype.removeChild=function(t){{var e=this.children.indexOf(t);this.children[e]}return e>-1&&(this.children.splice(e,1)[0].parent=null),t},t.prototype.clearChildren=function(){for(;this.children.length>0;)this.removeChild(this.children[0])},t.prototype.evaluateView=function(t){this.onViewModelChanged(t),this.updateView()},t.prototype.updateView=function(t){if(this._bindings&&this.element)for(var e=0;this._bindings&&e<this._bindings.length;e++){var i=this._bindings[e];for(var n in i)if("id"!=n&&"events"!=n&&"childId"!=n&&"element"!=n)if("text"===n||"html"===n)this._updateViewValue(i,n,i[n],t);else for(var s in i[n])this._updateViewValue(i,n,i[n][s],t,s)}},t.prototype._updateViewValue=function(t,e,i,n,r){var o=t.id+e+(r?"."+r:""),a=this._lastValues[o],h=this.getValue(i);if(a!=h&&(this._lastValues[o]=h,!n)){var l=this.subElements[t.id];switch(console.log('Updating "'+t.id+'" because "'+i+'" changed to "'+h+'"'),e){case"text":l.textContent=h;break;case"html":l.innerHTML=h;break;case"css":l.style[r]=h;break;case"className":s.toggleClass(l,r,h);break;case"attr":"value"===r||"checked"===r?l[r]=h:h?l.setAttribute(r,h):l.removeAttribute(r)}}},t.prototype.getViewModel=function(){return this._viewModel},t.prototype.getValue=function(t){var e=this._getPropTarget(t);t=this._getPropName(t);var i=e&&e.target?e.target[t]:"";return"function"==typeof i&&(i=i.call(e.target,this._viewModel,t)),i},t.prototype.setValue=function(t,e){var i=this._getPropTarget(t),n=i.viewModel;n&&"function"!=typeof i.target[i.propertyName]&&(i.target[i.propertyName]=e,n.change())},t.prototype._getPropName=function(t){var e=t.lastIndexOf(".");return e>-1&&(t=t.substr(e+1)),t},t.prototype._getPropTarget=function(t){for(var e,i=this,n=i.getViewModel(),s=n,r=t.indexOf(".");r>-1&&s;)e=t.substr(0,r),"$parent"===e?(i=this.parent.owner||this.parent,s=i?i.getViewModel():null):"$root"===e?(i=this._getRoot(),s=i.getViewModel()):"$view"===e?(i=this,s=this,n=null):s=s[e],s&&s.isViewModel&&(n=s),t=t.substr(r+1),r=t.indexOf(".");return{originView:this,view:i,viewModel:n,target:s,propertyName:t}},t.prototype._getRoot=function(){for(var t=this;t.parent;)t=t.parent;return t},t.prototype._ce=function(t,e,i,n){var s,r,o=document.createElement(t);for(s=0;e&&s<e.length;s+=2)o.setAttribute(e[s],e[s+1]);if(i){this.subElements[i.id]=i.element=o,i.childId&&(this.subElements[i.childId]=o);for(var a in i.attr)r=this.getValue(i.attr[a]),r&&o.setAttribute(a,r)}if(n)for(s=0;s<n.length;s++)o.appendChild(n[s]);return o},t.prototype._ct=function(t){return document.createTextNode(t)},t.prototype._bindEvents=function(){for(var t=0;t<this._bindings.length;t++){var e=this._bindings[t],i=e.element;for(var n in e)if("id"!=n&&"events"!=n&&"element"!=n)for(var s in e[n]){var r=e[n][s];r.indexOf("$parent")>-1&&this._viewModel.setData({$parent:(this.owner||this.parent).getViewModel()},!1),r.indexOf("$root")>-1&&this._viewModel.setData({$root:this._getRoot().getViewModel()},!1)}if(e.events)for(var o in e.events){var a=e.events[o];this._bindEvent(i,o,a)}this._bindInputEvent(i,e)}},t.prototype._bindInputEvent=function(t,e){e.attr&&(e.attr.value||e.attr.checked)&&this.activeEvents.on(t,"input,change",function(){var i=e.attr.value?"value":"checked",n=t[i],s=e.id+"attr."+i;this._lastValues[s]=n,this.setValue(e.attr[i],n)})},t.prototype._bindEvent=function(t,e,i){var n=this;this.activeEvents.on(t,e,function(){for(var t=0;t<i.length;t++){var e=i[t],s=arguments,r=e.indexOf("(");if(r>-1){var o=e.substr(r+1,e.length-r-2).split(/[\s,]+/);s=[];for(var a=0;a<o.length;a++){var h=o[a];s.push("'"==h[0]?h.substr(1,h.length-2):this.getValue(o[a]))}e=e.substr(0,r)}var l=n._getPropTarget(e),d=l.target,p=l.propertyName;if(d&&d[p])return d[p].apply(d,s)}})},t.prototype.toggle=function(t){return this.setValue(t,!this.getValue(t)),!1},t.prototype.send=function(t,e){this.setValue(e,this.getValue(t))},t._instanceCount=0,t}();return o});