var __extends=this.__extends||function(e,t){function n(){this.constructor=e}for(var s in t)t.hasOwnProperty(s)&&(e[s]=t[s]);n.prototype=t.prototype,e.prototype=new n};define(["require","exports","ViewModel"],function(e,t,n){var s=function(e){function t(){e.apply(this,arguments),this.panes=[{key:"html",hasEditor:!0,updatesResults:!0,editorType:"html",title:"HTML",content:"<div>Hello world</div>"},{key:"less",hasEditor:!0,updatesResults:!0,editorType:"less",title:"Less",content:'.c-FavoriteThings {\n    font-family: "Helvetica";\n}\n\nul {\n    margin: 0;\n    padding: 0 25px;\n    font-size: 80%;\n    list-style-type: none;\n'}],this.isResultPaneVisible=!0,this.selectedPane="html"}return __extends(t,e),t.prototype.isPaneSelected=function(e){return e.pane.key==this.selectedPane},t}(n);return s});