import { BaseAPIPayload, BaseAPIResponse } from "../common";
import { SearchMapperTheme } from "../search-mapper";

export interface SMLoadAPIResponse extends BaseAPIResponse {
  relist: SearchMapperTheme[];
}

export interface SMAddAPIPayload extends BaseAPIPayload {
  data: {
    name: string;
    url: string;
    snippet: string;
  };
}

export interface SMAddAPIResponse extends BaseAPIResponse {
  resultID: number;
}

export interface SMCreateThemeAPIReponse extends BaseAPIResponse {
  themeID: number;
}
