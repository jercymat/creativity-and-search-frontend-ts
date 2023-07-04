import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorActionPayload } from "../../model/common";

interface GlobalState {
  errorToast: {
    show: boolean;
    message: string;
  },
  searchMapperWidth: number,
}

const initialState: GlobalState = {
  errorToast: {
    show: false,
    message: '',
  },
  searchMapperWidth: 400,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    showErrorToast(state, action: PayloadAction<ErrorActionPayload>) {
      state.errorToast.show = true;
      state.errorToast.message = action.payload.error;
    },
    closeErrorToast(state) {
      state.errorToast.show = false;
    },
    updateSearchMapperWidth(state, action: PayloadAction<number>) {
      state.searchMapperWidth = action.payload;
    },
  }
});

export const globalActions = globalSlice.actions;

export default globalSlice.reducer;