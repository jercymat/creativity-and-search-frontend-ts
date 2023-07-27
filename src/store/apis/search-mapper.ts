/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SMAddAPIPayload,
  SMAddAPIResponse,
  SMCreateThemeAPIReponse,
  SMLoadAPIResponse,
} from "../../model/api/search-mapper";
import { BaseAPIResponse } from "../../model/common";
import {
  SearchMapperResult,
  SearchMapperTheme,
} from "../../model/search-mapper";
import client from "./client";

const SEARCH_URL = "/searchresults";
const THEME_URL = "/groups";
const NOTE_URL = "/notes";

const searchMapperAPI = {
  load: (): Promise<SMLoadAPIResponse | null> =>
    client
      .post(THEME_URL, {
        action: "list_group",
      })
      .then((res) => res.data)
      .then(
        (data: any) =>
          <SMLoadAPIResponse>{
            ret: data.ret,
            relist: data.relist.map(
              (theme: any) =>
                <SearchMapperTheme>{
                  id: theme.id,
                  name: theme.name,
                  note: theme.note.length != 0 ? theme.note[0].title : "",
                  noteID: theme.note.length != 0 ? theme.note[0].id : -1,
                  searchResultList: theme.searchResultList.map(
                    (r: any) =>
                      <SearchMapperResult>{
                        id: r.id,
                        title: r.name,
                        url: r.url,
                        description: r.snippet,
                      }
                  ),
                }
            ),
          }
      ),
  add: (data: SMAddAPIPayload): Promise<SMAddAPIResponse | null> =>
    client
      .post(SEARCH_URL, data)
      .then((res) => res.data)
      .then(
        (data: any) =>
          <SMAddAPIResponse>{ ret: data.ret, resultID: data.searchResult_id }
      ),
  delete: (id: string): Promise<BaseAPIResponse | null> =>
    client
      .post(SEARCH_URL, {
        action: "delete_searchresult",
        searchResultId: id,
      })
      .then((res) => res.data)
      .then((data: any) => <BaseAPIResponse>{ ret: data.ret }),
  createTheme: (themeName: string): Promise<SMCreateThemeAPIReponse | null> =>
    client
      .post(THEME_URL, {
        action: "add_group",
        name: themeName,
      })
      .then((res) => res.data)
      .then(
        (data: any) =>
          <SMCreateThemeAPIReponse>{ ret: data.ret, themeID: data.groupid }
      ),
  changeTheme: (data: {
    resultID: number;
    toThemeID: number;
  }): Promise<BaseAPIResponse | null> =>
    client
      .post(SEARCH_URL, {
        action: "change_group",
        searchResultId: data.resultID,
        groupId: data.toThemeID,
        content: "",
      })
      .then((res) => res.data)
      .then((data: any) => <BaseAPIResponse>{ ret: data.ret }),
  deleteTheme: (themeID: number): Promise<BaseAPIResponse | null> =>
    client
      .post(THEME_URL, {
        action: "delete_group",
        groupId: themeID,
      })
      .then((res) => res.data)
      .then((data: any) => <BaseAPIResponse>{ ret: data.ret }),
  renameTheme: (data: {
    themeID: number;
    name: string;
  }): Promise<BaseAPIResponse | null> =>
    client
      .post(THEME_URL, {
        action: "modify_group",
        groupId: data.themeID,
        name: data.name,
      })
      .then((res) => res.data)
      .then((data: any) => <BaseAPIResponse>{ ret: data.ret }),
  addThemeNote: (data: {
    themeID: number;
    content: string;
  }): Promise<BaseAPIResponse | null> =>
    client
      .post(NOTE_URL, {
        action: "add_note",
        groupId: data.themeID,
        title: data.content,
        content: "",
      })
      .then((res) => res.data)
      .then((data: any) => <BaseAPIResponse>{ ret: data.ret }),
  editThemeNote: (data: {
    themeID: number;
    noteID: number;
    content: string;
  }): Promise<BaseAPIResponse | null> =>
    client
      .post(NOTE_URL, {
        action: "modify_note",
        groupId: data.themeID,
        noteId: data.noteID,
        title: data.content,
        content: "",
      })
      .then((res) => res.data)
      .then((data: any) => <BaseAPIResponse>{ ret: data.ret }),
};

export default searchMapperAPI;
