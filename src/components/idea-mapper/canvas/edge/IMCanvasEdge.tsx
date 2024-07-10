import React, { ComponentType, useCallback } from "react";
import { EdgeProps, getBezierPath, useStore } from "reactflow";
import "./IMCanvasEdge.scss";
import { getEdgeParams } from "../../util/canvas";

export const IMCanvasEdge: ComponentType<EdgeProps> = (props: EdgeProps) => {
  const { id, source, target, markerEnd, style } = props;

  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const bezierPathParams = getEdgeParams(sourceNode, targetNode);

  const d = getBezierPath(bezierPathParams);

  return (
    <g className="react-flow__edge">
      <path
        id={id}
        className="react-flow__edge-path"
        d={d[0]}
        markerEnd={markerEnd}
        stroke="black"
        strokeWidth="4"
        style={style}
      />
    </g>
  );
};
