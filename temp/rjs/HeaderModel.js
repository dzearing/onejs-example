var __extends=this.__extends||function(e,t){function o(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);o.prototype=t.prototype,e.prototype=new o};define(["require","exports","ViewModel"],function(e,t,o){var n=function(e){function t(){e.apply(this,arguments),this.data={logoText:"OneJS",commands:[{key:"about",viewType:"AboutPage",text:"About",url:"#/about"},{key:"docs",viewType:"DocsPage",text:"Documentation",url:"#/docs"},{key:"create",viewType:"AboutPage",text:"Create",url:"#/create"},{key:"share",viewType:"AboutPage",text:"Share",url:"#/share"},{key:"discover",viewType:"AboutPage",text:"Discover",url:"#/discover"}],isSelected:function(e){return document.location.hash===e.command.url}}}return __extends(t,e),t.prototype.onInitialize=function(){this.events.on(window,"hashchange",this.change)},t}(o);return n});