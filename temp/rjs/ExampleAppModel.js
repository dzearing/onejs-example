var __extends=this.__extends||function(e,t){function o(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);o.prototype=t.prototype,e.prototype=new o};define(["require","exports","ViewModel"],function(e,t,o){var n=function(e){function t(){e.apply(this,arguments),this.pageCommands=[{key:"about",viewType:"AboutPage",text:"About",url:"#/about"},{key:"docs",viewType:"DocsPage",text:"Documentation",url:"#/docs"},{key:"create",viewType:"AboutPage",text:"Create",url:"#/create"},{key:"share",viewType:"AboutPage",text:"Share",url:"#/share"},{key:"discover",viewType:"AboutPage",text:"Discover",url:"#/discover"}],this.selectedPage=this.pageCommands[0]}return __extends(t,e),t.prototype.isViewingPage=function(e){return e&&e.command&&e.command.key==this.selectedPage.key},t.prototype.onInitialize=function(){this.__events.on(window,"hashchange",this._onHashChanged)},t.prototype._onHashChanged=function(){for(var e=document.location.hash,t=this.pageCommands,o=0;t&&o<t.length;o++)if(0==e.indexOf(t[o].url)){this.selectedPage=t[o];break}this.change()},t}(o);return n});