// ==UserScript==
// @name         Crunchy/MAL linker
// @namespace    https://github.com/roddolf/scripts
// @version      1.0.1
// @description  Add links into Crunchyroll for MAL anime library.
// @author       Rodolfo Aguirre
// @include      /^https?://www.crunchyroll.com/([a-z-]+/)?[a-zA-Z-\d]+$/
// @updateURL    https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/script.meta.js
// @downloadURL  https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/dist/script.user.js
// ==/UserScript==
!function(){"use strict";var e=function(e,t,n,i){return new(n||(n=Promise))((function(o,c){function s(e){try{a(i.next(e))}catch(e){c(e)}}function r(e){try{a(i.throw(e))}catch(e){c(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,r)}a((i=i.apply(e,t||[])).next())}))};const t=(t,n)=>e(void 0,void 0,void 0,(function*(){const e=new Request("https://cors-anywhere.herokuapp.com/"+n,{method:t}),i=yield fetch(e);return 200!==i.status?Promise.reject(i):i.json()}));$(document).ready(()=>e(void 0,void 0,void 0,(function*(){if(!$("#source_showview").length)return;const n=$("h1.ellipsis"),i=$("h1.ellipsis span").text(),o=yield(n=>e(void 0,void 0,void 0,(function*(){const e=`https://myanimelist.net/search/prefix.json?type=anime&keyword=${encodeURI(n)}&v=1`,{categories:[{items:[i]}]}=yield t("GET",e);if(i)return i.url})))(i);o&&n.append(`<a href="${o}" style="vertical-align: middle;"><img src="https://cdn.myanimelist.net/images/faviconv5.ico"></a>`)})))}();
