// ==UserScript==
// @name         Crunchy/MAL linker
// @namespace    https://github.com/roddolf/scripts
// @version      2.0.0
// @description  Add links into Crunchyroll for MAL anime library.
// @author       Rodolfo Aguirre
// @include      /^https?:\/\/www.crunchyroll.com\/([a-z-]+/)?[a-zA-Z-\d]+$/
// @include      /^https?:\/\/beta.crunchyroll.com/
// @updateURL    https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/script.meta.js
// @downloadURL  https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/dist/script.user.js
// @connect      api.jikan.moe
// @connect      api.myanimelist.net
// @grant        GM.xmlHttpRequest
// ==/UserScript==
!function(){"use strict";function e(e,t,i,a){if("a"===i&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?a:"a"===i?a.call(e):a?a.value:t.get(e)}function t(e,t,i,a,n){if("m"===a)throw new TypeError("Private method is not writable");if("a"===a&&!n)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===a?n.call(e,i):n?n.value=i:t.set(e,i),i}var i,a,n;class r{constructor(e){i.set(this,void 0),a.set(this,void 0),n.set(this,void 0),t(this,i,e,"f"),t(this,a,{},"f"),t(this,n,0,"f")}add(r,s){const o={value:s,size:r.length+s.length,date:Date.now(),timeout:-1};if(e(this,i,"f").maxSize<o.size)throw new Error("Entry is too big");t(this,n,e(this,n,"f")+o.size,"f");let l=Object.entries(e(this,a,"f"));for(;l.length&&e(this,n,"f")>e(this,i,"f").maxSize;){const t=l.reduce(((e,t)=>t[1].date<e[1].date?t:e),["null",o]);this.delete(t[0]),l=Object.entries(e(this,a,"f"))}o.timeout=setTimeout((()=>{this.delete(r)}),e(this,i,"f").ttl),e(this,a,"f")[r]=o}delete(i){const r=e(this,a,"f")[i];r&&(delete e(this,a,"f")[i],t(this,n,t(this,n,e(this,n,"f")-r.size,"f"),"f"),clearTimeout(r.timeout))}get(t){const n=e(this,a,"f")[t];if(n)return n.date=Date.now(),clearTimeout(n.timeout),n.timeout=setTimeout((()=>{this.delete(t)}),e(this,i,"f").ttl),n.value}}i=new WeakMap,a=new WeakMap,n=new WeakMap;new r({maxSize:5e3,ttl:3e5});const s=new r({maxSize:5e3,ttl:3e5}),o=(e,t)=>(async(e,t,i)=>{const a=await GM.xmlHttpRequest({method:e,url:t,fetch:!0,headers:i});return 200!==a.status?Promise.reject(a):JSON.parse(a.responseText)})(e,`https://api.myanimelist.net/v2/${t}`,{"X-MAL-CLIENT-ID":"96884d8bfed54d526cc619941f4398af"}),l=async e=>{const t=`anime/${e}?${new URLSearchParams({fields:"alternative_titles,related_anime{alternative_titles}"}).toString()}`,i=await o("GET",t);if(i)return i},d=async(e,t)=>{if(!(null==e?void 0:e.length))return[];let i=e.filter((e=>{var i,a;return e.node.title===t||(null===(a=null===(i=e.node.alternative_titles)||void 0===i?void 0:i.synonyms)||void 0===a?void 0:a.find((e=>e===t)))}));return 1===i.length?i:(i=e.filter((e=>{var i;return(null===(i=e.node.alternative_titles)||void 0===i?void 0:i.en)===t})),1===i.length?i:void 0)},c="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABSlBMVEUAAAAuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaI1VqU8Xag5W6cyVKQ1V6U3WaaQo87////6+/1YdLV5j8NrhL2InMrH0eby9Pm5xOC1wt7g5fE4WaZKaK709fqEmcjw8/gwU6OvvNvS2euquNleebh0jMGcrNOks9fo7PW3w9+hsdWdrtRferjx8/l9k8X9/f5ge7j+/v/v8fhzisEwUqN2jcKjs9bL0+jz9fpPbLHO1un4+vz3+PuKncva4O+ot9iBlseNoMyCl8e9yOE0VqXX3u20wd6sutpMaq/e5PC9yOJ1jML4+fxUcLPN1enFz+XBy+OvvdyisdXQ2Or19/vj6PNrg706W6f7/P2FmcnK0+fV3Oy4xN/h5vIvUqKuu9uaq9J+lMZLaa/8/P7d4vBbd7apt9n+PssoAAAAD3RSTlMBFYfT+dGDU/EX81X79c+4RnuEAAAAAWJLR0QXC9aYjwAAAAd0SU1FB+QKHwgGD8s9R/MAAAGYSURBVEjH7dZXV8IwFADgsIfjMsS4UGSIAxeIC/fGvReKWvf6/6/eJrVQT1uaB1883ock9+R+tE1PSQghxGZ3OKFmOF1uG2Hh8dau5uH1sHqr5XKgsFn+fXYNH3GL1APYiUsMOIiF9dGsFRGrB/gHvwUCwWAwpKQ4DIYrsyFMmwAi2EUqoJlS2tLKsjYc0nbFdkQ75bQLIIZdTAtodxyTRLICUqwaoyetC2gvQLiPfoN0P1VjQB/QDAxSFQyx0fDIaDabzRmAsfy4CiYmsZ+aLsxEo9FZMABqIJjDbn6BTy3qgiVeu8xBQr7ACpiB1TUG1jlIyd1GsVjcNAZb29juAAe71XdoAGAvSffjCjiwAuDw6BgUcGIJANZXgdOi+TMoKQdn2J6D+SppwAW2lz9A6UqOa32Qkd9MWQtY3JT1QbyE3a0OuGO3lJck6V4BOJRywF7EwyOfegJ4lpR4MfpEX9/o+4fQN/2ZDYAQKJj9CYjFnwCCW5ZfdFN0iW+7PtGNXfjoQEid3/ITe/hxBo8/9bWrGxrZ8ecLzYqyUsKHVC0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMTAtMzFUMDg6MDY6MTMrMDA6MDA+Vi6IAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTEwLTMxVDA4OjA2OjEzKzAwOjAwTwuWNAAAAABJRU5ErkJggg==";var u,A,h,f,v;class m{constructor(i){u.add(this),A.set(this,void 0),t(this,A,i,"f"),this.titleCreatedObserver=new MutationObserver(((t,i)=>{let a=null;for(const e of t){const t=Array.from(e.addedNodes);for(const e of t)if(e instanceof Element&&(a=e.querySelector(m.TITLE_SELECTOR),a))break;if(a)break}a&&(i.disconnect(),e(this,u,"m",v).call(this,a))})),this.titleChangeObserver=new MutationObserver(((t,i)=>{var a;const n=null===(a=t[0])||void 0===a?void 0:a.target.parentElement;n&&(i.disconnect(),e(this,u,"m",v).call(this,n))}))}async startService(){var t;const i=document.querySelector(m.TITLE_SELECTOR);if(i){if(null===(t=i.parentElement)||void 0===t?void 0:t.querySelector("a"))return;return void await e(this,u,"m",v).call(this,i)}const a=document.querySelector(m.BODY_SELECTOR);this.titleCreatedObserver.observe(null!=a?a:document.documentElement,{childList:!0})}}A=new WeakMap,u=new WeakSet,h=function(e){var t;const i=document.createElement("a");i.target="_blank",i.style.display="inline-block",i.style.fontSize="0",i.style.marginLeft="1.875rem";const a=document.createElement("img");return a.src=c,a.style.width="inherit",i.appendChild(a),null===(t=e.parentElement)||void 0===t||t.insertBefore(i,e.nextElementSibling),i},f=function(t){var i;const a=null===(i=t.parentElement)||void 0===i?void 0:i.querySelector("a");return a||e(this,u,"m",h).call(this,t)},v=async function(t){this.titleChangeObserver.observe(t,{attributes:!0,characterData:!0,childList:!0,subtree:!0});const i=t.textContent;if(!i)return;const a=await e(this,A,"f").call(this,i);if(!a)return;e(this,u,"m",f).call(this,t).href=a},m.TITLE_SELECTOR=".erc-series-hero > .body .title",m.BODY_SELECTOR=".app-body-wrapper";const w=async e=>{var t;const i=s.get(e);if(i)return i;const a=`anime?${new URLSearchParams({q:e.slice(0,60),limit:"25",fields:"alternative_titles"}).toString()}`,n=await o("GET",a);if(!(null===(t=null==n?void 0:n.data)||void 0===t?void 0:t.length))return;let r=await d(n.data,e);if(!(null==r?void 0:r.length)){const t=await l(n.data[0].node.id);r=await d(null==t?void 0:t.related_anime,e)}const c=(null==r?void 0:r.length)?r[0]:n.data[0],u=`https://myanimelist.net/anime/${c.node.id}/${c.node.title}`;return s.add(e,u),u};location.hostname.startsWith("beta.")?window.onload=async function(){const e=new m(w);await e.startService();let t=document.location.href;new MutationObserver((()=>{t!=document.location.href&&(t=document.location.href,t.match(/series\/[a-zA-Z-\d]+\/[a-zA-Z-\d]+$/)&&e.startService())})).observe(document.documentElement,{childList:!0,subtree:!0})}:$((async()=>{if(!$("#source_showview").length)return;const e=$("h1.ellipsis"),t=$("h1.ellipsis span").text(),i=await w(t);i&&e.append(`<a href="${i}" style="vertical-align: middle;"><img src="${c}" style='width: 17px; border: 0'></a>`)}))}();
