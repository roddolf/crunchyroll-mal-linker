import { Jikan, Mal } from './api';
import { LinkService } from './linkService';
import { MAL_ICON } from './resources/icon';

// Select API provider to use
// const searchAnime = Jikan.searchAnime;
const searchAnime = Mal.searchAnime;

// When is using beta version of the website
if (location.hostname.startsWith('beta.')) {
  window.onload = async function () {
    const linkService = new LinkService(searchAnime);
    await linkService.startService();

    // Create observer to restart link if needed
    let recordedHref = document.location.href;
    const locationObserver = new MutationObserver(() => {
      if (recordedHref != document.location.href) {
        // Update recorded Href
        recordedHref = document.location.href;

        // If in a series page
        if (recordedHref.match(/series\/[a-zA-Z-\d]+\/[a-zA-Z-\d]+$/)) {
          // Update link
          void linkService.startService();
        }
      }
    });
    locationObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }
}
// When in old website
else {
  window.onload = async () => {
    // Check in show page
    if (!document.querySelector("#source_showview")) return;

    // Get show title element
    const titleElement = document.querySelector('h1.ellipsis');
    if (!titleElement) return;

    // Get show name
    const name = titleElement.querySelector('span')?.textContent;
    if (!name) return;

    // Get show MAL URL
    const url = await searchAnime(name);
    if (!url) return;

    // Add link
    titleElement.insertAdjacentHTML('beforeend',
      `<a href="${url}" style="vertical-align: middle;">
        <img src="${MAL_ICON}" style='width: 17px; border: 0'>
      </a>`
    );
  };
}
