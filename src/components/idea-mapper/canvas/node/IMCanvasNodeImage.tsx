import React, { ComponentType } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./CanvasNode.scss";

export const IMCanvasNodeImage: ComponentType<NodeProps> = (
  props: NodeProps
) => {
  const { data } = props;
  return (
    <div
      className={"im-image-idea-node im-idea-node-wrap"}
      style={{ backgroundColor: data.colorHex }}
    >
      <Handle
        className="disabled"
        isConnectable={false}
        type="target"
        position={Position.Top}
      />
      <Handle
        className="disabled"
        isConnectable={false}
        type="source"
        position={Position.Bottom}
      />
      <div className="im-image-idea__image-wrap noselect">
        <img src={data.img_url} alt="idea" draggable="false" />
      </div>
    </div>
  );
};
