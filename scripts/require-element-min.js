!function(){var t,e,r,n,u,o,i,a;t=function(){var t=function(t){return t.replace(/^[^<]*|[^>]*$/g,"")};return document.createElement("template").content?function(e){var r=document.createElement("template");return r.innerHTML=t(e),r.content.childNodes[0]}:function(e){var r=document.createElement("div");return r.innerHTML=t(e),r.childNodes[0]}}(),e=function(){var t=function(t){var e=typeof t;return"string"===e?document.createTextNode(t):"number"===e?document.createTextNode(t.toString()):t},e=function(e,r,n){var u;try{e.innerText=""}catch(t){}try{e.textContent=""}catch(t){}r.map(function(r){if(n.hasOwnProperty(r))if(u=n[r],u.shift)for(var o=0;o<u.length;o++)e.appendChild(t(u[o]));else e.appendChild(t(u))})},r=/\$\(([^\s()\-\.]+)\)/g,n=function(t){for(var e,n=[];e=r.exec(t);)n.push(e[1]);return 0==n.length?null:n},u=function(t){return 1==t.childNodes.length&&"#text"===t.childNodes[0].nodeName&&(result=t.innerText||t.textContent)?n(result):(result=t.getAttribute("offspring"))?(t.removeAttribute("offspring"),n(result)):null},o=function(t,e){for(var n=t.attributes,u=0;u<n.length;u++)n[u].value=n[u].value.replace(r,function(t,r){return""+e[r]})};return function(t,r){var n=u(t);n&&e(t,n,r),o(t,r)}}(),r=function(t,e,r){var n,u,o=[t];for(u=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode:function(t){var n=e(t);return r&&!n&&r(t),n?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}},!1);n=u.nextNode();)o.push(n);return o},n=function(t){for(var e,r,n,u=0;u<t.length;u++)"string"==typeof t[u]?e=t[u]:"function"==typeof t[u]?r=t[u]:n=t[u];return{html:e,factory:r,thisObject:n}},u=function(){var t=function(t){var e=[];for(var r in t)if(t.hasOwnProperty(r)){var n=t[r];e[r]="function"==typeof jQuery&&n instanceof jQuery||n.length>1?n:n[0]}var u=[];for(var r in e)e.hasOwnProperty(r)&&u.push(e[r]);return u};return t}(),o=function(t,e){if(!t.factory)return e.rawNode;var r=t.factory.apply(t.thisObject,u(e.groups));return r?r:e.rawNode},i=function(t,e,r,n,u){var o=function(t){var e=t.getAttribute("id");if(!e)return null;var r=e.match(/^(\d+)(\$)?$/);if(!r)return null;t.removeAttribute("id");var n=r[1];return r[2]&&"function"==typeof jQuery&&(t=jQuery(t)),{node:t,id:n}},i=function(t){var e=t.parentNode;e.removeChild(t);var r=t.getAttribute("template-id"),o=r.match(/^\d+$/);if(!o)throw new Error("just an integer as template-id please");t.removeAttribute("template-id");var i=o[0];return{id:i,node:function(){var r=n(arguments),o=new d(t.outerHTML,r.thisObject);return e.appendChild(o.rawNode),u(r,o)}}},a=function(t){if("function"!=typeof jQuery)return!1;for(var e=0;e<t.length;e++)if(!(t[e]instanceof jQuery))return!1;return!0},f=function(t){if(!a(t))return t;for(var e=jQuery(),r=0;r<t.length;r++)e.add(t[r]);return e},c=function(t){for(var e={},r=0;r<t.length;r++){var n=t[r].id;e.hasOwnProperty(n)?e[n].push(t[r].node):e[n]=[t[r].node]}for(var n in e)e.hasOwnProperty(n)&&(e[n]=f(e[n]));return e},l=function(t,n){for(var u=[],a=r(t,function(t){return null==t.getAttribute("template-id")},function(t){u.push(t)}),f=[],c=0;c<a.length;c++){var l=o(a[c]);l&&f.push(l),n&&e(a[c],n)}for(var c=0;c<u.length;c++)f.push(i(u[c]));return f},d=function(e,r){var n=t(e);this.groups=c(l(n,r)),this.rawNode=n};return d}(t,e,r,n,o),a=function(t,e,r){var n=function(){var n=r(arguments),u=new t(n.html,n.thisObject);return e(n,u)};window.requireElement=n}(i,o,n)}();