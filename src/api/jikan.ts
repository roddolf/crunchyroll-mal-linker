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

const api_url = `https://api.jikan.moe/v4`;

export const searchAnime = async (name: string): Promise<string | undefined> => {
  const url = `${api_url}/anime?q=${encodeURI(name)}&limit=25`;

  const { data: animes } = await request<Search<AnimeItem>>("GET", url);
  if (!animes) return;

  // Find exact match
  const anime = animes.find(anime => anime.titles.find(title => title.title === name));
  return anime?.url;
};