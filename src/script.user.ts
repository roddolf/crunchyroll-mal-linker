const mal_url = `https://api.jikan.moe/v4/anime`;
const mal_icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABSlBMVEUAAAAuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaIuUaI1VqU8Xag5W6cyVKQ1V6U3WaaQo87////6+/1YdLV5j8NrhL2InMrH0eby9Pm5xOC1wt7g5fE4WaZKaK709fqEmcjw8/gwU6OvvNvS2euquNleebh0jMGcrNOks9fo7PW3w9+hsdWdrtRferjx8/l9k8X9/f5ge7j+/v/v8fhzisEwUqN2jcKjs9bL0+jz9fpPbLHO1un4+vz3+PuKncva4O+ot9iBlseNoMyCl8e9yOE0VqXX3u20wd6sutpMaq/e5PC9yOJ1jML4+fxUcLPN1enFz+XBy+OvvdyisdXQ2Or19/vj6PNrg706W6f7/P2FmcnK0+fV3Oy4xN/h5vIvUqKuu9uaq9J+lMZLaa/8/P7d4vBbd7apt9n+PssoAAAAD3RSTlMBFYfT+dGDU/EX81X79c+4RnuEAAAAAWJLR0QXC9aYjwAAAAd0SU1FB+QKHwgGD8s9R/MAAAGYSURBVEjH7dZXV8IwFADgsIfjMsS4UGSIAxeIC/fGvReKWvf6/6/eJrVQT1uaB1883ock9+R+tE1PSQghxGZ3OKFmOF1uG2Hh8dau5uH1sHqr5XKgsFn+fXYNH3GL1APYiUsMOIiF9dGsFRGrB/gHvwUCwWAwpKQ4DIYrsyFMmwAi2EUqoJlS2tLKsjYc0nbFdkQ75bQLIIZdTAtodxyTRLICUqwaoyetC2gvQLiPfoN0P1VjQB/QDAxSFQyx0fDIaDabzRmAsfy4CiYmsZ+aLsxEo9FZMABqIJjDbn6BTy3qgiVeu8xBQr7ACpiB1TUG1jlIyd1GsVjcNAZb29juAAe71XdoAGAvSffjCjiwAuDw6BgUcGIJANZXgdOi+TMoKQdn2J6D+SppwAW2lz9A6UqOa32Qkd9MWQtY3JT1QbyE3a0OuGO3lJck6V4BOJRywF7EwyOfegJ4lpR4MfpEX9/o+4fQN/2ZDYAQKJj9CYjFnwCCW5ZfdFN0iW+7PtGNXfjoQEid3/ITe/hxBo8/9bWrGxrZ8ecLzYqyUsKHVC0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMTAtMzFUMDg6MDY6MTMrMDA6MDA+Vi6IAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTEwLTMxVDA4OjA2OjEzKzAwOjAwTwuWNAAAAABJRU5ErkJggg==`;

interface Search<T> {
    data: T[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        current_page: number;
        items: {
            count: number;
            total: number;
            per_page: number;
        };
    };
}

interface AnimeItem {
    mal_id: number;
    url: string;
}

const searchAnime = async (name: string) => {
    const url = `${mal_url}?q=${encodeURI(name)}&limit=1`;

    const { data: [anime] } = await fetchData<Search<AnimeItem>>("GET", url);
    if (!anime) return;

    return anime.url;
};

const fetchData = async <T>(method: 'GET' | 'HEAD' | 'POST', url: string): Promise<T> => {
    const responseText = await new Promise<string>((resolve, reject) => {
        GM_xmlhttpRequest({
            method,
            url,
            fetch: true,
            onload: (response) => {
                if (response.status !== 200) {
                    reject(response);
                }
                else {
                    resolve(response.responseText);
                }
            },
        });
    });

    const body = JSON.parse(responseText);
    return body;
};

const elementReady = async (selector: string): Promise<Element> => {
    const element = document.querySelector(selector);
    if (element) return element;

    return new Promise(resolve => {
        const observer = new MutationObserver((_, observer) => {
            const element = document.querySelector(selector);

            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

// When is using beta version of the website
if (location.hostname.startsWith('beta.')) {
    elementReady(`.erc-series-hero > .body .title`)
        .then(async $title => {
            const name = $title.textContent;
            if (!name) return;

            const url = await searchAnime(name);
            if (!url) return;

            const $malLink = document.createElement('a');
            $malLink.href = url;
            $malLink.style.display = 'inline-block';
            $malLink.style.fontSize = '0';
            $malLink.style.marginLeft = '1.875rem';

            const $malImg = document.createElement('img');
            $malImg.src = mal_icon;
            $malImg.style.width = 'inherit';
            $malLink.appendChild($malImg);

            $title.parentElement?.insertBefore($malLink, $title.nextElementSibling);
        });
}
// When in public website
else {
    $(async () => {
        if (!$("#source_showview").length) return;

        const $title = $("h1.ellipsis");
        const name = $("h1.ellipsis span").text();

        const url = await searchAnime(name);
        if (!url) return;

        $title.append(`<a href="${url}" style="vertical-align: middle;"><img src="${mal_icon}" style='width: 17px; border: 0'></a>`);
    });
}
