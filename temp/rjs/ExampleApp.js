var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);n.prototype=t.prototype,e.prototype=new n};define(["require","exports","ExampleAppModel","DomUtils","ExampleAppBase","Header","ContentControl","ExampleApp.css"],function(e,t,n,o,i,p,r,s){o.loadStyles(s.styles);var a=function(e){function t(){e.apply(this,arguments),this.viewName="ExampleApp",this.viewModelType=n,this.header=this.addChild(new p),this.content=this.addChild(new r)}return __extends(t,e),t.prototype.onViewModelChanged=function(){this.content.setData({contentType:this.getValue("pageType")})},t.prototype.onRenderHtml=function(){return'<div class="c-ExampleApp">'+this.header.renderHtml()+'<div class="centered">'+this.content.renderHtml()+"</div></div>"},t}(i);return a});