define(["require","exports","xmldom","./ViewTemplateDefinition"],function(t,e,i,s){var r=function(){function t(t){this._blockCount=0,this._annotationCount=0,t?this.parse(t):this._reset()}return t.prototype.parse=function(t){this._reset(),this.parseRootElement((new i.DOMParser).parseFromString(t,"application/xhtml+xml").documentElement)},t.prototype.parseRootElement=function(t){this.documentElement=t,this.name=t.getAttribute("js-type"),this.isPassThrough=Boolean(t.getAttribute("js-passThrough"))||!1,this.baseViewType=t.getAttribute("js-baseType")||"View",this.viewModelType=t.getAttribute("js-model")||"",this.options=t.getAttribute("js-options")||"",this.cssInclude=t.getAttribute("js-css")||"";var e=t.getAttribute("js-require");if(this.requireList=e?e.split(/[ ,]+/):[],this.name.indexOf(".")>-1){var i=this.name.split(".");this.name=i[i.length-1]}this._parseElementChildren(t)},t.prototype._parseElement=function(t){this._validateElementIsExpected(t)&&this._validateAttributes(t)&&this._performCustomStage("validate",t)&&(this._performCustomStage("process",t),"js-view"!==t.tagName&&this._parseElementChildren(t))},t.prototype._parseElementChildren=function(t){for(var e=0;e<t.childNodes.length;e++){var i=t.childNodes[e];switch(i.nodeType){case t.ELEMENT_NODE:this._parseElement(i);break;case t.TEXT_NODE:var s=t.textContent.trim();s||(t.removeChild(i),e--)}}},t.prototype._reset=function(){this.name="",this.viewModelType="",this.options="",this.annotations={},this.childViews={},this.properties={},this.requireList=[],this.cssInclude="",this.subTemplates=[],this.events=[],this.errors=[],this.documentElement=null,this._annotationCount=0},t.prototype._addError=function(t,e){var i=e?e.lineNumber:void 0,s=e?e.columnNumber:void 0,r=void 0!==i&&void 0!==s?"(line: "+i+", col: "+s+") ":"";this.errors.push(r+t)},t.prototype._performCustomStage=function(t,e){var i=this._getDefinition(e),s=!0,r="_"+t+this._getHandlerName(i.id)+"Element";if(!this[r]||this[r].call(this,e,i))for(var n in i.attributes){var o="_"+t+this._getHandlerName(n)+"Attribute",a=e.getAttribute(n);if(this[o]&&a&&this[o].call(this,e,i,a)===!1){s=!1;break}}else s=!1;return s},t.prototype._validateElementIsExpected=function(t){var e=this._getDefinition(t),i=!0,s=t.parentNode,r=this._getDefinition(s);return r&&-1===r.children.indexOf(e.id)&&(this._addError('The element "'+t.tagName+'" is not a valid child for the element "'+s.tagName+'".',t),i=!1),i},t.prototype._validateAttributes=function(t){var e=!0,i=this._getDefinition(t);for(var s in i.attributes){var r=i.attributes[s];r.isRequired&&!t.getAttribute(s)&&(e=!1,this._addError('The element "'+t.tagName+'" was missing a required attribute "'+s+'".',t))}return e},t.prototype._validateRepeatAttribute=function(e,i,s){e.removeAttribute("js-repeat");var r=s.split(" in "),n=r[0],o=r[1],a="";n.indexOf(",")&&(r=n.split(/[\s,]+/),n=r[0],a=r[1]);for(var p=new t,u=this.parentTemplate?this.parentTemplate._blockCount++:this._blockCount++,h=(this.parentTemplate?this.parentTemplate.name:this.name)+"Block"+u,l=h+"Item",m=e.cloneNode(!0);e.attributes.length;)e.removeAttribute(e.attributes[0].name);for(;e.childNodes.length;)e.removeChild(e.childNodes[0]);var d=e.cloneNode();e.tagName="js-view";var c=e.cloneNode();for(e.setAttribute("js-name",this._toCamelCase(h)),e.setAttribute("js-type",h),e.setAttribute("js-baseType","Repeater"),e.setAttribute("js-passThrough","true"),e.setAttribute("js-options","{ childViewType: '"+l+"', itemName: '\""+n+"\"'"+(a?", itemIndex: '\""+a+"\"'":"")+" }"),e.setAttribute("js-data","{ items: "+o+" }"),c.setAttribute("js-name",this._toCamelCase(l)),c.setAttribute("js-type",l);m.childNodes.length;){var b=m.childNodes[0];c.appendChild(b)}return d.tagName="js-items",m.setAttribute("js-id","surface"),m.appendChild(d),e.appendChild(m),p.parentTemplate=this.parentTemplate||this,p.parseRootElement(c),this.subTemplates.push(p),!0},t.prototype._processViewElement=function(e){var i=new t,s=e.getAttribute("js-name");i.parseRootElement(e);var r=this.childViews[s]={name:s,type:e.getAttribute("js-type")||"",baseType:i.baseViewType,options:e.getAttribute("js-options")||"",data:e.getAttribute("js-data")||"",shouldImport:0==e.childNodes.length,template:i};return r.shouldImport||this.subTemplates.push(i),!0},t.prototype._processIdAttribute=function(t){var e,i=t.getAttribute("js-id");return i&&(e=this._getAnnotation(t),e.childId=i,t.removeAttribute("js-id")),!0},t.prototype._processBindAttribute=function(t,e,i){var s=this,r=s._getAnnotation(t);return i=i.replace(/;/g,","),i.match(/([a-zA-Z0-9-_$:.]*\([^\)]+\)|[^,^(^)]+)/g).forEach(function(e){var i=e.split(":"),n=i[0].trim(),o=i[1].trim(),a=n.split(".");a.length>1?(n=a.shift(),a=a.join(".")):(a=n,n="attr");var p=0==o.indexOf("is")?"boolean":"string";switch(n){case"attr":if("text"===a)r.text=o;else if("html"===a)r.html=o;else{var u=r.attr=r.attr||{};u[a]=o}break;case"className":var h=r.className=r.className||{};p="boolean",h[a]=o;break;case"css":var l=r.css=r.css||{};l[a.toLowerCase()]=o}s.properties[o]||(s.properties[o]={name:o,type:p}),t.removeAttribute("js-bind")}),!0},t.prototype._processUserActionAttribute=function(t,e,i){var s=this,r=s._getAnnotation(t),n=r.events=r.events||{};return i.match(/([a-zA-Z0-9-_$:.]*\([^\)]+\)|[^,^(^)]+)/g).forEach(function(t){t=t.split(":");var e=t[0].trim(),i=t[1].trim();n[e]=n[e]||[],n[e].push(i)}),t.removeAttribute("js-userAction"),!0},t.prototype._getDefinition=function(t){var e=null,i=s[t.tagName]?t.tagName:"default";return t=t.nodeType===t.DOCUMENT_NODE?null:t,t&&(e=s[i],e.id=i),e},t.prototype._getHandlerName=function(t){return"js-"===t.substr(0,3)&&(t=t.substr(3)),t=t.substr(0,1).toUpperCase()+t.substr(1)},t.prototype._getAnnotation=function(t){if(!t.annotation){var e=String(this._annotationCount++);this.annotations[e]=t.annotation={id:e}}return t.annotation},t.prototype._toCamelCase=function(t){return t=t||"",t=t[0].toLowerCase()+t.substr(1)},t}();return r});