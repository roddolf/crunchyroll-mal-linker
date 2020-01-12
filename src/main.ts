// ==UserScript==
// @namespace    http://tampermonkey.net/
// @name         Crunchy/MAL linker
// @version      1.0.1
// @description  Add links into Crunchyroll for MAL anime library.
// @author       roddolf
// 
// @include      /^http://www.crunchyroll.com/[a-zA-Z-\d]+$/
//
// @updateURL   https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/dist/index.js
// @downloadURL https://raw.githubusercontent.com/roddolf/crunchyroll-mal-linker/master/dist/index.js
// ==/UserScript==


const mal_url = "https://myanimelist.net/";
const mal_icon = "https://myanimelist.cdn-dena.com/images/faviconv5.ico";
const cors_api_url = "https://cors-anywhere.herokuapp.com/";

function searchAnime(name: string) {
    const url = `https://myanimelist.net/search/prefix.json?type=anime&keyword=${encodeURI(name)}&v=1`;
    return fetchData("GET", url).then(data => {
        const {
            categories: [{
                items: [anime],
            }]
        } = data;

        if (!anime) return;

        return anime.url;
    });
}

const fetchData = async (method: string, url: string) => {
    const request = new Request(cors_api_url + url, {
        method
    });

    const response = await fetch(request);
    if (response.status !== 200) return Promise.reject(response);

    return response.json();
};

$(document).ready(async () => {
    if (!$("#source_showview").length) return;

    const $title = $("h1.ellipsis");
    const name = $("h1.ellipsis span").text();

    const url = await searchAnime(name);
    if (!url) return;

    $title.append(`<a href="${url}" style="vertical-align: middle;"><img src="${mal_icon}"></a>`);
});
