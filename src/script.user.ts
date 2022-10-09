// import { Jikan, } from './api/jikan';
// import { Mal } from './api/mal';
import { Jikan, Mal } from './api';
import { MAL_ICON } from './resources/icon';

// Select API provider to use
// const searchAnime = Jikan.searchAnime;
const searchAnime = Mal.searchAnime;

const getElement = async (selector: string): Promise<Element> => {
  // Check if element already loaded
  const existingElement = document.querySelector(selector);
  if (existingElement) {
    return existingElement;
  }

  // Wait element to load
  const loadedElement = await new Promise<Element>((resolve) => {
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (!element) return;

      observer.disconnect();
      resolve(element);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
  return loadedElement;
};

const addMalLink = async ($title: Element): Promise<void> => {
  // Validate if already added
  if ($title.parentElement?.querySelector('a')) {
    return;
  }

  const name = $title.textContent;
  if (!name) return;

  const url = await searchAnime(name);
  if (!url) return;

  const $malLink = document.createElement('a');
  $malLink.href = url;
  $malLink.target = '_blank';
  $malLink.style.display = 'inline-block';
  $malLink.style.fontSize = '0';
  $malLink.style.marginLeft = '1.875rem';

  const $malImg = document.createElement('img');
  $malImg.src = MAL_ICON;
  $malImg.style.width = 'inherit';
  $malLink.appendChild($malImg);

  $title.parentElement?.insertBefore($malLink, $title.nextElementSibling);
};

const findTitleAndAddLink = async (): Promise<void> => {
  const $title = await getElement(`.erc-series-hero > .body .title`);
  await addMalLink($title);
};

const updateOnPageChange = () => {
  let recordedHref = document.location.href;
  const observer = new MutationObserver(() => {
    if (recordedHref != document.location.href) {
      // Update recorded Href
      recordedHref = document.location.href;

      // If in a series page
      if (recordedHref.match(/series\/[a-zA-Z-\d]+\/[a-zA-Z-\d]+$/)) {
        // Update link
        void findTitleAndAddLink();
      }

    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
};

// When is using beta version of the website
if (location.hostname.startsWith('beta.')) {
  window.onload = function () {
    void findTitleAndAddLink();
    updateOnPageChange();
  }
}
// When in old website
else {
  $(async () => {
    if (!$("#source_showview").length) return;

    const $title = $("h1.ellipsis");
    const name = $("h1.ellipsis span").text();

    const url = await searchAnime(name);
    if (!url) return;

    $title.append(`<a href="${url}" style="vertical-align: middle;"><img src="${MAL_ICON}" style='width: 17px; border: 0'></a>`);
  });
}
