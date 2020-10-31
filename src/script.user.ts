const mal_url = `https://myanimelist.net/search/prefix.json`;
const mal_icon = `https://cdn.myanimelist.net/images/faviconv5.ico`;
const cors_api_url = `https://cors-anywhere.herokuapp.com/`;

const searchAnime = async (name: string) => {
    const url = `${mal_url}?type=anime&keyword=${encodeURI(name)}&v=1`;

    const { categories: [{ items: [anime], }] } = await fetchData("GET", url);
    if (!anime) return;

    return anime.url;
};

const fetchData = async (method: string, url: string) => {
    const request = new Request(cors_api_url + url, { method });
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
