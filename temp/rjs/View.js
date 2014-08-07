define(["require","exports","ViewModel","EventGroup","Encode","DomUtils"],function(t,e,i,n,s,o){var r;!function(t){t[t.CREATED=0]="CREATED",t[t.INACTIVE=1]="INACTIVE",t[t.ACTIVE=2]="ACTIVE",t[t.DISPOSED=3]="DISPOSED"}(r||(r={}));var a=function(){function t(t){this.viewName="View",this.viewModelType=i,this._bindings=[],this._lastValues={},this._state=0,this.loadStyles=o.loadStyles,this.events=new n(this),this.activeEvents=new n(this),this.children=[],this._initialData=t}return t.prototype.dispose=function(){if(3!==this._state){2==this._state&&this.deactivate(),this._state=3;for(var t=0;t<this.children.length;t++)this.children[t].dispose();this.clearChildren(),this.events.dispose(),this.activeEvents.dispose(),this._viewModel.dispose()}},t.prototype.onInitialize=function(){},t.prototype.onRenderHtml=function(){return""},t.prototype.onActivate=function(){},t.prototype.onDeactivate=function(){},t.prototype.onViewModelChanged=function(){},t.prototype.setData=function(t,e){3!==this._state&&(this.initialize(),this._viewModel.setData(t,e))},t.prototype.initialize=function(){if(0===this._state){this._state=1,this.id=this.viewName+"-"+t._instanceCount++,this._viewModel=new this.viewModelType(this._initialData),this.events.on(this._viewModel,"change",this.evaluateView),this._viewModel.onInitialize(),this.onViewModelChanged(),this.onInitialize();for(var e=0;e<this.children.length;e++)this.children[e].initialize()}},t.prototype.renderHtml=function(){var t;return 3!==this._state&&(this.initialize(),t=this.onRenderHtml(this._viewModel)),t},t.prototype.activate=function(){if(1===this._state){this._state=2,this._bindEvents(),this._findElements(),this.updateView(!0);for(var t=0;t<this.children.length;t++)this.children[t].activate();this.onActivate()}},t.prototype.deactivate=function(){if(2===this._state){this._state=1,this.onDeactivate(),this._subElements=null,this.activeEvents.off();for(var t=0;t<this.children.length;t++)this.children[t].deactivate()}},t.prototype.addChild=function(t,e){return t.parent=this,t.owner=e,this.children.push(t),t},t.prototype.removeChild=function(t){{var e=this.children.indexOf(t);this.children[e]}return e>-1&&(this.children.splice(e,1)[0].parent=null),t},t.prototype.clearChildren=function(){for(;this.children.length>0;)this.removeChild(this.children[0])},t.prototype.evaluateView=function(){this.onViewModelChanged(),this.updateView()},t.prototype.updateView=function(t){if(2===this._state)for(var e=0;this._bindings&&e<this._bindings.length;e++){var i=this._bindings[e];for(var n in i)if("id"!=n&&"events"!=n&&"childId"!=n&&"text"!=n&&"html"!=n)for(var s in i[n]){var r=i[n][s],a=i.id+n+"."+s,h=this._lastValues[a],l=this.getValue(r);if(h!=l){var d=this._subElements[i.id];this._lastValues[a]=l,t||(console.log(this.viewName+" updateView"+this.id),"className"==n?o.toggleClass(d,s,l):"attr"==n&&(l?d.setAttribute(s,l):d.removeAttribute(s)))}}}},t.prototype.getViewModel=function(){return this._viewModel},t.prototype.getValue=function(t){var e=this._getPropTarget(t);t=this._getPropName(t);var i=e&&e.target?e.target[t]:"";return"function"==typeof i&&(i=i.call(e.target,this._viewModel,t)),i},t.prototype.setValue=function(t,e){var i=this._getPropTarget(t),n=i.view.getViewModel();n&&(i.target[this._getPropName(t)]=e,n.change())},t.prototype._getPropName=function(t){var e=t.lastIndexOf(".");return e>-1&&(t=t.substr(e+1)),t},t.prototype._getPropTarget=function(t){for(var e,i=this,n=i.getViewModel(),s=t.indexOf(".");s>-1&&n;)e=t.substr(0,s),"$parent"===e?(i=this.parent.owner||this.parent,n=i?i.getViewModel():null):"$root"===e?(i=this._getRoot(),n=i.getViewModel()):n=n[e],t=t.substr(s+1),s=t.indexOf(".");return{originView:this,view:i,target:n}},t.prototype._getRoot=function(){for(var t=this;t.parent;)t=t.parent;return t},t.prototype._genStyle=function(t,e){t=t||"";for(var i=t.split(";"),n=(this._viewModel,0);e&&n<e.length;n+=2){var o=e[n],r=e[n+1];switch(o){case"display":case"display.inline-block":i.push("display: "+(this.getValue(r)?o.indexOf(".")>-1?o.split(".").pop():"block":"none"));break;default:e[n+1]&&i.push(e[n]+": "+s.toHtmlAttr(this.getValue(e[n+1])))}}return'style="'+i.join("; ")+'"'},t.prototype._genClass=function(t,e){t=t||"";for(var i=t?t.split(" "):[],n=0;e&&n<e.length;n+=2)this.getValue(e[n+1])&&i.push(e[n]);return i.length?'class="'+i.join(" ")+'"':""},t.prototype._genAttr=function(t,e){for(var i=[],n=0;n<e.length;n+=2){var o=this.getValue(e[n+1]);o&&i.push(e[n]+'="'+s.toHtmlAttr(o)+'"')}return i.join(" ")},t.prototype._genText=function(t){return s.toJS(this.getValue(t))},t.prototype._genHtml=function(t){return s.toHtml(this.getValue(t))},t.prototype._bindEvents=function(){for(var t=0;t<this._bindings.length;t++){var e=this._bindings[t];for(var i in e)if("id"!=i&&"events"!=i)for(var n in e[i]){var s=e[i][n];s.indexOf("$parent")>-1&&this._viewModel.setData({$parent:(this.owner||this.parent).getViewModel()},!1),s.indexOf("$root")>-1&&this._viewModel.setData({$root:this._getRoot().getViewModel()},!1)}if(e.events)for(var o in e.events)for(var r=e.events[o],a=document.getElementById(this.id+"_"+e.id),h=0;h<r.length;h++){var l=r[h];if("$"==l[0])this._bindUtil(a,o,l.substr(1));else{var d=this._viewModel[l];d&&this.activeEvents.on(a,o,d)}}}},t.prototype._bindUtil=function(t,e,i){var n=this,s=i.indexOf("("),o=i.substr(0,s),r=i.substr(s+1,i.length-s-2).split(/[\s,]+/),a=n["_"+o];a&&n.events.on(t,e,function(){return a.apply(n,r)})},t.prototype._toggle=function(t){return this.setValue(t,!this.getValue(t)),!1},t.prototype._send=function(t,e){this.setValue(e,this.getValue(t))},t.prototype._bubble=function(t,e){var i=e?this.getValue(e):this.getViewModel();return this.events.raise(t,i,!0)},t.prototype._findElements=function(){this._subElements={};for(var t=0;t<this._bindings.length;t++){var e=this._bindings[t],i=document.getElementById(this.id+"_"+e.id);this._subElements[e.id]=i,e.childId&&(this._subElements[e.childId]=i)}},t._instanceCount=0,t}();return a});