import { all, call, put, select } from "redux-saga/effects";
import { IMLoadAPIResponse } from "../../model/api/idea-mapper";
import ideaMapperAPI from "../apis/idea-mapper";
import { ideaMapperActions } from "../reducers/idea-mapper";
import { sagaAPIErrorHandler, sagaClientErrorHandler } from "./util";
import { RootState } from "..";
import { BaseAPIResponse } from "../../model/common";
import { smLoadSaga } from "./search-mapper";
import { SearchMapperTheme } from "../../model/search-mapper";
import { IdeaMapperGraph, ThemeToggle } from "../../model/idea-mapper";
import { Node } from "reactflow";

export function* imLoadWholePageSaga() {
  console.log("[saga] load whole IdeaMapper page");

  // laod SearchMapper results and IdeaMapper graph first
  yield call(smLoadSaga);
  yield call(imLoadGraphSaga);

  const graph: IdeaMapperGraph = yield select(
    (state: RootState) => state.ideaMapper.graph
  );
  const smThemes: SearchMapperTheme[] = yield select(
    (state: RootState) => state.searchMapper.smThemes
  );

  // --- reflect changes of SearchMapper to graph ---
  const reflectedGraph: IdeaMapperGraph = { nodes: [], edges: [] };

  // remove deleted theme and results
  const validNodeIDs = smThemes
    .slice(1)
    .map((theme) =>
      theme.searchResultList
        .map((result) => `sm-theme-${theme.id}-result-${result.id}`)
        .concat([`sm-theme-${theme.id}`, `sm-theme-${theme.id}-note`])
    )
    .flat();
  const validEdgeIDs = smThemes
    .slice(1)
    .map((theme) =>
      theme.searchResultList
        .map(
          (result) =>
            `sm-edge_sm-theme-${theme.id}_sm-theme-${theme.id}-result-${result.id}`
        )
        .concat(`sm-edge_sm-theme-${theme.id}_sm-theme-${theme.id}-note`)
    )
    .flat();

  reflectedGraph.nodes = graph.nodes.filter((node) => {
    if (node.id.includes("sm-theme")) {
      return validNodeIDs.includes(node.id);
    } else return true;
  });
  reflectedGraph.edges = graph.edges.filter((edge) => {
    if (edge.id.includes("sm-edge")) {
      return validEdgeIDs.includes(edge.id);
    } else if (edge.source.includes("sm-theme")) {
      return validNodeIDs.includes(edge.source);
    } else return true;
  });

  // if no themed results, no need to construct toggle list
  if (smThemes.length <= 1) {
    yield put(
      ideaMapperActions.loadWholePageSuccess({
        reflectedGraph,
        themeToggles: [],
      })
    );
    return;
  }

  // construct toggle list
  const smIdeas = graph.nodes.filter((node) => node.id.includes("sm-theme"));
  const themeToggles: ThemeToggle[] = smThemes.slice(1).map((theme) => ({
    id: theme.id,
    name: theme.name,
    note: theme.note,
    shown: smIdeas.some((idea) => idea.id === `sm-theme-${theme.id}`),
    noteShown: smIdeas.some((idea) => idea.id === `sm-theme-${theme.id}-note`),
    colorScheme: graph.nodes.find((node) => node.id === `sm-theme-${theme.id}`)
      ? (
          graph.nodes.find((node) => node.id === `sm-theme-${theme.id}`) ??
          ({
            data: {
              colorHex: "#FFFFFF",
            },
          } as Node)
        ).data.colorHex
      : "#F0F0F0",
    savedResults: theme.searchResultList.map((result) => ({
      id: parseInt(result.id),
      shown: smIdeas.some(
        (idea) => idea.id === `sm-theme-${theme.id}-result-${result.id}`
      ),
    })),
  }));

  // update theme name, theme note
  themeToggles.forEach((theme) => {
    if (theme.shown) {
      const themeNodeIndex = reflectedGraph.nodes.findIndex(
        (node) => node.id === `sm-theme-${theme.id}`
      );

      reflectedGraph.nodes[themeNodeIndex] = {
        ...reflectedGraph.nodes[themeNodeIndex],
        data: {
          ...reflectedGraph.nodes[themeNodeIndex].data,
          note_shown: theme.noteShown,
          shown_sr: theme.savedResults.reduce(
            (total, sr) => (sr.shown ? total + 1 : total),
            0
          ),
          title: theme.name,
          total_sr: theme.savedResults.length,
        },
      };
    }

    if (theme.noteShown) {
      const themeNoteNodeIndex = reflectedGraph.nodes.findIndex(
        (node) => node.id === `sm-theme-${theme.id}-note`
      );
      reflectedGraph.nodes[themeNoteNodeIndex] = {
        ...reflectedGraph.nodes[themeNoteNodeIndex],
        data: {
          ...reflectedGraph.nodes[themeNoteNodeIndex].data,
          label: theme.note,
        },
      };
    }
  });

  yield put(
    ideaMapperActions.loadWholePageSuccess({ reflectedGraph, themeToggles })
  );
}

export function* imLoadGraphSaga() {
  console.log("[saga] load idea mapper graph");

  try {
    const response: IMLoadAPIResponse = yield call(ideaMapperAPI.loadGraph);

    if (response.ret == 0) {
      yield put(ideaMapperActions.loadGraphSuccess(response.graph));
    } else yield sagaAPIErrorHandler(ideaMapperActions.loadGraphFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, ideaMapperActions.loadGraphFail());
  }
}

export function* imSaveGraphSaga() {
  console.log("[saga] save idea mapper graph");

  const { graph, cachedGraph } = yield select(
    (state: RootState) => state.ideaMapper
  );

  const stringGraph = JSON.stringify(graph);

  // compare to cached graph, if the same then stop saving to server
  if (stringGraph == JSON.stringify(cachedGraph)) {
    yield put(ideaMapperActions.saveGraphSuccess());
    console.log("same, not saving");
    return;
  }

  try {
    const response: BaseAPIResponse = yield call(
      ideaMapperAPI.saveGraph,
      stringGraph
    );

    if (response.ret == 0) {
      yield all([
        put(ideaMapperActions.saveGraphSuccess()),
        put(ideaMapperActions.loadGraph()),
      ]);
    } else yield sagaAPIErrorHandler(ideaMapperActions.saveGraphFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, ideaMapperActions.saveGraphFail());
  }
}
