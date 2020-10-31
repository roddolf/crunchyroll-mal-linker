// ==UserScript==
// @name         Crunchy/MAL linker
// @namespace    https://github.com/roddolf/scripts
// @version      1.2.0
// @description  Add links into Crunchyroll for MAL anime library.
// @author       Rodolfo Aguirre
// @include      /^https?://www.crunchyroll.com/([a-z-]+/)?[a-zA-Z-\d]+$/
// @updateURL    https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/script.meta.js
// @downloadURL  https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/dist/script.user.js
// ==/UserScript==
!function(){"use strict";var e=window&&window.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(o,c){function s(e){try{a(i.next(e))}catch(e){c(e)}}function r(e){try{a(i.throw(e))}catch(e){c(e)}}function a(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(s,r)}a((i=i.apply(e,n||[])).next())}))};const n=(n,t)=>e(void 0,void 0,void 0,(function*(){const e=new Request("https://cors-anywhere.herokuapp.com/"+t,{method:n}),i=yield fetch(e);return 200!==i.status?Promise.reject(i):i.json()}));$(document).ready((()=>e(void 0,void 0,void 0,(function*(){if(!$("#source_showview").length)return;const t=$("h1.ellipsis"),i=$("h1.ellipsis span").text(),o=yield(t=>e(void 0,void 0,void 0,(function*(){const e=`https://myanimelist.net/search/prefix.json?type=anime&keyword=${encodeURI(t)}&v=1`,{categories:[{items:[i]}]}=yield n("GET",e);if(i)return i.url})))(i);o&&t.append(`<a href="${o}" style="vertical-align: middle;"><img src="https://cdn.myanimelist.net/images/faviconv5.ico"></a>`)}))))}();
