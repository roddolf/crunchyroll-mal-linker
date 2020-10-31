// ==UserScript==
// @name         Crunchy/MAL linker
// @namespace    https://github.com/roddolf/scripts
// @version      1.3.0
// @description  Add links into Crunchyroll for MAL anime library.
// @author       Rodolfo Aguirre
// @include      /^https?://www.crunchyroll.com/([a-z-]+/)?[a-zA-Z-\d]+$/
// @include      /^https?://beta.crunchyroll.com/([a-z-]+/)?series/[a-zA-Z-\d]+/[a-zA-Z-\d]+$/
// @updateURL    https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/script.meta.js
// @downloadURL  https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/dist/script.user.js
// ==/UserScript==
!function(){"use strict";var e=window&&window.__awaiter||function(e,t,A,n){return new(A||(A=Promise))((function(o,i){function r(e){try{a(n.next(e))}catch(e){i(e)}}function s(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof A?t:new A((function(e){e(t)}))).then(r,s)}a((n=n.apply(e,t||[])).next())}))};const t="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABSlBMVEUAAAAuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaI1VqU8Xag5W6cyVKQ1V6U3WaaQo87////6+/1YdLV5j8NrhL2InMrH0eby9Pm5xOC1wt7g5fE4WaZKaK709fqEmcjw8/gwU6OvvNvS2euquNleebh0jMGcrNOks9fo7PW3w9+hsdWdrtRferjx8/l9k8X9/f5ge7j+/v/v8fhzisEwUqN2jcKjs9bL0+jz9fpPbLHO1un4+vz3+PuKncva4O+ot9iBlseNoMyCl8e9yOE0VqXX3u20wd6sutpMaq/e5PC9yOJ1jML4+fxUcLPN1enFz+XBy+OvvdyisdXQ2Or19/vj6PNrg706W6f7/P2FmcnK0+fV3Oy4xN/h5vIvUqKuu9uaq9J+lMZLaa/8/P7d4vBbd7apt9n+PssoAAAAD3RSTlMBFYfT+dGDU/EX81X79c+4RnuEAAAAAWJLR0QXC9aYjwAAAAd0SU1FB+QKHwgGD8s9R/MAAAGYSURBVEjH7dZXV8IwFADgsIfjMsS4UGSIAxeIC/fGvReKWvf6/6/eJrVQT1uaB1883ock9+R+tE1PSQghxGZ3OKFmOF1uG2Hh8dau5uH1sHqr5XKgsFn+fXYNH3GL1APYiUsMOIiF9dGsFRGrB/gHvwUCwWAwpKQ4DIYrsyFMmwAi2EUqoJlS2tLKsjYc0nbFdkQ75bQLIIZdTAtodxyTRLICUqwaoyetC2gvQLiPfoN0P1VjQB/QDAxSFQyx0fDIaDabzRmAsfy4CiYmsZ+aLsxEo9FZMABqIJjDbn6BTy3qgiVeu8xBQr7ACpiB1TUG1jlIyd1GsVjcNAZb29juAAe71XdoAGAvSffjCjiwAuDw6BgUcGIJANZXgdOi+TMoKQdn2J6D+SppwAW2lz9A6UqOa32Qkd9MWQtY3JT1QbyE3a0OuGO3lJck6V4BOJRywF7EwyOfegJ4lpR4MfpEX9/o+4fQN/2ZDYAQKJj9CYjFnwCCW5ZfdFN0iW+7PtGNXfjoQEid3/ITe/hxBo8/9bWrGxrZ8ecLzYqyUsKHVC0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMTAtMzFUMDg6MDY6MTMrMDA6MDA+Vi6IAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTEwLTMxVDA4OjA2OjEzKzAwOjAwTwuWNAAAAABJRU5ErkJggg==",A=t=>e(void 0,void 0,void 0,(function*(){const e=`https://myanimelist.net/search/prefix.json?type=anime&keyword=${encodeURI(t)}&v=1`,{categories:[{items:[A]}]}=yield n("GET",e);if(A)return A.url})),n=(t,A)=>e(void 0,void 0,void 0,(function*(){const e=new Request("https://cors-anywhere.herokuapp.com/"+A,{method:t}),n=yield fetch(e);return 200!==n.status?Promise.reject(n):n.json()}));var o;location.hostname.startsWith("beta.")?(o=".erc-series-hero > .body > .title",e(void 0,void 0,void 0,(function*(){return document.querySelector(o)||new Promise((e=>{new MutationObserver(((t,A)=>{const n=document.querySelector(o);n&&(A.disconnect(),e(n))})).observe(document.documentElement,{childList:!0,subtree:!0})}))}))).then((n=>e(void 0,void 0,void 0,(function*(){var e;const o=n.textContent;if(!o)return;const i=yield A(o);if(!i)return;const r=document.createElement("a");r.href=i,r.style.display="inline-block",r.style.marginBottom="10px";const s=document.createElement("img");s.src=t,s.style.width="25px",r.appendChild(s),null===(e=n.parentElement)||void 0===e||e.insertBefore(r,n.nextElementSibling)})))):$((()=>e(void 0,void 0,void 0,(function*(){if(!$("#source_showview").length)return;const e=$("h1.ellipsis"),n=$("h1.ellipsis span").text(),o=yield A(n);o&&e.append(`<a href="${o}" style="vertical-align: middle;"><img src="${t}" style='width: 17px; border: 0'></a>`)}))))}();
