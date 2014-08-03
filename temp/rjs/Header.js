var __extends=this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i};define(["require","exports","HeaderModel","DomUtils","View","Repeater","Header.css"],function(e,t,i,n,s,o,d){n.loadStyles(d.styles);var r=function(e){function t(){e.apply(this,arguments),this.viewName="HeaderBlock0Item",this._bindings=[{id:"0",className:{selected:"$parent.isSelected"},events:{click:["$send(command.viewType, $root.pageType)"]}},{id:"1",attr:{href:"command.url"},text:"command.text"}]}return __extends(t,e),t.prototype.onRenderHtml=function(){return'<li id="'+this.id+'_0" '+this._genClass("command",["selected","$parent.isSelected"])+'><a id="'+this.id+'_1" '+this._genAttr("",["href","command.url"])+">"+this._genText("command.text")+"</a></li>"},t}(s),a=function(e){function t(){e.apply(this,arguments),this.viewName="HeaderBlock0",this.childViewType=r,this.itemName="command",this._bindings=[{id:"0",childId:"surface"}]}return __extends(t,e),t.prototype.onRenderHtml=function(){return'<ul id="'+this.id+'_0" class="commands">'+this.renderItems()+"</ul>"},t}(o),c=function(e){function t(){e.apply(this,arguments),this.viewName="Header",this.viewModelType=i,this.headerBlock0=this.addChild(new a),this._bindings=[{id:"0",text:"logoText"}]}return __extends(t,e),t.prototype.onInitialize=function(){this.headerBlock0.owner=this},t.prototype.onViewModelChanged=function(){this.headerBlock0.setData({items:this.getValue("commands")})},t.prototype.onRenderHtml=function(){return'<div class="c-Header"><div class="logoImage"></div><div id="'+this.id+'_0" class="logo">'+this._genText("logoText")+"</div>"+this.headerBlock0.renderHtml()+"</div>"},t}(s);return c});