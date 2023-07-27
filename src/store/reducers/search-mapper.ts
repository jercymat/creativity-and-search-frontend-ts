// defined payload but only used for sagas
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchMapperTheme } from "../../model/search-mapper";
import { SearchResult } from "../../model/search";

interface SearchMapperState {
  // overall
  loading: boolean;
  submitting: boolean;

  // page data
  smThemes: SearchMapperTheme[];

  // focus
  currentFocusResult: number;
  currentFocusTheme: number;

  // dialogs
  themeDialogShow: boolean;
  themeDialogMode: "add" | "move";
  textDialogShow: boolean;
  textDialogMode: "edit-idea" | "rename-theme";
}

const initialState: SearchMapperState = {
  loading: false,
  submitting: false,
  smThemes: [
    {
      id: -1,
      name: "",
      note: "",
      noteID: -1,
      searchResultList: [],
    },
  ],
  currentFocusResult: -1,
  currentFocusTheme: -1,
  themeDialogShow: false,
  themeDialogMode: "add",
  textDialogShow: false,
  textDialogMode: "edit-idea",
};

const searchMapperSlice = createSlice({
  name: "search-mapper",
  initialState,
  reducers: {
    // results
    addResults(state, action: PayloadAction<SearchResult>) {
      state.submitting = true;
    },
    loadResults(state) {
      state.loading = true;
    },
    deleteResults(state, action: PayloadAction<number>) {
      state.submitting = true;
    },
    addResultsSuccess(state) {
      state.submitting = false;
    },
    loadResultsSuccess(state, action: PayloadAction<SearchMapperTheme[]>) {
      state.loading = false;
      state.smThemes = action.payload;
    },
    deleteResultsSuccess(state) {
      state.submitting = false;
    },
    addResultsFail(state) {
      state.submitting = false;
    },
    loadResultsFail(state) {
      state.loading = false;
    },
    deleteResultsFail(state) {
      state.submitting = false;
    },

    // themes
    createTheme(
      state,
      action: PayloadAction<{ firstResultID: number; themeName: string }>
    ) {
      state.submitting = true;
    },
    changeTheme(
      state,
      action: PayloadAction<{ resultID: number; toThemeID: number }>
    ) {
      state.submitting = true;
    },
    deleteTheme(state, action: PayloadAction<number>) {
      state.submitting = true;
    },
    renameTheme(
      state,
      action: PayloadAction<{ themeID: number; name: string }>
    ) {
      state.submitting = true;
    },
    createThemeSuccess(state) {
      state.submitting = false;
    },
    changeThemeSuccess(state) {
      state.submitting = false;
    },
    deleteThemeSuccess(state) {
      state.submitting = false;
    },
    renameThemeSuccess(state) {
      state.submitting = false;
    },
    createThemeFail(state) {
      state.submitting = false;
    },
    changeThemeFail(state) {
      state.submitting = false;
    },
    deleteThemeFail(state) {
      state.submitting = false;
    },
    renameThemeFail(state) {
      state.submitting = false;
    },

    // theme notes
    editThemeNote(
      state,
      action: PayloadAction<{
        themeID: number;
        noteID: number;
        content: string;
      }>
    ) {
      state.submitting = true;
    },
    editThemeNoteSuccess(state) {
      state.submitting = false;
    },
    editThemeNoteFail(state) {
      state.submitting = false;
    },

    // dialogs
    openAddToThemeDialog(state, action: PayloadAction<number>) {
      state.themeDialogShow = true;
      state.themeDialogMode = "add";
      state.currentFocusResult = action.payload;
      state.currentFocusTheme = -999;
    },
    openMoveToThemeDialog(
      state,
      action: PayloadAction<{ resultID: number; themeID: number }>
    ) {
      state.themeDialogShow = true;
      state.themeDialogMode = "move";
      state.currentFocusResult = action.payload.resultID;
      state.currentFocusTheme = action.payload.themeID;
    },
    openEditIdeaDialog(state, action: PayloadAction<number>) {
      state.textDialogShow = true;
      state.textDialogMode = "edit-idea";
      state.currentFocusTheme = action.payload;
    },
    openRenameThemeDialog(state, action: PayloadAction<number>) {
      state.textDialogShow = true;
      state.textDialogMode = "rename-theme";
      state.currentFocusTheme = action.payload;
    },
    closeThemeDialog(state) {
      state.themeDialogShow = false;
    },
    closeTextDialog(state) {
      state.textDialogShow = false;
    },
  },
});

export const searchMapperActions = searchMapperSlice.actions;

export default searchMapperSlice.reducer;
