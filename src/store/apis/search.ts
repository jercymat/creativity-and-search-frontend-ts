import {
  SearchGetAPIPayload,
  SearchGetAPIResponse,
} from "../../model/api/search";
import { SearchResult } from "../../model/search";
import client from "./client";

const URL = "/searchresults";

const searchAPI = {
  get: (data: SearchGetAPIPayload): Promise<SearchGetAPIResponse | null> =>
    client
      .post(URL, data)
      .then((res) => res.data)
      .then(
        (data: any) =>
          <SearchGetAPIResponse>{
            ret: data.ret,
            results: data.searchlist.webPages.value.map(
              (v: any) =>
                <SearchResult>{
                  id: v.id,
                  title: v.name,
                  url: v.displayUrl,
                  description: v.snippet,
                }
            ),
            totalResults: data.searchlist.webPages.totalEstimatedMatches,
          }
      ),
};

export default searchAPI;
