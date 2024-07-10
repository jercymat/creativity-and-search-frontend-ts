import { BaseAPIResponse } from "../common";
import { IdeaMapperGraph } from "../idea-mapper";

export interface IMLoadAPIResponse extends BaseAPIResponse {
  graph: IdeaMapperGraph;
}
