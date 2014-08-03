var __extends=this.__extends||function(e,i){function t(){this.constructor=e}for(var s in i)i.hasOwnProperty(s)&&(e[s]=i[s]);t.prototype=i.prototype,e.prototype=new t};define(["require","exports","ExamplePaneModel","DomUtils","View","ExamplePaneBase","Repeater","ExamplePane.css"],function(e,i,t,s,n,a,d,l){s.loadStyles(l.styles);var o=function(e){function i(){e.apply(this,arguments),this.viewName="ExamplePaneBlock0Item",this._bindings=[{id:"0",className:{isSelected:"$parent.isPaneSelected"}},{id:"1",text:"pane.title",events:{click:["$send(pane.key, $parent.selectedPane)"]}},{id:"2",attr:{"data-key":"pane.key"},childId:"editor"}]}return __extends(i,e),i.prototype.onRenderHtml=function(){return'<div id="'+this.id+'_0" '+this._genClass("pane",["isSelected","$parent.isPaneSelected"])+'><div id="'+this.id+'_1" class="title">'+this._genText("pane.title")+'</div><div id="'+this.id+'_2" '+this._genAttr("",["data-key","pane.key"])+' class="edit"></div></div>'},i}(n),r=function(e){function i(){e.apply(this,arguments),this.viewName="ExamplePaneBlock0",this.childViewType=o,this.itemName="pane",this._bindings=[{id:"0",childId:"surface"}]}return __extends(i,e),i.prototype.onRenderHtml=function(){return'<div id="'+this.id+'_0">'+this.renderItems()+"</div>"},i}(d),c=function(e){function i(){e.apply(this,arguments),this.viewName="ExamplePane",this.viewModelType=t,this.examplePaneBlock0=this.addChild(new r),this._bindings=[{id:"0",className:{showResults:"isResultPaneVisible"}},{id:"1",className:{isSelected:"isResultPaneVisible"}},{id:"2",events:{click:["$toggle(isResultPaneVisible)"]}},{id:"3",childId:"resultFrame"}]}return __extends(i,e),i.prototype.onInitialize=function(){this.examplePaneBlock0.owner=this},i.prototype.onViewModelChanged=function(){this.examplePaneBlock0.setData({items:this.getValue("panes")})},i.prototype.onRenderHtml=function(){return'<div id="'+this.id+'_0" '+this._genClass("c-ExamplePane",["showResults","isResultPaneVisible"])+'><div class="tab2col1">'+this.examplePaneBlock0.renderHtml()+'</div><div class="tab2col2"><div id="'+this.id+'_1" '+this._genClass("pane",["isSelected","isResultPaneVisible"])+'><div id="'+this.id+'_2" class="title">Result</div><div class="edit"><iframe id="'+this.id+'_3" class="result"></iframe></div></div></div></div>'},i}(a);return c});