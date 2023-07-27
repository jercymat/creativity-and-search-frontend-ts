import { BaseResult } from "./common";

export interface SearchResult extends BaseResult {}

export interface Search {
  keyword: string;
  page: number;
  totalResults: number;
  results: SearchResult[];
}
