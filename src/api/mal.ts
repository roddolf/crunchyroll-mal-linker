import { request } from "./common";

export interface Search<T> {
  data: Array<{
    node: T;
  }>;
  pagination: {
    previous?: string;
    next?: string;
  };
}

export interface AnimeItem {
  id: number;
  title: string;
  alternative_titles?: {
    en?: string;
    ja?: string;
    synonyms?: Array<string>;
  };
}

const api_url = `https://api.myanimelist.net/v2`;
const mal_url = `https://myanimelist.net`;

export const searchAnime = async (name: string): Promise<string | undefined> => {
  const url = `${api_url}/anime?q=${encodeURI(name)}&limit=25&fields=alternative_titles`;

  const { data: animes } = await request<Search<AnimeItem>>("GET", url, {
    'X-MAL-CLIENT-ID': '96884d8bfed54d526cc619941f4398af',
  });
  if (!animes) return;

  // Find exact match
  let anime = animes.find(anime =>
    anime.node.title === name ||
    anime.node.alternative_titles?.en === name
  );

  // Use first one if no exact match found
  if (!anime) {
    anime = animes[0];
  }

  // Return if nothing found
  if (!anime) return;

  // Build url
  return `${mal_url}/anime/${anime.node.id}/${anime.node.title}`;
};