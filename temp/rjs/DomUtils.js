define(["require","exports"],function(){var e=function(){function e(){}return e.toggleClass=function(e,s,t){var n=e._classes=e._classes||(e.className?e.className.split(" "):[]),a=n.indexOf(s);t?-1==a&&n.push(s):a>-1&&n.splice(a,1),e.className=n.join(" ")},e.loadStyles=function(e){var s=document.createElement("style");s.type="text/css",s.appendChild(document.createTextNode(e)),document.head.appendChild(s)},e}();return e});