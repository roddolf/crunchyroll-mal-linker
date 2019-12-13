const mal_url = "https://myanimelist.net/";

function searchAnime(name) {
    const url = `https://myanimelist.net/search/prefix.json?type=anime&keyword=${ encodeURI( name ) }&v=1`;
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

const cors_api_url = "https://cors-anywhere.herokuapp.com/";

const fetchData = (method, url) => {
    const request = new Request(cors_api_url + url, {
        method
    });
    return fetch(request).then(response => {
        if (response.status !== 200) return Promise.reject(response);
        return response.json();
    });
};

$(document).ready(() => {
    if (!$("#source_showview").length) return;

    const $title = $("h1.ellipsis");
    const name = $("h1.ellipsis span").text();
    searchAnime(name).then(url => {
        if (!url) return;

        $title.append(`<a href="${ url }" style="vertical-align: middle;"><img src="https://myanimelist.cdn-dena.com/images/faviconv5.ico"></a>`);
    });
});