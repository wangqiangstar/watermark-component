function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var n=function(e,t){var n=null;n=e?document.querySelector(e):document.body;var r=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;return!!r&&(new r(t).observe(n,{childList:!0,attributes:!0,characterData:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),!0)},r={id:"wm_div_id",text:"测试水印",transparency:.15,fontSize:16,parentLeft:0,parentTop:0,parentRight:0,parentBottom:0,singleWidth:200,singleHeight:200,slope:-15,parentSelector:null};function i(n){var i=function(n){for(var r=1;r<arguments.length;r++){var i=null!=arguments[r]?arguments[r]:{};r%2?t(Object(i),!0).forEach((function(t){e(n,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):t(Object(i)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(i,e))}))}return n}({},r,{},n),o=null;if(i.parentSelector?(o=document.querySelector(i.parentSelector)).style.position="relative":o=document.body,!document.getElementById(i.id)){var a=document.createElement("canvas"),l=document.createElement("div"),c=a.getContext("2d"),s=i.slope*Math.PI/180;a.id="watermarkCanvasId",a.width=i.singleWidth,a.height=i.singleHeight,c.font="normal ".concat(i.fontSize,"px 'Microsoft Yahei','serif','sans-serif'"),c.fillStyle="rgba(112, 113, 114, ".concat(i.transparency,")"),c.translate(a.width/2,a.height/2),c.rotate(s),c.translate(-a.width/2,-a.height/2),c.textAlign="center";var d=i.fontSize+5,u=Math.ceil(Math.abs(Math.sin(s)*i.singleHeight))+5;!function(e){for(var t=e.str,n=e.ctx,r=e.initX,i=e.initY,o=e.lineHeight,a=e.canvasWidth,l=0,c=0,s=0;s<t.length;s++)(l+=n.measureText(t[s]).width)>a-50&&(n.fillText(t.slice(c,s),r,i),i+=o,l=0,c=s),s==t.length-1&&n.fillText(t.substring(c,s+1),r,i)}({str:i.text,ctx:c,initX:i.singleWidth/2,initY:u,lineHeight:d,canvasWidth:i.singleWidth});var p=a.toDataURL("image/png");l.id=i.id,l.style.position="absolute",l.style.zIndex="9999",l.style.top="".concat(i.parentTop,"px"),l.style.right="".concat(i.parentRight,"px"),l.style.bottom="".concat(i.parentBottom,"px"),l.style.left="".concat(i.parentLeft,"px"),l.style.pointerEvents="none",l.style.backgroundImage="URL("+p+")",o.appendChild(l)}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(e),window.addEventListener("resize",(function(){i(e)}));var t=e.id||r.id,o=e.parentSelector||r.parentSelector,a=document.getElementById(t).getAttribute("style"),l=n(o,(function(n,r){n[0].removedNodes[0]&&n[0].removedNodes[0].id===t&&i(e),n[0].target.id===t&&n[0].attributeName&&"style"===n[0].attributeName&&n[0].oldValue!==a&&(n[0].target.style=a)}));l||observeNode.addEventListener("DOMNodeRemoved",(function(){i(e)}),!1)}export{o as watermark};
