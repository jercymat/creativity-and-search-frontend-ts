export interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface Search {
  keyword: string;
  page: number;
  totalResults: number;
  results: SearchResult[];
}
