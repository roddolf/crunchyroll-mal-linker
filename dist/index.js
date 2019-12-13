/**
// ==UserScript==
// @namespace    http://tampermonkey.net/
// @name         Crunchy/MAL linker
// @version      0.1
// @description  Add links into Crunchyroll for MAL anime library.
// @author       roddolf
// 
// @include      /^http://www.crunchyroll.com/[a-zA-Z-\d]+$/
// ==/UserScript==
**/;

(function () {
    "use strict";

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var mal_url = "https://myanimelist.net/";

    function searchAnime(name) {
        var url = "https://myanimelist.net/search/prefix.json?type=anime&keyword=" + encodeURI(name) + "&v=1";
        return fetchData("GET", url).then(function (data) {
            var _data$categories = _slicedToArray(data.categories, 1),
                _data$categories$0$it = _slicedToArray(_data$categories[0].items, 1),
                anime = _data$categories$0$it[0];

            if (!anime) return;

            return anime.url;
        });
    }

    var cors_api_url = "https://cors-anywhere.herokuapp.com/";

    var fetchData = function fetchData(method, url) {
        var request = new Request(cors_api_url + url, {
            method: method
        });
        return fetch(request).then(function (response) {
            if (response.status !== 200) return Promise.reject(response);
            return response.json();
        });
    };

    $(document).ready(function () {
        if (!$("#source_showview").length) return;

        var $title = $("h1.ellipsis");
        var name = $("h1.ellipsis span").text();
        searchAnime(name).then(function (url) {
            if (!url) return;

            $title.append("<a href=\"" + url + "\" style=\"vertical-align: middle;\"><img src=\"https://myanimelist.cdn-dena.com/images/faviconv5.ico\"></a>");
        });
    });
})();
//# sourceMappingURL=index.js.map