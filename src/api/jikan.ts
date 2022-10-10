import { UrlCache } from "./caching";
import { request } from "./common";

export interface Search<T> {
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

export interface AnimeItem {
  mal_id: number;
  url: string;
  titles: Array<{
    type: string;
    title: string;
  }>;
}

const cache = new UrlCache({
  maxSize: 5000,
  ttl: 1000 * 60 * 5,
});

const api_url = `https://api.jikan.moe/v4`;

export const searchAnime = async (name: string): Promise<string | undefined> => {
  // Check cache
  const cachedURL = cache.get(name);
  if (cachedURL) return cachedURL;

  const url = `${api_url}/anime?q=${encodeURI(name)}&limit=25`;

  const { data: animes } = await request<Search<AnimeItem>>("GET", url);
  if (!animes) return;

  // Find exact match
  const anime = animes.find(anime => anime.titles.find(title => title.title === name));
  if (!anime) return 

  // Add to cache
  cache.add(name, anime.url);

  // Return URL
  return anime.url;
};