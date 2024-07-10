/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMLoadAPIResponse } from "../../model/api/idea-mapper";
import { BaseAPIResponse } from "../../model/common";
import client from "./client";

const GRAPH_URL = "/graphs";

const ideaMapperAPI = {
  loadGraph: (): Promise<IMLoadAPIResponse | null> =>
    client
      .post(GRAPH_URL, {
        action: "list_graph",
      })
      .then((res) => res.data)
      .then(
        (data: any) =>
          <IMLoadAPIResponse>{
            ret: data.ret,
            graph: JSON.parse(
              data.relist[0].xml == ""
                ? '{"nodes":[],"edges":[]}'
                : data.relist[0].xml
            ),
          }
      ),
  saveGraph: (stringGraph: string): Promise<BaseAPIResponse | null> =>
    client
      .post(GRAPH_URL, {
        action: "modify_graph",
        id: 1,
        newdata: {
          name: "TestGraph",
          xml: stringGraph,
        },
      })
      .then((res) => res.data)
      .then((data: any) => <BaseAPIResponse>{ ret: data.ret }),
};

export default ideaMapperAPI;
