import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorActionPayload } from "../../model/common";

interface GlobalState {
  errorToast: {
    show: boolean;
    message: string;
  },
}

const initialState: GlobalState = {
  errorToast: {
    show: false,
    message: '',
  },
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
  }
});

export const globalActions = globalSlice.actions;

export default globalSlice.reducer;