import { BaseAPIPayload } from "../common";
import { SearchResult } from "../search";

export interface SearchGetAPIPayload extends BaseAPIPayload {
  keyword: string;
  count: string;
  offset: string;
}

export interface SearchGetAPIResponse {
  ret: number;
  results: SearchResult[];
  totalResults: number;
}
