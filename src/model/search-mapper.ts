import { BaseResult } from "./common";

export interface SearchMapperResult extends BaseResult {}

export interface SearchMapperTheme {
  id: number;
  name: string;
  note: string;
  noteID: number;
  searchResultList: SearchMapperResult[];
}
