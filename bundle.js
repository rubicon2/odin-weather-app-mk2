(()=>{"use strict";var n={426:(n,e,t)=>{t.d(e,{Z:()=>c});var r=t(537),o=t.n(r),a=t(645),i=t.n(a)()(o());i.push([n.id,":root {\n  --main-text-color: #e2e2e2;\n  --secondary-text-color: #6e6e6e;\n  --error-text-color: #c56d6d;\n  --main-text-size: 2rem;\n\n  box-sizing: border-box;\n  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n  font-size: var(--main-text-size);\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  height: 100vh;\n  background-color: black;\n}\n\n.weather-container {\n  height: 100%;\n}\n\n.background {\n  position: fixed;\n  z-index: -1;\n  height: 100%;\n  width: 100%;\n  opacity: 0;\n  background-size: cover;\n}\n\n.side-panel {\n  height: 100%;\n  width: 500px;\n  margin-left: auto;\n  padding: 1.5rem 2rem;\n  padding-left: 0.5rem;\n\n  background-color: rgba(0, 0, 0, 0.699);\n  color: var(--main-text-color);\n\n  box-shadow: -10px 0px 50px 50px rgb(0, 0, 0, 0.699);\n\n  display: flex;\n  flex-direction: column;\n\n  transition: all 2s;\n}\n\n.location-header {\n  display: flex;\n  flex-direction: column;\n}\n\n.location-display {\n  font-size: 2rem;\n  font-weight: bold;\n  font-style: italic;\n  align-self: flex-end;\n}\n\n.country-display {\n  color: var(--secondary-text-color);\n  font-size: 0.8rem;\n  align-self: flex-end;\n  margin-right: 0.4rem;\n  margin-bottom: 1.5rem;\n}\n\n.weather-panel {\n  position: relative;\n  width: 100%;\n}\n\n.weather-panel-content {\n  width: 100%;\n  position: absolute;\n  top: 0;\n  display: grid;\n  grid-template-rows: repeat(7, 1.5rem);\n  gap: 1rem;\n}\n\n.weather-panel-row {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n\n  background-color: #1d1d1dd5;\n  padding: 1rem;\n  border-radius: 50px;\n\n  opacity: 0;\n}\n\n.weather-panel-row-title {\n  margin-right: auto;\n  color: var(--main-text-color);\n}\n\n.unit-component {\n  display: grid;\n  grid-template-columns: min-content min-content;\n}\n\n.unit-component-normalized {\n  /* To keep the info lined up nicely from row to row.\n   * So there will be a column of darker text for\n   * the units of measurement, and column of lighter\n   * text with the actual information */\n  grid-template-columns: min-content 40px;\n}\n\n.measurement-unit {\n  color: var(--secondary-text-color);\n  font-size: 0.8rem;\n}\n\n.condition-icon {\n  width: 1.8rem;\n}\n\n.current-condition-icon {\n  /* Offset icon so it appears in line with info on other rows */\n  margin-right: 30px;\n}\n\n/* To contain the error display and search bar */\n.search-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  margin: 1rem;\n  display: flex;\n  flex-direction: column;\n  place-items: center;\n  gap: 0.5rem;\n}\n\n.weather-panel-select-button-container {\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.123);\n  border-radius: 50px;\n}\n\n.weather-panel-select-button {\n  color: var(--secondary-text-color);\n  font-size: 0.6rem;\n  font-weight: bold;\n  font-style: italic;\n  padding: 0.3rem 0;\n  background-color: rgba(255, 255, 255, 0.123);\n  border-radius: 50px;\n  border: none;\n}\n\n.rounded-left {\n  border-radius: 50px 0 0 50px;\n}\n\n.rounded-right {\n  border-radius: 0 50px 50px 0;\n}\n\n.error-display {\n  color: var(--error-text-color);\n  font-size: 0.9rem;\n  opacity: 0;\n}\n\n.search-bar {\n  display: flex;\n  /* Add box shadow to both search input and button, make sure border-radius matches theirs */\n  /* This really increases visibility against bright backgrounds */\n  border-radius: 50px;\n  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.123);\n}\n\n.search-bar input,\n.search-bar .search-button {\n  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n  font-size: 1rem;\n  padding: 0.3rem 1rem;\n\n  background-color: rgba(255, 255, 255, 0.123);\n  border: 1px solid rgb(0, 0, 0, 0.123);\n  /* border: none; */\n}\n\n.search-bar > input {\n  max-width: 300px;\n  color: var(--secondary-text-color);\n  font-style: italic;\n}\n\n.search-bar > input:focus {\n  font-style: normal;\n}\n\nbutton {\n  cursor: pointer;\n}\n\n.search-button {\n  border-left: none;\n  cursor: pointer;\n  display: grid;\n  place-content: center;\n  opacity: 0.8;\n}\n\n.weather-panel-select-button:hover,\n.search-button:hover {\n  opacity: 0.6;\n}\n\n.weather-panel-select-button:active,\n.search-button:active {\n  opacity: 0.3;\n}\n","",{version:3,sources:["webpack://./src/style.css"],names:[],mappings:"AAAA;EACE,0BAA0B;EAC1B,+BAA+B;EAC/B,2BAA2B;EAC3B,sBAAsB;;EAEtB,sBAAsB;EACtB,wEAAwE;EACxE,gCAAgC;AAClC;;AAEA;;;EAGE,mBAAmB;EACnB,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,WAAW;EACX,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,oBAAoB;EACpB,oBAAoB;;EAEpB,sCAAsC;EACtC,6BAA6B;;EAE7B,mDAAmD;;EAEnD,aAAa;EACb,sBAAsB;;EAEtB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,kCAAkC;EAClC,iBAAiB;EACjB,oBAAoB;EACpB,oBAAoB;EACpB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,aAAa;EACb,qCAAqC;EACrC,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,WAAW;;EAEX,2BAA2B;EAC3B,aAAa;EACb,mBAAmB;;EAEnB,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,8CAA8C;AAChD;;AAEA;EACE;;;uCAGqC;EACrC,uCAAuC;AACzC;;AAEA;EACE,kCAAkC;EAClC,iBAAiB;AACnB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,8DAA8D;EAC9D,kBAAkB;AACpB;;AAEA,gDAAgD;AAChD;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,WAAW;EACX,aAAa;EACb,8BAA8B;EAC9B,8CAA8C;EAC9C,mBAAmB;AACrB;;AAEA;EACE,kCAAkC;EAClC,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;EAClB,iBAAiB;EACjB,4CAA4C;EAC5C,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,8BAA8B;EAC9B,iBAAiB;EACjB,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,2FAA2F;EAC3F,gEAAgE;EAChE,mBAAmB;EACnB,8CAA8C;AAChD;;AAEA;;EAEE,wEAAwE;EACxE,eAAe;EACf,oBAAoB;;EAEpB,4CAA4C;EAC5C,qCAAqC;EACrC,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,kCAAkC;EAClC,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,aAAa;EACb,qBAAqB;EACrB,YAAY;AACd;;AAEA;;EAEE,YAAY;AACd;;AAEA;;EAEE,YAAY;AACd",sourcesContent:[":root {\r\n  --main-text-color: #e2e2e2;\r\n  --secondary-text-color: #6e6e6e;\r\n  --error-text-color: #c56d6d;\r\n  --main-text-size: 2rem;\r\n\r\n  box-sizing: border-box;\r\n  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\r\n  font-size: var(--main-text-size);\r\n}\r\n\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: inherit;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nbody {\r\n  height: 100vh;\r\n  background-color: black;\r\n}\r\n\r\n.weather-container {\r\n  height: 100%;\r\n}\r\n\r\n.background {\r\n  position: fixed;\r\n  z-index: -1;\r\n  height: 100%;\r\n  width: 100%;\r\n  opacity: 0;\r\n  background-size: cover;\r\n}\r\n\r\n.side-panel {\r\n  height: 100%;\r\n  width: 500px;\r\n  margin-left: auto;\r\n  padding: 1.5rem 2rem;\r\n  padding-left: 0.5rem;\r\n\r\n  background-color: rgba(0, 0, 0, 0.699);\r\n  color: var(--main-text-color);\r\n\r\n  box-shadow: -10px 0px 50px 50px rgb(0, 0, 0, 0.699);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n\r\n  transition: all 2s;\r\n}\r\n\r\n.location-header {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.location-display {\r\n  font-size: 2rem;\r\n  font-weight: bold;\r\n  font-style: italic;\r\n  align-self: flex-end;\r\n}\r\n\r\n.country-display {\r\n  color: var(--secondary-text-color);\r\n  font-size: 0.8rem;\r\n  align-self: flex-end;\r\n  margin-right: 0.4rem;\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n.weather-panel {\r\n  position: relative;\r\n  width: 100%;\r\n}\r\n\r\n.weather-panel-content {\r\n  width: 100%;\r\n  position: absolute;\r\n  top: 0;\r\n  display: grid;\r\n  grid-template-rows: repeat(7, 1.5rem);\r\n  gap: 1rem;\r\n}\r\n\r\n.weather-panel-row {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.4rem;\r\n\r\n  background-color: #1d1d1dd5;\r\n  padding: 1rem;\r\n  border-radius: 50px;\r\n\r\n  opacity: 0;\r\n}\r\n\r\n.weather-panel-row-title {\r\n  margin-right: auto;\r\n  color: var(--main-text-color);\r\n}\r\n\r\n.unit-component {\r\n  display: grid;\r\n  grid-template-columns: min-content min-content;\r\n}\r\n\r\n.unit-component-normalized {\r\n  /* To keep the info lined up nicely from row to row.\r\n   * So there will be a column of darker text for\r\n   * the units of measurement, and column of lighter\r\n   * text with the actual information */\r\n  grid-template-columns: min-content 40px;\r\n}\r\n\r\n.measurement-unit {\r\n  color: var(--secondary-text-color);\r\n  font-size: 0.8rem;\r\n}\r\n\r\n.condition-icon {\r\n  width: 1.8rem;\r\n}\r\n\r\n.current-condition-icon {\r\n  /* Offset icon so it appears in line with info on other rows */\r\n  margin-right: 30px;\r\n}\r\n\r\n/* To contain the error display and search bar */\r\n.search-container {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  margin: 1rem;\r\n  display: flex;\r\n  flex-direction: column;\r\n  place-items: center;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.weather-panel-select-button-container {\r\n  width: 100%;\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.123);\r\n  border-radius: 50px;\r\n}\r\n\r\n.weather-panel-select-button {\r\n  color: var(--secondary-text-color);\r\n  font-size: 0.6rem;\r\n  font-weight: bold;\r\n  font-style: italic;\r\n  padding: 0.3rem 0;\r\n  background-color: rgba(255, 255, 255, 0.123);\r\n  border-radius: 50px;\r\n  border: none;\r\n}\r\n\r\n.rounded-left {\r\n  border-radius: 50px 0 0 50px;\r\n}\r\n\r\n.rounded-right {\r\n  border-radius: 0 50px 50px 0;\r\n}\r\n\r\n.error-display {\r\n  color: var(--error-text-color);\r\n  font-size: 0.9rem;\r\n  opacity: 0;\r\n}\r\n\r\n.search-bar {\r\n  display: flex;\r\n  /* Add box shadow to both search input and button, make sure border-radius matches theirs */\r\n  /* This really increases visibility against bright backgrounds */\r\n  border-radius: 50px;\r\n  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.123);\r\n}\r\n\r\n.search-bar input,\r\n.search-bar .search-button {\r\n  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\r\n  font-size: 1rem;\r\n  padding: 0.3rem 1rem;\r\n\r\n  background-color: rgba(255, 255, 255, 0.123);\r\n  border: 1px solid rgb(0, 0, 0, 0.123);\r\n  /* border: none; */\r\n}\r\n\r\n.search-bar > input {\r\n  max-width: 300px;\r\n  color: var(--secondary-text-color);\r\n  font-style: italic;\r\n}\r\n\r\n.search-bar > input:focus {\r\n  font-style: normal;\r\n}\r\n\r\nbutton {\r\n  cursor: pointer;\r\n}\r\n\r\n.search-button {\r\n  border-left: none;\r\n  cursor: pointer;\r\n  display: grid;\r\n  place-content: center;\r\n  opacity: 0.8;\r\n}\r\n\r\n.weather-panel-select-button:hover,\r\n.search-button:hover {\r\n  opacity: 0.6;\r\n}\r\n\r\n.weather-panel-select-button:active,\r\n.search-button:active {\r\n  opacity: 0.3;\r\n}\r\n"],sourceRoot:""}]);const c=i},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var d=0;d<n.length;d++){var l=[].concat(n[d]);r&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),e.push(l))}},e}},537:n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */");return[e].concat([a]).join("\n")}return[e].join("\n")}},379:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},i=[],c=0;c<n.length;c++){var s=n[c],d=r.base?s[0]+r.base:s[0],l=a[d]||0,A="".concat(d," ").concat(l);a[d]=l+1;var u=t(A),p={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)e[u].references++,e[u].updater(p);else{var m=o(p,r);r.byIndex=c,e.splice(c,0,{identifier:A,updater:m,references:1})}i.push(A)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var c=t(a[i]);e[c].references--}for(var s=r(n,o),d=0;d<a.length;d++){var l=t(a[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=s}}},569:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={id:r,exports:{}};return n[r](a,a.exports,t),a.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var r=e.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!n;)n=r[o--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),t.nc=void 0,(()=>{const n={};function e(e,t){n[e]?n[e].push(t):n[e]=[t]}function r(e,...t){try{n[e]&&n[e].forEach((n=>{n(...t)}))}catch(n){console.error(`${n.name}: ${n.message}. Event tag: '${e}'`)}}function o(n){const e={};return e.name=function(n){return n.location.name}(n),e.region=function(n){return n.location.region}(n),e.country=function(n){return n.location.country}(n),e}function a(n){const e={};return e.condition=function(n){return n.current.condition.text}(n),e.code=function(n){return n.current.condition.code}(n),e.temp_c=function(n){return n.current.temp_c}(n),e.temp_f=function(n){return n.current.temp_f}(n),e.humidity=function(n){return n.current.humidity}(n),e.wind_mph=function(n){return n.current.wind_mph}(n),e.wind_kph=function(n){return n.current.wind_kph}(n),e.is_day=function(n){return n.current.is_day}(n),e.icon=function(n){return`https:${n.current.condition.icon}`}(n),e}function i(n){const e={};e.name=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"][new Date(n.date).getDay()],e.date=n.date;const{day:t}=n;return e.avgtemp_c=t.avgtemp_c,e.avgtemp_f=t.avgtemp_f,e.condition=t.condition.text,e.code=t.condition.code,e.icon=`https:${t.condition.icon}`,e}function c(n){const e=[];for(let t=0;t<n.forecast.forecastday.length;t+=1)e.push(i(n.forecast.forecastday[t]));return e}const s=t.p+"30ad26807c49ff30888e.jpg",d=t.p+"cfcbf7ee10bfa82f5b98.jpg",l=t.p+"e68d3f328a6e31c8fe32.jpg",A=t.p+"2354ded963d4f2bc94e7.jpg",u=t.p+"9b3b85f1de4f6319b28c.jpg",p=t.p+"b1b1211f1351f5f99b0c.jpg";function m(n){return new Promise((e=>{setTimeout((()=>{e()}),n)}))}function h(n,e,t){return new Promise((r=>{n.style.opacity!=t?(n.style.transition=`opacity ${e}s`,n.style.opacity=t,n.addEventListener("transitionend",(function n(){this.removeEventListener("transitionend",n),r()}))):r()}))}function f(n,e,t=1,r=1){return new Promise((o=>{h(n,t,0).then((()=>{n.innerText=e})).then((()=>{h(n,t,r)})).then((()=>{o()}))}))}function E(){const n=document.createElement("button");return n.type="button",n.classList.add("weather-panel-select-button"),n}const C=t.p+"77122e52548bca5dc7b9.svg";function g(n,...e){const t=document.createElement("div");if(t.classList.add("weather-panel-row"),n){const e=document.createElement("span");e.classList.add("weather-panel-row-title"),e.innerText=n,t.appendChild(e)}return e.forEach((n=>{t.appendChild(n)})),t}function b(n){const e=document.createElement("div");e.classList.add("unit-component");const t=document.createElement("span");t.classList.add("measurement-reading"),e.appendChild(t);const r=document.createElement("span");return r.classList.add("measurement-unit"),r.innerText=n,e.appendChild(r),{containerElement:e,measurementReadingElement:t}}const B="°";function w(){const n=document.createElement("div");n.classList.add("weather-panel-row-title");const e=b(`${B}C`),t=document.createElement("img");return t.classList.add("condition-icon"),{row:g(null,n,e.containerElement,t),weekday:n,temperature:e.measurementReadingElement,condition:t}}let y=null,x=null,v=null,k=null,T=null,L={},z=[];const S=250;let F="none",W=!1;async function j(n){k.innerText!==n.message&&(await h(k,.3,0),k.innerText=n.message,h(k,.3,1))}async function D(){await h(k,.3,0),k.innerText=""}async function _(n,e){h(L.temperature.row,n,e),await m(S),h(L.condition.row,n,e),await m(S),h(L.humidity.row,n,e),await m(S),h(L.wind.row,n,e)}async function N(n,e){for(let t of z)h(t.row,n,e),await m(S)}async function M(){await N(1,0);for(let n=0;n<z.length;n+=1){const e=z[n],t=T.forecast[n];0===n?t.name="Today":1===n&&(t.name="Tomorrow"),e.weekday.innerText=t.name,e.temperature.innerText=Number.parseFloat(t.avgtemp_c).toFixed(1),e.condition.src=t.icon}"forecast"===F&&await N(1,1)}async function Y(){W||(F="forecast",W=!0,await _(1,0),M(),W=!1)}async function $(){await _(1,0),L.temperature.info.innerText=Number.parseFloat(T.current.temp_c).toFixed(1),L.condition.info.src=T.current.icon,L.humidity.info.innerText=T.current.humidity,L.wind.info.innerText=T.current.wind_mph,"current"===F&&await _(1,1)}var P=t(379),I=t.n(P),q=t(795),U=t.n(q),Z=t(569),R=t.n(Z),O=t(565),G=t.n(O),X=t(216),H=t.n(X),J=t(589),V=t.n(J),K=t(426),Q={};Q.styleTagTransform=V(),Q.setAttributes=G(),Q.insert=R().bind(null,"head"),Q.domAPI=U(),Q.insertStyleElement=H(),I()(K.Z,Q),K.Z&&K.Z.locals&&K.Z.locals,document.body.appendChild(function(){const n=document.createElement("div");n.classList.add("weather-container");const e=document.createElement("div");e.classList.add("background"),y=e,n.appendChild(e);const t=function(){const n=document.createElement("div");n.classList.add("side-panel");const e=function(){const n=document.createElement("div");n.classList.add("location-header");const e=document.createElement("div");e.classList.add("location-display"),n.appendChild(e);const t=document.createElement("div");return t.classList.add("country-display"),n.appendChild(t),{container:n,locationNameElement:e,countryElement:t}}();n.appendChild(e.container);const{locationNameElement:t}=e,{countryElement:r}=e,o=document.createElement("div");o.classList.add("weather-panel"),n.appendChild(o);const a=function(){const n=document.createElement("div");n.classList.add("weather-panel-content");const e=b(`${B}C`),t=g("Average",e.containerElement);n.appendChild(t);const r=document.createElement("img");r.classList.add("condition-icon","current-condition-icon");const o=g("Condition",r);n.appendChild(o);const a=b("%"),i=g("Humidity",a.containerElement);n.appendChild(i);const c=b("mph"),s=g("Wind",c.containerElement);n.appendChild(s);const d={};return d.temperature={row:t,info:e.measurementReadingElement},d.condition={row:o,info:r},d.humidity={row:i,info:a.measurementReadingElement},d.wind={row:s,info:c.measurementReadingElement},e.containerElement.classList.add("unit-component-normalized"),a.containerElement.classList.add("unit-component-normalized"),c.containerElement.classList.add("unit-component-normalized"),{container:n,currentElements:d}}(),{currentElements:i}=a;o.appendChild(a.container);const c=function(){const n=document.createElement("div");n.classList.add("weather-panel-content");const e=[];for(let t=0;t<7;t+=1){const t=w();e.push(t),n.appendChild(t.row)}return{container:n,forecastElements:e}}(),{forecastElements:s}=c;return o.appendChild(c.container),{container:n,locationElement:e,locationNameElement:t,countryElement:r,weatherPanel:o,currentWeather:a,currentElements:i,weatherForecast:c,forecastElements:s}}();x=t.locationNameElement,v=t.countryElement,L=t.currentElements,z=t.forecastElements,n.appendChild(t.container);const o=function(){const n=document.createElement("div");n.classList.add("search-container");const e=function(){const n=document.createElement("div");n.classList.add("weather-panel-select-button-container");const e=E();e.innerText="Current",e.classList.add("rounded-left"),n.appendChild(e);const t=E();return t.innerText="Forecast",t.classList.add("rounded-right"),n.appendChild(t),{container:n,currentButton:e,forecastButton:t}}();n.appendChild(e.container),e.currentButton.addEventListener("click",(()=>{r("onCurrentButtonClick")})),e.forecastButton.addEventListener("click",(()=>{r("onForecastButtonClick")}));const t=document.createElement("div");t.classList.add("search-bar"),n.appendChild(t);const o=document.createElement("input");o.classList.add("rounded-left"),o.type="text",o.placeholder="Search...",t.appendChild(o);const a=document.createElement("div");a.classList.add("search-button","rounded-right");const i=document.createElement("img");i.src=C,a.appendChild(i);const c=document.createElement("div");return c.innerText="Error message",c.classList.add("error-display"),n.appendChild(c),t.appendChild(a),{container:n,panelSelectButtons:e,currentButton:e.currentButton,forecastButton:e.forecastButton,searchBar:t,locationInput:o,searchButton:a,searchIcon:i,errorElement:c}}();return k=o.errorElement,o.currentButton.addEventListener("click",(()=>{!async function(){W||(F="current",W=!0,await N(1,0),$(),W=!1)}()})),o.forecastButton.addEventListener("click",(()=>{Y()})),o.searchButton.addEventListener("click",(()=>{const n=o.locationInput.value;n?n.toLowerCase()!==x.innerText.toLowerCase()?r("onLocationSubmit",n):D():j(new Error("Please enter a location"))})),n.appendChild(o.container),n}());const nn=new class{#n;#e;#t;constructor(n){this.#n=n}start(){this.#e=Date.now(),this.#t=null}end(){this.#t=Date.now()}get name(){return this.#n}get startTime(){return this.#e}get endTime(){return this.#t}get elapsedTime(){return this.#t-this.#e}}("WeatherAPI Fetch");e("onWeatherDataFetchStart",(()=>{nn.start()})),e("onWeatherDataFetchSuccess",(()=>{nn.end(),console.log(`Took ${nn.elapsedTime}ms for weatherAPI to give us what we want!`)})),e("onWeatherDataFetchError",(()=>{nn.end(),console.log(`Took ${nn.elapsedTime}ms for weatherAPI to error out on us!`)})),e("onLocationSubmit",(async function(n){try{r("onWeatherDataFetchStart");const t=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=05220d5fdaf44d4aba591717242201&q=${n}&days=7&aqi=no&alerts=no`,{mode:"cors"});r("onWeatherDataFetchSuccess",{location:o(e=await t.json()),current:a(e),forecast:c(e)})}catch(n){console.log(n),window.navigator.onLine?r("onWeatherDataFetchError",new Error("Please enter a valid location")):r("onWeatherDataFetchError",new Error("No internet connection"))}var e})),e("onWeatherDataFetchSuccess",(function(n){try{T=n,D(),function(n,e,t=1,r=1){new Promise((o=>{h(n,t,0).then((()=>{n.style.backgroundImage=`url(${e})`})).then((()=>{h(n,t,r)})).then((()=>{o()}))}))}(y,function(n){return n.match(/day/i)?n.match(/snow/i)?A:n.match(/rain/i)?u:p:n.match(/snow/i)?s:n.match(/rain/i)?d:l}(`${T.location.name} ${T.current.condition} ${T.current.is_day?"day":"night"}`)),f(x,T.location.name),f(v,T.location.country,1.1),$(),M()}catch(n){console.log(n),j(new Error("Data display error"))}})),e("onWeatherDataFetchError",j),r("onLocationSubmit","Sapporo"),Y()})()})();
//# sourceMappingURL=bundle.js.map