import React from "react";
import {
  ConnectionLineComponent,
  ConnectionLineComponentProps,
  getBezierPath,
} from "reactflow";

export const IMCanvasConnection: ConnectionLineComponent = ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
}: ConnectionLineComponentProps) => {
  const d = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  return (
    <g className="im-idea-connection-wrap">
      <path fill="none" strokeWidth={1.5} className="animated" d={d[0]} />
      <circle cx={toX} cy={toY} r={4} stroke="#222" strokeWidth={1.5} />
    </g>
  );
};
