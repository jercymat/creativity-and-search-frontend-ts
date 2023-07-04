import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Search } from "../../model/search";

export interface LoadSearchPayload {
  keyword: string;
  currentPage: number;
}

interface SearchState {
  loading: boolean;
  search: Search;

  // stat
  statOfQueryID: number[];
  currentQueryID: number;
}

const initialState: SearchState = {
  loading: false,
  search: {
    keyword: "",
    page: 1,
    totalResults: 0,
    results: [],
  },

  // stat
  statOfQueryID: [],
  currentQueryID: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // defined payload but only used for sagas
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadSearch(state, action: PayloadAction<LoadSearchPayload>) {
      state.loading = true;
    },
    loadSearchSuccess(state, action: PayloadAction<Search>) {
      state.loading = false;
      state.search = action.payload;
    },
    loadSearchFailure(state) {
      state.loading = false;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
