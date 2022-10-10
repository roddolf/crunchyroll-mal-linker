import { request } from "./common";

export interface DataNode<T> {
  node: T;
}

export interface Search<T> {
  data: Array<DataNode<T>>;
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
  related_anime?: Array<RelatedAnime>;
}

export type SearchAnime = Search<Pick<AnimeItem, 'id' | 'title' | 'alternative_titles'>>;

export interface RelatedAnime extends DataNode<AnimeItem> {
  relation_type?: string;
}

const api_url = `https://api.myanimelist.net/v2`;
const mal_url = `https://myanimelist.net`;

const requestMal = <T>(method: 'GET' | 'HEAD' | 'POST', url: string) => request<T>(method, `${api_url}/${url}`, {
  'X-MAL-CLIENT-ID': '96884d8bfed54d526cc619941f4398af',
});

export const searchAnime = async (name: string): Promise<string | undefined> => {
  const query = new URLSearchParams({
    q: name.slice(0, 65),
    limit: '25',
    fields: 'alternative_titles',
  });
  const url = `anime?${query.toString()}`;
  const result = await requestMal<SearchAnime>('GET', url);
  if (!result?.data?.length) return;

  let foundAnimes = await findAnimeByName(result.data, name);

  // If no exact match found, check if first one has a related match
  if (!foundAnimes?.length) {
    const mostRelatedAnime = await getAnime(result.data[0].node.id);
    foundAnimes = await findAnimeByName(mostRelatedAnime?.related_anime, name);
  }

  // Select better match
  const anime = foundAnimes?.length
    ? foundAnimes[0]
    : result.data[0];

  // Build url
  return `${mal_url}/anime/${anime.node.id}/${anime.node.title}`;
};

export const getAnime = async (id: number): Promise<AnimeItem | undefined> => {
  const query = new URLSearchParams({
    fields: 'alternative_titles,related_anime{alternative_titles}',
  });
  const url = `anime/${id}?${query.toString()}`;
  const result = await requestMal<AnimeItem>('GET', url);
  if (!result) return;

  return result;
}

const findAnimeByName = async (animes: DataNode<AnimeItem>[] | undefined, name: string): Promise<DataNode<AnimeItem>[] | undefined> => {
  // Return if nothing provided
  if (!animes?.length) return [];

  // Find options with related name
  let foundAnimes = animes.filter(anime =>
    anime.node.title === name ||
    anime.node.alternative_titles?.synonyms?.find(x => x === name)
  );
  if (foundAnimes.length === 1) return foundAnimes;

  // Look for exact name if more than one
  foundAnimes = animes.filter(anime =>
    anime.node.alternative_titles?.en === name
  );
  if (foundAnimes.length === 1) return foundAnimes;

  // No match found
  return undefined;
}
