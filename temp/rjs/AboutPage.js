var __extends=this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i};define("AboutPageModel",["require","exports","ViewModel"],function(e,t,i){var n=function(e){function t(){e.apply(this,arguments),this.data={strings:{title:"OneJS is a tiny web framework.",subTitle:"OneJS enables you to build easily reusable web components in an Model View ViewModel (MVVM) pattern. Views (templates) compile to TypeScript, so that type safety and static code analysis can be enforced. This allows for really nice scenarios, such as having an interface available to implement for your view model, based on the binding requirements of the View."},example1:{panes:[{key:"html",hasEditor:!0,editorType:"html",updatesResults:!0,title:"View template",content:'<js-view js-type="FavoriteThings">\n    <div class="c-FavoriteThings">\n        <b>My Favorite things</b>\n        <ul>\n            <li>Whiskers on kittens</li>\n            <li>Warm woolen mittens</li>\n        </ul>\n    </div>\n</js-view>'},{key:"viewtemplate",hasEditor:!0,updatesResults:!1,editorType:"typescript",title:"Generated TypeScript",content:'.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'},{key:"less",hasEditor:!0,updatesResults:!0,editorType:"less",title:"Less",content:'.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'}],selectedPane:"html"},example2:{panes:[{key:"html",hasEditor:!0,editorType:"html",updatesResults:!0,title:"View",content:'<js-view js-type="FavoriteThings" js-model="FavoriteThingsModel">\n    <div class="c-FavoriteThings">\n        <b js-bind="text:title"></b>\n        <ul js-repeat="thing in things">\n            <li js-bind="text:thing"></li>\n        </ul>\n    </div>\n</js-view>'},{key:"viewmodel",hasEditor:!0,updatesResults:!0,editorType:"typescript",title:"ViewModel",content:"import ViewModel = require('ViewModel');\n\nclass FavoriteThingsModel extends ViewModel {\n    data = {\n        title: 'MyFavorite things',\n        things: [\n            'Whiskers on kittens',\n            'Warm woolen mittens'\n        ]\n    };\n}\n\nexport = FavoriteThingsModel;\n"},{key:"less",hasEditor:!0,updatesResults:!0,editorType:"less",title:"Less",content:'.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'}],selectedPane:"html",isResultPaneVisible:!1}}}return __extends(t,e),t}(i);return n});var __extends=this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i};define("AboutPageBase",["require","exports","View"],function(e,t,i){var n=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t}(i);return n});var __extends=this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i};define("ExamplePaneModel",["require","exports","ViewModel"],function(e,t,i){var n=function(e){function t(){e.apply(this,arguments),this.data={panes:[{key:"html",hasEditor:!0,updatesResults:!0,editorType:"html",title:"HTML",content:"<div>Hello world</div>"},{key:"less",hasEditor:!0,updatesResults:!0,editorType:"less",title:"Less",content:'.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'}],isResultPaneVisible:!0,selectedPane:"html",isPaneSelected:function(e){return e.pane.key==this.view.getViewModel().data.selectedPane}}}return __extends(t,e),t}(i);return n}),define("xmldom",["require","exports"],function(e,t){t.DOMParser=window.DOMParser}),define("ViewTemplateDefinition",["require","exports"],function(){var e={"js-view":{description:"",attributes:{"js-name":{description:"Defines the member name for the control.",example:"listView"},"js-type":{description:"Defines the child view type.",example:"ListView"},"js-model":{},"js-css":{},"js-options":{}},children:["default","js-view"]},"js-control":{description:"Indicates that a child view should be placed here.",example:'<js-control js-name="listView" js-type="ListView" />',attributes:{"js-name":{description:"Defines the member name for the control.",example:"listView",isRequired:!0},"js-type":{description:"Defines the child view type.",example:"ListView",isRequired:!0},"js-data":{description:"Provides control-specific options to use for initialization.",example:"{ color: 'black'}"}},children:[]},"js-state":{attribute:{"js-name":{description:"Defines the state to expose from the viewModel for testing purposes.",example:"isVideoPlaying"}},children:[]},"default":{description:"Match for any html element.",example:"<div></div>",attributes:{"js-bind":{description:"Defines bindings to apply to the given element.",example:"href:linkUrl, text:linkText, className.isEnabled:isLinkEnabled, style.display:isVisible"},"js-userAction":{description:"Defines events to apply to the given element.",example:"click:onClick, mousemove:onMouseMove"},"js-id":{description:"Defines an id for the element so that on activation the view can find the element and provide it to the view model on activation."},"js-repeat":{description:"Indicates which collection property to repeat the section for, and how to identify the item/index.",example:"item,itemIndex in items"}},children:["js-section","js-control","js-view","default"]}};return e}),define("CompiledViewTemplate",["require","exports","xmldom","./ViewTemplateDefinition"],function(e,t,i,n){var s=function(){function e(e){this._blockCount=0,this._annotationCount=0,e?this.parse(e):this._reset()}return e.prototype.parse=function(e){this._reset(),this.parseRootElement((new i.DOMParser).parseFromString(e,"application/xhtml+xml").documentElement)},e.prototype.parseRootElement=function(e){if(this.documentElement=e,this.name=e.getAttribute("js-type"),this.isPassThrough=Boolean(e.getAttribute("js-passThrough"))||!1,this.baseViewType=e.getAttribute("js-baseType")||"View",this.viewModelType=e.getAttribute("js-model")||"",this.options=e.getAttribute("js-options")||"",this.cssInclude=e.getAttribute("js-css")||"",this.name.indexOf(".")>-1){var t=this.name.split(".");this.name=t[t.length-1]}this._parseElementChildren(e)},e.prototype._parseElement=function(e){this._validateElementIsExpected(e)&&this._validateAttributes(e)&&this._performCustomStage("validate",e)&&(this._performCustomStage("process",e),"js-view"!==e.tagName&&this._parseElementChildren(e))},e.prototype._parseElementChildren=function(e){for(var t=0;t<e.childNodes.length;t++){var i=e.childNodes[t];switch(i.nodeType){case e.ELEMENT_NODE:this._parseElement(i);break;case e.TEXT_NODE:var n=e.textContent.trim();n||(e.removeChild(i),t--)}}},e.prototype._reset=function(){this.name="",this.viewModelType="",this.options="",this.annotations={},this.childViews={},this.properties={},this.cssInclude="",this.subTemplates=[],this.events=[],this.errors=[],this.documentElement=null,this._annotationCount=0},e.prototype._addError=function(e,t){var i=t?t.lineNumber:void 0,n=t?t.columnNumber:void 0,s=void 0!==i&&void 0!==n?"(line: "+i+", col: "+n+") ":"";this.errors.push(s+e)},e.prototype._performCustomStage=function(e,t){var i=this._getDefinition(t),n=!0,s="_"+e+this._getHandlerName(i.id)+"Element";if(!this[s]||this[s].call(this,t,i))for(var a in i.attributes){var o="_"+e+this._getHandlerName(a)+"Attribute",r=t.getAttribute(a);if(this[o]&&r&&this[o].call(this,t,i,r)===!1){n=!1;break}}else n=!1;return n},e.prototype._validateElementIsExpected=function(e){var t=this._getDefinition(e),i=!0,n=e.parentNode,s=this._getDefinition(n);return s&&-1===s.children.indexOf(t.id)&&(this._addError('The element "'+e.tagName+'" is not a valid child for the element "'+n.tagName+'".',e),i=!1),i},e.prototype._validateAttributes=function(e){var t=!0,i=this._getDefinition(e);for(var n in i.attributes){var s=i.attributes[n];s.isRequired&&!e.getAttribute(n)&&(t=!1,this._addError('The element "'+e.tagName+'" was missing a required attribute "'+n+'".',e))}return t},e.prototype._validateRepeatAttribute=function(t,i,n){t.removeAttribute("js-repeat");var s=n.split(" in "),a=s[0],o=s[1],r="";a.indexOf(",")&&(s=a.split(/[\s,]+/),a=s[0],r=s[1]);for(var l=new e,d=this.parentTemplate?this.parentTemplate._blockCount++:this._blockCount++,p=(this.parentTemplate?this.parentTemplate.name:this.name)+"Block"+d,h=p+"Item",u=t.cloneNode(!0);t.attributes.length;)t.removeAttribute(t.attributes[0].name);for(;t.childNodes.length;)t.removeChild(t.childNodes[0]);var c=t.cloneNode();t.tagName="js-view";var m=t.cloneNode();for(t.setAttribute("js-name",this._toCamelCase(p)),t.setAttribute("js-type",p),t.setAttribute("js-baseType","Repeater"),t.setAttribute("js-passThrough","true"),t.setAttribute("js-options","{ childViewType: '"+h+"', itemName: '\""+a+"\"'"+(r?", itemIndex: '\""+r+"\"'":"")+" }"),t.setAttribute("js-data","{ items: "+o+" }"),m.setAttribute("js-name",this._toCamelCase(h)),m.setAttribute("js-type",h);u.childNodes.length;){var f=u.childNodes[0];m.appendChild(f)}return c.tagName="js-items",u.setAttribute("js-id","surface"),u.appendChild(c),t.appendChild(u),l.parentTemplate=this.parentTemplate||this,l.parseRootElement(m),this.subTemplates.push(l),!0},e.prototype._processViewElement=function(t){var i=new e,n=t.getAttribute("js-name");i.parseRootElement(t);var s=this.childViews[n]={name:n,type:t.getAttribute("js-type")||"",baseType:i.baseViewType,options:t.getAttribute("js-options")||"",data:t.getAttribute("js-data")||"",shouldImport:0==t.childNodes.length,template:i};return s.shouldImport||this.subTemplates.push(i),!0},e.prototype._processIdAttribute=function(e){var t,i=e.getAttribute("js-id");return i&&(t=this._getAnnotation(e),t.childId=i,e.removeAttribute("js-id")),!0},e.prototype._processBindAttribute=function(e,t,i){var n=this,s=n._getAnnotation(e);return i=i.replace(/;/g,","),i.match(/([a-zA-Z0-9-_$:.]*\([^\)]+\)|[^,^(^)]+)/g).forEach(function(t){var i=t.split(":"),a=i[0].trim(),o=i[1].trim(),r=a.split(".");r.length>1?(a=r.shift(),r=r.join(".")):(r=a,a="attr");var l=0==o.indexOf("is")?"boolean":"string";switch(a){case"attr":if("text"===r)s.text=o;else if("html"===r)s.html=o;else{var d=s.attr=s.attr||{};d[r]=o}break;case"className":var p=s.className=s.className||{};l="boolean",p[r]=o;break;case"css":var h=s.css=s.css||{};h[r.toLowerCase()]=o}n.properties[o]||(n.properties[o]={name:o,type:l}),e.removeAttribute("js-bind")}),!0},e.prototype._processUserActionAttribute=function(e,t,i){var n=this,s=n._getAnnotation(e),a=s.events=s.events||{};return i.match(/([a-zA-Z0-9-_$:.]*\([^\)]+\)|[^,^(^)]+)/g).forEach(function(e){e=e.split(":");var t=e[0].trim(),i=e[1].trim();a[t]=a[t]||[],a[t].push(i)}),e.removeAttribute("js-userAction"),!0},e.prototype._getDefinition=function(e){var t=null,i=n[e.tagName]?e.tagName:"default";return e=e.nodeType===e.DOCUMENT_NODE?null:e,e&&(t=n[i],t.id=i),t},e.prototype._getHandlerName=function(e){return"js-"===e.substr(0,3)&&(e=e.substr(3)),e=e.substr(0,1).toUpperCase()+e.substr(1)},e.prototype._getAnnotation=function(e){if(!e.annotation){var t=String(this._annotationCount++);this.annotations[t]=e.annotation={id:t}}return e.annotation},e.prototype._toCamelCase=function(e){return e=e||"",e=e[0].toLowerCase()+e.substr(1)},e}();return s}),define("BaseGenerator",["require","exports","./CompiledViewTemplate"],function(e,t,i){var n="\r\n",s="    ",a=function(){function e(){this.output=""}return e.prototype._getTemplate=function(e){if(this._reset(),this.template=new i(e),this.template.errors.length){var t=this.template.errors.join("\n");throw t}return this.template},e.prototype._reset=function(){this.output="",this.template=null},e.prototype._addLine=function(e,t){this.output+=this._getIndent(t||0)+(e||"")+n},e.prototype._getIndent=function(e){for(var t="",i=0;e>i;i++)t+=s;return t},e.prototype._toTitleCase=function(e){return e.substr(0,1).toUpperCase()+e.substr(1)},e}();return a});var __extends=this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i};define("TypeScriptGenerator",["require","exports","./BaseGenerator"],function(require,exports,BaseGenerator){function _toHtml(e){return String(e||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var TypeScriptGenerator=function(_super){function TypeScriptGenerator(){_super.apply(this,arguments)}return __extends(TypeScriptGenerator,_super),TypeScriptGenerator.prototype.generate=function(e){{var t=this,i=this.template=t._getTemplate(e);"I"+i.name+"Model"}if(i.viewModelType&&t._addLine("import "+i.viewModelType+" = require('"+i.viewModelType+"');"),t._addLine("import DomUtils = require('DomUtils');"),t._addChildViewImports(i),i.cssInclude){var n=i.cssInclude.replace(".","");t._addLine("import "+n+" = require('"+i.cssInclude+"');"),t._addLine(),t._addLine("DomUtils.loadStyles("+n+".styles);")}return t._addClass(i),t._addLine(),t._addLine("export = "+i.name+";"),t.output},TypeScriptGenerator.prototype._addClass=function(e){for(var t=0;t<e.subTemplates.length;t++)this._addClass(e.subTemplates[t]);this._addLine(),this._addLine("class "+e.name+" extends "+e.baseViewType+" {"),this._addProperties(e),this._addOnInitialize(e),this._addOnViewModelChanged(e),this._addOnRenderHtml(e),this._addAnnotations(e),this._addLine("}")},TypeScriptGenerator.prototype._addChildViewImports=function(e){function t(e){for(var n in e.childViews){var s=e.childViews[n];s.shouldImport&&(i[s.type]=s),i[s.baseType]=s}for(var a=0;a<e.subTemplates.length;a++)t(e.subTemplates[a])}var i={View:{}};i[e.baseViewType]=e,t(e);for(var n in i)this._addLine("import "+n+" = require('"+n+"');")},TypeScriptGenerator.prototype._addOnInitialize=function(e){var t,i,n=!1;for(i in e.childViews)if(t=e.childViews[i].template,t.isPassThrough){n=!0;break}if(n){this._addLine(),this._addLine("onInitialize() {",1);for(i in e.childViews)t=e.childViews[i].template,t.isPassThrough&&this._addLine("this."+i+".owner = "+(e.parentTemplate?"this.owner":"this")+";",2);this._addLine("}",1)}},TypeScriptGenerator.prototype._addOnViewModelChanged=function(e){var t,i=this,n=!1;for(t in e.childViews)if(e.childViews[t].data){n=!0;break}if(n){i._addLine(),i._addLine("onViewModelChanged() {",1);for(var t in e.childViews){var s=e.childViews[t];if(s.data){var a=s.data;if(0==a.indexOf("{")){a=a.substr(1,a.length-2);var o=a.split(","),r=!0;a="{";for(var l=0;l<o.length;l++){var d=o[l].trim().split(/[\s:]+/);a+=(r?"":",")+" "+d[0].trim()+": this.getValue('"+d[1].trim()+"')",r=!1}a+=" }"}else a="this.getValue('"+a+"')";this._addLine("this."+t+".setData("+a+");",2)}}i._addLine("}",1)}},TypeScriptGenerator.prototype._addProperties=function(template){if(this._addLine("viewName = '"+template.name+"';",1),template.options){var optionsBag=eval("("+template.options+")");for(var optionName in optionsBag)this._addLine(optionName+" = "+optionsBag[optionName]+";",1)}template.viewModelType&&this._addLine("viewModelType = "+template.viewModelType+";",1);for(var memberName in template.childViews){var childViewDefinition=template.childViews[memberName];this._addLine(memberName+" = <any>this.addChild(new "+childViewDefinition.type+"());",1)}},TypeScriptGenerator.prototype._addOnRenderHtml=function(e){var t=this;t._addLine(),t._addLine("onRenderHtml(): string {",1),t._addLine("return '' +",2),this._addChildNodes(e.documentElement,3),t._addLine("'';",3),t._addLine("}",1)},TypeScriptGenerator.prototype._addRenderLine=function(e,t){var i=this;if("js-view"===e.tagName)i._addLine("this."+e.getAttribute("js-name")+".renderHtml() +",t);else if("js-items"===e.tagName)i._addLine("this.renderItems() + ",t);else{var n=(e.nodeType,e.tagName),s=e.annotation,a=e.childNodes.length>0||s&&(s.html||s.text||s.repeat),o=a?">' +":"></"+n+">' +";i._addLine("'<"+n+this._getIdAttribute(e)+this._getCreationMethod(e,"_genStyle","css","style")+this._getCreationMethod(e,"_genClass","className","class")+this._getCreationMethod(e,"_genAttr","attr")+this._getRemainingAttributes(e)+o,t),a&&(i._addElementContent(e,t+1)&&i._addChildNodes(e,t+1),i._addLine("'</"+n+">' +",t))}},TypeScriptGenerator.prototype._addElementContent=function(e,t){var i=e.annotation,n=!0;return i&&(i.text&&this._addLine("this._genText('"+i.text+"') +",t),i.html&&this._addLine("this._genHtml('"+i.text+"') +",t)),n},TypeScriptGenerator.prototype._addChildNodes=function(e,t){for(var i=0;i<e.childNodes.length;i++){var n=e.childNodes[i];if(n.nodeType===e.ELEMENT_NODE)this._addRenderLine(n,t);else if(n.nodeType===e.TEXT_NODE){var s=n.textContent.trim();s&&this._addLine("'"+_toHtml(s)+"' +",t)}}},TypeScriptGenerator.prototype._addAnnotations=function(e){var t=this,i=[];for(var n in e.annotations)i.push(JSON.stringify(e.annotations[n],null,4));i.length&&(t._addLine(),t._addLine("_bindings = [",1),i.join(",\n").split("\n").forEach(function(e){t._addLine(e,2)}),t._addLine("];",1))},TypeScriptGenerator.prototype._getIdAttribute=function(e){var t="",i=e.annotation;return i&&(t=" id=\"' + this.id + '_"+i.id+'"'),t},TypeScriptGenerator.prototype._getCreationMethod=function(e,t,i,n){var s=e.annotation,a=s?s[i]:null,o="",r=[],l=e.getAttribute(n)||"";if(a){n&&e.removeAttribute(n),l="'"+l+"'";for(var d in a)r.push("'"+d+"'"),r.push("'"+a[d]+"'");o=" ' + this."+t+"("+l,r.length&&(o+=", ["+r.join(",")+"]"),o+=") + '"}return o},TypeScriptGenerator.prototype._getRemainingAttributes=function(e){for(var t=[],i=0;i<e.attributes.length;i++){var n=e.attributes[i];t.push(n.name+'="'+n.value+'"')}return t.length?" "+t.join(" "):""},TypeScriptGenerator}(BaseGenerator);return TypeScriptGenerator});var __extends=this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i};define("ExamplePaneBase",["require","exports","View","TypeScriptGenerator"],function(e,t,i,n){var s=function(t){function i(){t.apply(this,arguments),this._editors={}}return __extends(i,t),i.prototype.onActivate=function(){this._findEditors(),this._initializeEditors()},i.prototype._findEditors=function(){function e(i){for(var n=0;n<i.length;n++){var s=i[n];if(s._subElements&&s._subElements.editor){var a=s._subElements.editor.getAttribute("data-key");t._editors[a]&&(t._editors[a].element=s._subElements.editor)}e(s.children)}}var t=this;t._editors={};for(var i=t.getViewModel().data.panes,n=0;n<i.length;n++){var s=i[n];s.hasEditor&&(t._editors[s.key]={pane:s,editor:null})}e(t.children)},i.prototype._initializeEditors=function(){var t=this;e(["ace"],function(){function e(){t._updateViewGeneration(),t._updateResult()}if(2==t._state){for(var i in t._editors){var n,s=t._editors[i];s.editor=n=ace.edit(s.element.id),n.getSession().setMode("ace/mode/"+s.pane.editorType),n.setValue(s.pane.content),s.pane.updatesResults&&n.getSession().on("change",e),n.clearSelection()}e()}})},i.prototype._updateViewGeneration=function(){if(this._editors.html&&this._editors.viewtemplate){var e=new n,t=this._editors.html.editor.getValue();try{t=e.generate(t)}catch(i){t=i}t=t||"",this._editors.viewtemplate.editor.setValue(t)}},i.prototype._updateResult=function(){var e=this._subElements.resultFrame.contentWindow.document;e.open();var t="<!doctype html>";t+="<html>",t+="<head>",t+="<style>",this._editors.less&&(t+=this._editors.less.editor.getValue()),t+="</style>",t+="</head>",t+="<body>",this._editors.html&&(t+=this._editors.html.editor.getValue()),t+="</body>",t+="</html>",e.write(t),e.close()},i}(i);return s}),define("ExamplePane.css",["require","exports"],function(e,t){t.styles=".c-ExamplePane{height:240px;background:#e8e8e8;position:relative;color:#666}.c-ExamplePane .tab2col1{position:absolute;left:0;top:0;bottom:0;right:0}.c-ExamplePane.showResults .tab2col1{width:50%;right:auto}.c-ExamplePane .tab2col2{position:absolute;left:50%;top:0;right:0;height:35px;border-left:1px solid #ddd}.c-ExamplePane.showResults .tab2col2{height:auto;bottom:0}.c-ExamplePane .pane{display:inline-block}.c-ExamplePane .pane .title{display:inline-block;padding:0 10px;margin-right:5px;height:35px;line-height:35px;font-size:13px;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.c-ExamplePane .pane .title:hover{background:#e8e8e8}.c-ExamplePane .pane .edit{display:none;position:absolute;left:0;right:0;top:35px;bottom:0;border-top:1px solid #ddd}.c-ExamplePane .pane .result{position:absolute;border:none;width:100%;height:100%}.c-ExamplePane .pane.isSelected .title{border-top:5px solid #5a9edd;background:#efefef linear-gradient(to top,rgba(232,232,232,0) 0,rgba(232,232,232,.4) 78%,rgba(90,158,221,.2) 100%);line-height:25px;height:30px}.c-ExamplePane .pane.isSelected .edit{display:block}"});var __extends=this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i};define("ExamplePane",["require","exports","ExamplePaneModel","DomUtils","View","ExamplePaneBase","Repeater","ExamplePane.css"],function(e,t,i,n,s,a,o,r){n.loadStyles(r.styles);var l=function(e){function t(){e.apply(this,arguments),this.viewName="ExamplePaneBlock0Item",this._bindings=[{id:"0",className:{isSelected:"$parent.isPaneSelected"},events:{click:["$send(pane.key, $parent.selectedPane)"]}},{id:"1",text:"pane.title"},{id:"2",attr:{"data-key":"pane.key"},childId:"editor"}]}return __extends(t,e),t.prototype.onRenderHtml=function(){return'<div id="'+this.id+'_0" '+this._genClass("pane",["isSelected","$parent.isPaneSelected"])+'><div id="'+this.id+'_1" class="title">'+this._genText("pane.title")+'</div><div id="'+this.id+'_2" '+this._genAttr("",["data-key","pane.key"])+' class="edit"></div></div>'},t}(s),d=function(e){function t(){e.apply(this,arguments),this.viewName="ExamplePaneBlock0",this.childViewType=l,this.itemName="pane",this._bindings=[{id:"0",childId:"surface"}]}return __extends(t,e),t.prototype.onRenderHtml=function(){return'<div id="'+this.id+'_0">'+this.renderItems()+"</div>"},t}(o),p=function(e){function t(){e.apply(this,arguments),this.viewName="ExamplePane",this.viewModelType=i,this.examplePaneBlock0=this.addChild(new d),this._bindings=[{id:"0",className:{showResults:"isResultPaneVisible"}},{id:"1",className:{isSelected:"isResultPaneVisible"},events:{click:["$toggle(isResultPaneVisible)"]}},{id:"2",childId:"resultFrame"}]}return __extends(t,e),t.prototype.onInitialize=function(){this.examplePaneBlock0.owner=this},t.prototype.onViewModelChanged=function(){this.examplePaneBlock0.setData({items:this.getValue("panes")})},t.prototype.onRenderHtml=function(){return'<div id="'+this.id+'_0" '+this._genClass("c-ExamplePane",["showResults","isResultPaneVisible"])+'><div class="tab2col1">'+this.examplePaneBlock0.renderHtml()+'</div><div class="tab2col2"><div id="'+this.id+'_1" '+this._genClass("pane",["isSelected","isResultPaneVisible"])+'><div class="title">Result</div><div class="edit"><iframe id="'+this.id+'_2" class="result"></iframe></div></div></div></div>'},t}(a);return p}),define("AboutPage.css",["require","exports"],function(e,t){t.styles='.c-AboutPage .editor{height:100px;font-family:Consolas}.c-AboutPage .bigEditor{height:300px}.c-AboutPage a{padding:2px 5px}.c-AboutPage .reference{padding:2px 5px;margin:4px;background:#EEE;border:1px solid #DDD;font-family:Consolas,"Courier New";white-space:nowrap}'});var __extends=this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i};define("AboutPage",["require","exports","AboutPageModel","DomUtils","AboutPageBase","ExamplePane","AboutPage.css"],function(e,t,i,n,s,a,o){n.loadStyles(o.styles);var r=function(e){function t(){e.apply(this,arguments),this.viewName="AboutPage",this.viewModelType=i,this.examplePane=this.addChild(new a),this.example2Pane=this.addChild(new a),this.example3Pane=this.addChild(new a)}return __extends(t,e),t.prototype.onViewModelChanged=function(){this.examplePane.setData(this.getValue("example1")),this.example2Pane.setData(this.getValue("example2")),this.example3Pane.setData(this.getValue("example3"))},t.prototype.onRenderHtml=function(){return'<div class="c-AboutPage page"><h1>OneJS is a tiny web framework.</h1><p>OneJS is a small set of core classes which enable you to build easily reusable web components in an Model View ViewModel (MVVM) pattern.</p><p>Utilizing RequireJS to load and optimize modules, you can include only the parts of OneJS you need. A barebones web page with data binding support only adds<span class="ref">5k (gzipped)</span>to the download size.</p><p>For production purposes, OneJS uses a compiler to compile Views (templates) into TypeScript classes. These can be mixed together with other components, and TypeScript type checking can catch your bugs early. While this tranlates down into JavaScript classes for current browsers, it ensures future compatibility with ECMAScript 6 once it is fully supported.</p><h2>Why</h2><ul><li>Performance first. No virtual DOM required to minimize DOM changes.</li><li>Small footprint. (8k gzipped) RequireJS is the only dependency.</li><li>Build reusable components, share them with others, reskin them.</li><li>Easy to iterate with. Start with markup, build a view model for it when youre ready.</li><li>Testable. Generated selenium test stubs make it easy to navigate your site.</li><li>Localizable. Put your strings and css in amd modules, reroute as necessary.</li><li>Interopable. Want to use a jQuery plugin? How about that Ace editor, which is being used on this page? OneJS won&#39;t get in your way.</li><li>Extendable. Easy to create your own product base classes. Easy to create your own binding and eventing helpers that can be invoked from views directly.</li></ul><h2>Get started now</h2><pre>git clone https://github.com/dzearing/od-wireframe</pre><pre>cd od-wireframe</pre><pre>npm i</pre><pre>gulp</pre><p>Then open the index.html locally to render.</p><h2>How it works</h2><p>OneJS encourages a separation between view and view models. You can build easy to consume, easy to reuse components that can be shared and reused.</p><h2>Views</h2><p>Let&#39;s start with a view template. A view template is defined by a<span class="ref">js-view</span>element, with a<span class="ref">js-type</span>attribute indicating the class name. Within it, you can put whatever markup you want:</p>'+this.examplePane.renderHtml()+'<p>If you inspect the TypeScript tab, you will see a View subclass with a small set of imports and a render function that returns a string. This is generated by the OneJS compiler, which is available as a<a href="http://github.com/dzearing/gulp-onejs-compiler">gulp</a>plugin. We can instantiate that class and call its<span class="ref">renderHtml</span>method to programatically get the content as a string, which we can innerHTML into the page.</p><h2>View models and binding</h2><p>Ok, so now we have a class that can render our markup. But it&#39;s all hardcoded. This is where we should set up a view model to hold the values, so that they can be changed independently of the view. To do this, we add the<span class="ref">js-model</span>attribute to the view, and add<span class="ref">js-bind</span>binding attributes to the various elements to map what property goes where.</p>'+this.example2Pane.renderHtml()+'<p>Binding syntax is mostly flexible, but with performance in mind. js-bind has support for binding text, html, attributes, css values, and toggling classes. The source can be any property or function in the view model&#39;s data heirarchy. See the binding documentation for more information, or jump to the following examples:</p><ul><li><a href="#/docs">Example: binding text</a></li><li><a href="#/docs">Example: binding html</a></li><li><a href="#/docs">Example: binding attributes</a></li><li><a href="#/docs">Example: binding classNames</a></li><li><a href="#/docs">Example: repeating</a></li><li><a href="#/docs">Example: conditionals</a></li></ul><p>This is where a gulp or grunt build workflow keeps things refreshed. We use a generator that can read the xhtml template, and generate a JavaScript or TypeScript class for anyone to consume. The class has a list of OneJS AMD dependencies, which means that we can use the build workflow to easily package up JavaScript dependencies together.</p><h2>Using the view in other views</h2>'+this.example3Pane.renderHtml()+"<h2>Adding view specific logic</h2><h2>Merge your styles in</h2><h2>Using resources and avoiding singletons</h2></div>"},t}(s);return r});