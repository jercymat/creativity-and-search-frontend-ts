import React, { ComponentType } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./CanvasNode.scss";

export const IMCanvasNodeSMNote: ComponentType<NodeProps> = (
  props: NodeProps
) => {
  const { data } = props;

  return (
    <div
      className="im-sm-note-node im-sm-node-wrap"
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
      <div className="im-sm-note__note-wrap noselect">
        <div className="im-sm-note__icon">
          <span className="font-im-ideas">
            <i className="fw-bold bi bi-sticky-fill"></i>
          </span>
        </div>
        <div className="im-link-idea__note">
          <span className="font-im-bold">{data.label}</span>
        </div>
      </div>
    </div>
  );
};
