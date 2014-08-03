var __extends=this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i};define(["require","exports","./BaseGenerator"],function(require,exports,BaseGenerator){function _toHtml(e){return String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var TypeScriptGenerator=function(_super){function TypeScriptGenerator(){_super.apply(this,arguments)}return __extends(TypeScriptGenerator,_super),TypeScriptGenerator.prototype.generate=function(e){{var t=this,i=this.template=t._getTemplate(e);"I"+i.name+"Model"}if(i.viewModelType&&t._addLine("import "+i.viewModelType+" = require('"+i.viewModelType+"');"),t._addChildViewImports(i),i.cssInclude){var n=i.cssInclude.replace(".","");t._addLine("import DomUtils = require('DomUtils');"),t._addLine("import "+n+" = require('"+i.cssInclude+"');"),t._addLine(),t._addLine("DomUtils.loadStyles("+n+".styles);")}return t._addClass(i),t._addLine(),t._addLine("export = "+i.name+";"),t.output},TypeScriptGenerator.prototype._addClass=function(e){for(var t=0;t<e.subTemplates.length;t++)this._addClass(e.subTemplates[t]);this._addLine(),this._addLine("class "+e.name+" extends "+e.baseViewType+" {"),this._addProperties(e),this._addOnInitialize(e),this._addOnViewModelChanged(e),this._addOnRenderHtml(e),this._addAnnotations(e),this._addLine("}")},TypeScriptGenerator.prototype._addChildViewImports=function(e){function t(e){for(var n in e.childViews){var r=e.childViews[n];r.shouldImport&&(i[r.type]=r),i[r.baseType]=r}for(var a=0;a<e.subTemplates.length;a++)t(e.subTemplates[a])}var i={View:{}};i[e.baseViewType]=e,t(e);for(var n in i)this._addLine("import "+n+" = require('"+n+"');")},TypeScriptGenerator.prototype._addOnInitialize=function(e){var t,i,n=!1;for(i in e.childViews)if(t=e.childViews[i].template,t.isPassThrough){n=!0;break}if(n){this._addLine(),this._addLine("onInitialize() {",1);for(i in e.childViews)t=e.childViews[i].template,t.isPassThrough&&this._addLine("this."+i+".owner = "+(e.parentTemplate?"this.owner":"this")+";",2);this._addLine("}",1)}},TypeScriptGenerator.prototype._addOnViewModelChanged=function(e){var t,i=this,n=!1;for(t in e.childViews)if(e.childViews[t].data){n=!0;break}if(n){i._addLine(),i._addLine("onViewModelChanged() {",1);for(var t in e.childViews){var r=e.childViews[t];if(r.data){var a=r.data;if(0==a.indexOf("{")){a=a.substr(1,a.length-2);var d=a.split(","),o=!0;a="{";for(var s=0;s<d.length;s++){var p=d[s].trim().split(/[\s:]+/);a+=(o?"":",")+" "+p[0].trim()+": this.getValue('"+p[1].trim()+"')",o=!1}a+=" }"}else a="this.getValue('"+a+"')";this._addLine("this."+t+".setData("+a+");",2)}}i._addLine("}",1)}},TypeScriptGenerator.prototype._addProperties=function(template){if(this._addLine("viewName = '"+template.name+"';",1),template.options){var optionsBag=eval("("+template.options+")");for(var optionName in optionsBag)this._addLine(optionName+" = "+optionsBag[optionName]+";",1)}template.viewModelType&&this._addLine("viewModelType = "+template.viewModelType+";",1);for(var memberName in template.childViews){var childViewDefinition=template.childViews[memberName];this._addLine(memberName+" = <any>this.addChild(new "+childViewDefinition.type+"());",1)}},TypeScriptGenerator.prototype._addOnRenderHtml=function(e){var t=this;t._addLine(),t._addLine("onRenderHtml(): string {",1),t._addLine("return '' +",2),this._addChildNodes(e.documentElement,3),t._addLine("'';",3),t._addLine("}",1)},TypeScriptGenerator.prototype._addRenderLine=function(e,t){var i=this;if("js-view"===e.tagName)i._addLine("this."+e.getAttribute("js-name")+".renderHtml() +",t);else if("js-items"===e.tagName)i._addLine("this.renderItems() + ",t);else{var n=(e.nodeType,e.tagName),r=e.annotation,a=e.childNodes.length>0||r&&(r.html||r.text||r.repeat),d=a?">' +":"></"+n+">' +";i._addLine("'<"+n+this._getIdAttribute(e)+this._getCreationMethod(e,"_genStyle","css","style")+this._getCreationMethod(e,"_genClass","className","class")+this._getCreationMethod(e,"_genAttr","attr")+this._getRemainingAttributes(e)+d,t),a&&(i._addElementContent(e,t+1)&&i._addChildNodes(e,t+1),i._addLine("'</"+n+">' +",t))}},TypeScriptGenerator.prototype._addElementContent=function(e,t){var i=e.annotation,n=!0;return i&&(i.text&&this._addLine("this._genText('"+i.text+"') +",t),i.html&&this._addLine("this._genHtml('"+i.text+"') +",t)),n},TypeScriptGenerator.prototype._addChildNodes=function(e,t){for(var i=0;i<e.childNodes.length;i++){var n=e.childNodes[i];if(n.nodeType===e.ELEMENT_NODE)this._addRenderLine(n,t);else if(n.nodeType===e.TEXT_NODE){var r=n.textContent.trim();r&&this._addLine("'"+_toHtml(r)+"' +",t)}}},TypeScriptGenerator.prototype._addAnnotations=function(e){var t=this,i=[];for(var n in e.annotations)i.push(JSON.stringify(e.annotations[n],null,4));i.length&&(t._addLine(),t._addLine("_bindings = [",1),i.join(",\n").split("\n").forEach(function(e){t._addLine(e,2)}),t._addLine("];",1))},TypeScriptGenerator.prototype._getIdAttribute=function(e){var t="",i=e.annotation;return i&&(t=" id=\"' + this.id + '_"+i.id+'"'),t},TypeScriptGenerator.prototype._getCreationMethod=function(e,t,i,n){var r=e.annotation,a=r?r[i]:null,d="",o=[],s=e.getAttribute(n)||"";if(a){n&&e.removeAttribute(n),s="'"+s+"'";for(var p in a)o.push("'"+p+"'"),o.push("'"+a[p]+"'");d=" ' + this."+t+"("+s,o.length&&(d+=", ["+o.join(",")+"]"),d+=") + '"}return d},TypeScriptGenerator.prototype._getRemainingAttributes=function(e){for(var t=[],i=0;i<e.attributes.length;i++){var n=e.attributes[i];t.push(n.name+'="'+n.value+'"')}return t.length?" "+t.join(" "):""},TypeScriptGenerator}(BaseGenerator);return TypeScriptGenerator});