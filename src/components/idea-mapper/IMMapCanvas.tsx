import React, { useCallback } from "react";
import {
  Background,
  EdgeTypes,
  Node,
  NodeMouseHandler,
  NodeTypes,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  getConnectedEdges,
} from "reactflow";
import { IMCanvasConnection } from "./canvas/connect-line";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  IMCanvasNodeImage,
  IMCanvasNodeLink,
  IMCanvasNodeSMNote,
  IMCanvasNodeSMResult,
  IMCanvasNodeSMTheme,
  IMCanvasNodeText,
} from "./canvas/node";
import { IMCanvasEdge } from "./canvas/edge";
import { useDispatch } from "react-redux";
import { ideaMapperActions } from "../../store/reducers/idea-mapper";
import { useDebouncedCallback } from "use-debounce";
import IMIdeaAddingBar from "./canvas/IMIdeaAddingBar";
import { IMIdeaDialog } from "./dialog/IMIdeaDialog";
import { getNodeSpawnPosition } from "./util/canvas";

const nodeTypes: NodeTypes = {
  text: IMCanvasNodeText,
  link: IMCanvasNodeLink,
  image: IMCanvasNodeImage,
  sm_theme: IMCanvasNodeSMTheme,
  sm_result: IMCanvasNodeSMResult,
  sm_note: IMCanvasNodeSMNote,
};
const edgeTypes: EdgeTypes = {
  idea_mapper_edge: IMCanvasEdge,
};

const IMMapCanvas = () => {
  const {
    graph,
    ideaDialogShow,
    ideaDialogMode,
    ideaDialogType,
    ideaDialogIdeaId,
  } = useSelector((state: RootState) => state.ideaMapper);

  const dispatch = useDispatch();
  const saveGraphDebounced = useDebouncedCallback(
    () => dispatch(ideaMapperActions.saveGraph()),
    1000
  );

  const handleOpenDialog = useCallback(
    (mode: "add" | "edit", type: "text" | "link" | "image", ideaID: string) =>
      () => {
        if (mode == "add") {
          dispatch(
            ideaMapperActions.openAddIdeaDialog({
              type,
            })
          );
        } else {
          dispatch(
            ideaMapperActions.openEditIdeaDialog({
              type,
              ideaID,
            })
          );
        }
      },
    []
  );

  const handleAddIdea = useCallback(
    (type: "text" | "link" | "image", data: object) => {
      const newNode = {
        id: `${Date.now()}`,
        type: type,
        selected: true,
        data: { ...data },
        position: getNodeSpawnPosition(graph.nodes),
      };
      dispatch(
        ideaMapperActions.updateGraph({
          nodes: graph.nodes
            .map((node) => ({ ...node, selected: false }))
            .concat(newNode),
          edges: graph.edges,
        })
      );
      dispatch(ideaMapperActions.closeIdeaDialog());
      saveGraphDebounced();
    },
    [saveGraphDebounced, graph]
  );

  const handleUpdateIdea = useCallback(
    (data: object) => {
      const editedNode =
        graph.nodes.find((node) => node.id == ideaDialogIdeaId) ?? ({} as Node);
      dispatch(
        ideaMapperActions.updateGraph({
          ...graph,
          nodes: graph.nodes
            .filter((node) => node.id !== editedNode.id)
            .concat({
              ...editedNode,
              data: data,
            }),
        })
      );
      dispatch(ideaMapperActions.closeIdeaDialog());
      saveGraphDebounced();
    },
    [saveGraphDebounced, graph]
  );

  const handleDeleteIdea = useCallback(() => {
    const dialogEditNode =
      graph.nodes.find((node) => node.id == ideaDialogIdeaId) ?? ({} as Node);
    const edgesToRemove = getConnectedEdges([dialogEditNode], graph.edges).map(
      (edge) => edge.id
    );

    dispatch(
      ideaMapperActions.updateGraph({
        nodes: graph.nodes.filter((node) => node.id != ideaDialogIdeaId),
        edges: graph.edges.filter((edge) => !edgesToRemove.includes(edge.id)),
      })
    );
    dispatch(ideaMapperActions.closeIdeaDialog());
    saveGraphDebounced();
  }, [saveGraphDebounced, ideaDialogIdeaId, graph]);

  const handleNodesChange: OnNodesChange = useCallback(
    (changes) => {
      dispatch(
        ideaMapperActions.updateGraph({
          nodes: applyNodeChanges(changes, graph.nodes),
          edges: graph.edges,
        })
      );
      saveGraphDebounced();
    },
    [graph]
  );

  const handleEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      dispatch(
        ideaMapperActions.updateGraph({
          nodes: graph.nodes,
          edges: applyEdgeChanges(changes, graph.edges),
        })
      );
      saveGraphDebounced();
    },
    [graph]
  );

  const handleConnect: OnConnect = useCallback(
    (connection) => {
      dispatch(
        ideaMapperActions.updateGraph({
          nodes: graph.nodes,
          edges: addEdge(
            { ...connection, type: "idea_mapper_edge" },
            graph.edges
          ),
        })
      );
      saveGraphDebounced();
    },
    [graph]
  );

  const handleNodeDoubleClick: NodeMouseHandler = useCallback((e, node) => {
    const nodeType = node.type ?? "";

    if (["sm_result", "sm_note"].includes(nodeType)) return;

    if (nodeType == "sm_theme") {
      // openThemeToggleModalAction(node.data.theme_id);
      console.log("TODO: open theme toggle dialog");
      return;
    }

    handleOpenDialog("edit", nodeType as "text" | "link" | "image", node.id)();
  }, []);

  return (
    <>
      <ReactFlow
        nodes={graph.nodes}
        edges={graph.edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={IMCanvasConnection}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onNodeDoubleClick={handleNodeDoubleClick}
        minZoom={0.5}
        maxZoom={2}
        fitView
        fitViewOptions={{ maxZoom: 1 }}
        deleteKeyCode={null}
      >
        <Background />
      </ReactFlow>
      <IMIdeaAddingBar
        onTextIdea={handleOpenDialog("add", "text", "")}
        onLinkIdea={handleOpenDialog("add", "link", "")}
        onImageIdea={handleOpenDialog("add", "image", "")}
      />
      <IMIdeaDialog
        show={ideaDialogShow}
        mode={ideaDialogMode}
        type={ideaDialogType}
        ideaID={ideaDialogIdeaId}
        onAddIdea={handleAddIdea}
        onUpdateIdea={handleUpdateIdea}
        onDeleteIdea={handleDeleteIdea}
        onClose={() => dispatch(ideaMapperActions.closeIdeaDialog())}
      />
    </>
  );
};

export default IMMapCanvas;
