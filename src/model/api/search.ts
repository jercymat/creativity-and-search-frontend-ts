import { BaseAPIPayload, BaseAPIResponse } from "../common";
import { SearchResult } from "../search";

export interface SearchGetAPIPayload extends BaseAPIPayload {
  keyword: string;
  count: string;
  offset: string;
}

export interface SearchGetAPIResponse extends BaseAPIResponse {
  results: SearchResult[];
  totalResults: number;
}
