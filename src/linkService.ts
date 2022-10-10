import { MAL_ICON } from "./resources/icon";

export type SearchAnime = (name: string) => Promise<string | undefined>;

export class LinkService {

  static TITLE_SELECTOR = `.erc-series-hero > .body .title`;
  static BODY_SELECTOR = `.app-body-wrapper`;

  readonly titleChangeObserver: MutationObserver;
  readonly titleCreatedObserver: MutationObserver;

  #searchAnime: SearchAnime;

  constructor(searchAnime: SearchAnime) {
    this.#searchAnime = searchAnime;

    // Observer for title creation
    this.titleCreatedObserver = new MutationObserver((mutations, observer) => {
      let titleElement: Element | null = null;
      for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);

        // Check and return if added title element
        for (const node of addedNodes) {
          if (!(node instanceof Element)) continue;

          // Check if added element has the title
          titleElement = node.querySelector(LinkService.TITLE_SELECTOR);

          // If found stop search
          if (titleElement) break;
        }

        // If found stop search
        if (titleElement) break;
      };

      if (titleElement) {
        // Stop observing
        observer.disconnect();
        // Update link
        void this.#addLink(titleElement);
      }
    });

    // Observer for title changes
    this.titleChangeObserver = new MutationObserver((mutations, observer) => {
      const titleElement = mutations[0]?.target.parentElement;
      if (titleElement) {
        // Stop observing
        observer.disconnect();
        // Update link
        void this.#addLink(titleElement);
      }
    });
  }


  #createLinkElement(titleElement: Element): HTMLAnchorElement {
    // Create link element
    const linkElement = document.createElement('a');
    linkElement.target = '_blank';
    linkElement.style.display = 'inline-block';
    linkElement.style.fontSize = '0';
    linkElement.style.marginLeft = '1.875rem';

    // Create the MAL image
    const linkImgElement = document.createElement('img');
    linkImgElement.src = MAL_ICON;
    linkImgElement.style.width = 'inherit';
    linkElement.appendChild(linkImgElement);

    // Add link to the title
    titleElement.parentElement?.insertBefore(linkElement, titleElement.nextElementSibling);

    // Return link
    return linkElement;
  }

  #getLinkElement(titleElement: Element): HTMLAnchorElement {
    const linkElement = titleElement.parentElement?.querySelector('a');
    if (linkElement) return linkElement;

    return this.#createLinkElement(titleElement);
  }

  async #addLink(titleElement: Element): Promise<void> {
    // Start observer for title changes
    this.titleChangeObserver.observe(titleElement, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });

    // Get the anime name
    const name = titleElement.textContent;
    if (!name) return;

    // Get the anime URL
    const url = await this.#searchAnime(name);
    if (!url) return;

    // Get existing link or create a new one
    const linkElement = this.#getLinkElement(titleElement);

    // Add the anime URL
    linkElement.href = url;
  }

  async startService(): Promise<void> {
    // Check if title exists
    const titleElement = document.querySelector(LinkService.TITLE_SELECTOR);
    if (titleElement) {
      // If link already added change observer will update it
      if (titleElement.parentElement?.querySelector('a')) return;

      // Add new link
      await this.#addLink(titleElement);
      return;
    }

    // Observe in case title is added later
    const body = document.querySelector(LinkService.BODY_SELECTOR);
    this.titleCreatedObserver.observe(body ?? document.documentElement, {
      childList: true,
    });
  }

}