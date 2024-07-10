// defined payload but only used for sagas
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IdeaMapperGraph, ThemeToggle } from "../../model/idea-mapper";

interface IdeaMapperState {
  // overall
  loading: boolean;
  submitting: boolean;

  // graph
  graph: IdeaMapperGraph;
  cachedGraph: IdeaMapperGraph; // copy of graph before editing to decide whether to save to db

  // theme toggle
  themeToggles: ThemeToggle[];

  // dialogs
  ideaDialogShow: boolean;
  ideaDialogMode: "add" | "edit";
  ideaDialogIdeaId: string | null;
  ideaDialogType: "text" | "link" | "image";
  themeToggleDialogShow: boolean;

  // focus
  currentFocusToggleTheme: number;
}

const initialState: IdeaMapperState = {
  loading: false,
  submitting: false,
  graph: {
    nodes: [],
    edges: [],
  },
  cachedGraph: {
    nodes: [],
    edges: [],
  },
  themeToggles: [],
  ideaDialogShow: false,
  ideaDialogMode: "add",
  ideaDialogIdeaId: null,
  ideaDialogType: "text",
  themeToggleDialogShow: false,
  currentFocusToggleTheme: -1,
};

const ideaMapperSlice = createSlice({
  name: "idea-mapper",
  initialState,
  reducers: {
    // whole page
    loadWholePage(state) {
      state.loading = true;
    },
    loadWholePageSuccess(
      state,
      action: PayloadAction<{
        reflectedGraph: IdeaMapperGraph;
        themeToggles: ThemeToggle[];
      }>
    ) {
      state.loading = false;
      state.graph = action.payload.reflectedGraph;
      state.cachedGraph = action.payload.reflectedGraph;
      state.themeToggles = action.payload.themeToggles;
    },
    loadWholePageFail(state) {
      state.loading = false;
    },

    // API calls
    loadGraph(state) {
      state.loading = true;
    },
    loadGraphSuccess(state, action: PayloadAction<IdeaMapperGraph>) {
      state.loading = false;
      state.submitting = false;
      state.graph = action.payload; // this graph will be updated by local changes
      state.cachedGraph = action.payload; // this graph won't
    },
    loadGraphFail(state) {
      state.loading = false;
    },
    saveGraph(state) {
      state.loading = true;
    },
    saveGraphSuccess(state) {
      state.loading = false;
    },
    saveGraphFail(state) {
      state.loading = false;
    },

    // local changes
    updateGraph(state, action: PayloadAction<IdeaMapperGraph>) {
      state.graph = action.payload;
    },
    updateToggle(
      state,
      action: PayloadAction<{ themeID: number; newToggle: ThemeToggle }>
    ) {
      state.submitting = true;
    },

    // dialogs
    openAddIdeaDialog(
      state,
      action: PayloadAction<{ type: "text" | "link" | "image" }>
    ) {
      state.ideaDialogShow = true;
      state.ideaDialogMode = "add";
      state.ideaDialogType = action.payload.type;
    },
    openEditIdeaDialog(
      state,
      action: PayloadAction<{ type: "text" | "link" | "image"; ideaID: string }>
    ) {
      state.ideaDialogShow = true;
      state.ideaDialogMode = "edit";
      state.ideaDialogType = action.payload.type;
      state.ideaDialogIdeaId = action.payload.ideaID;
    },
    openThemeToggleDialog(state, action: PayloadAction<number>) {
      state.themeToggleDialogShow = true;
      state.currentFocusToggleTheme = action.payload;
    },
    closeIdeaDialog(state) {
      state.ideaDialogShow = false;
    },
    closeThemeToggleDialog(state) {
      state.themeToggleDialogShow = false;
    },
  },
});

export const ideaMapperActions = ideaMapperSlice.actions;

export default ideaMapperSlice.reducer;
