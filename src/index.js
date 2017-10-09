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
    const url = `${ mal_url }api/anime/search.xml?q=${ encodeURI( name ) }`;
    return fetchData("GET", url).then(data => {
        const anime = data.anime.entry[0];
        return `${ mal_url }anime/${ anime.id }/`;
    }).catch(response => {
        if (!response.status) return;

        const lastSpace = name.lastIndexOf(" ");
        if (lastSpace !== -1) return searchAnime(name.substring(0, lastSpace));
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
        .then(response => {
            if (response.status !== 200) return Promise.reject(response);
            return response.text();
        })
        .then(parseXML);
}

const parseXML = (xml) => new Promise((resolve, reject) => {
    parseString(xml, (error, result) => {
        if (error) reject(error);
        resolve(result);
    })
});

$(document).ready(() => {
    if (!$("#source_showview").length) return;

    const $title = $("h1.ellipsis");
    const name = $("h1.ellipsis span").text();
    searchAnime(name).then(url => {
        if (!url) return;

        $title.append(`<a href="${ url }" style="vertical-align: middle;"><img src="https://myanimelist.cdn-dena.com/images/faviconv5.ico"></a>`);
    });
});