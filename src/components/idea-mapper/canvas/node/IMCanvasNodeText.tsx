import React, { ComponentType } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./CanvasNode.scss";

export const IMCanvasNodeText: ComponentType<NodeProps> = (
  props: NodeProps
) => {
  const { data } = props;

  return (
    <div
      className={"im-text-idea-node im-idea-node-wrap"}
      style={{ backgroundColor: data.colorHex }}
    >
      <Handle
        className="disabled"
        isConnectable={true}
        type="target"
        position={Position.Top}
      />
      <Handle
        className="disabled"
        isConnectable={false}
        type="source"
        position={Position.Bottom}
      />
      <div className="im-text-idea__label-wrap noselect">{data.label}</div>
    </div>
  );
};
