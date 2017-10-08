import {
    parseString
} from "xml2js";

const config = {
    credentials: {
        user: "***",
        pass: "***",
    },
};

const mal_url = "https://myanimelist.net/";

function searchAnime(name) {
    name = name.toLowerCase();

    const url = `${ mal_url }api/anime/search.xml?q=${ encodeURI( name ) }`;
    return fetchData("GET", url).then(data => {
        const anime = data.anime.entry[0];
        return `${ mal_url }anime/${ anime.id }/`;
    });
}

const cors_api_url = "https://cors-anywhere.herokuapp.com/";

const fetchData = (method, url) => {
    const request = new Request(cors_api_url + url, {
        method,
        headers: {
            "Authorization": `Basic ${ btoa(`${config.credentials.user}:${config.credentials.pass}`) }`,
        },
        mode: "cors",
    });
    return fetch(request)
        .then(response => response.text())
        .then(parseXML)
        .catch(console.warn);
}

const parseXML = (xml) => new Promise((resolve, reject) => {
    if (!xml) return reject();

    parseString(xml, (error, result) => {
        if (error) reject(reject);
        resolve(result);
    })
});

$(document).ready(() => {
    const $title = $("h1.ellipsis");
    const name = $("h1.ellipsis span").text();
    searchAnime(name).then(url => {
        $title.append(`<a href="${ url }" style="vertical-align: middle;"><img src="https://myanimelist.cdn-dena.com/images/faviconv5.ico"></a>`);
        // console.log(url);
    });
});