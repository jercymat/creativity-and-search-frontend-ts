import React, { ComponentType } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./CanvasNode.scss";

export const IMCanvasNodeLink: ComponentType<NodeProps> = (
  props: NodeProps
) => {
  const { data } = props;

  return (
    <div
      className={"im-link-idea-node im-idea-node-wrap"}
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
      <div className="im-link-idea__link-wrap noselect">
        <div className="im-link-idea__url">
          {data.title !== "" ? data.title : data.link}
        </div>
        <div className="im-link-idea__icon">
          <span className="font-im-bold">
            <a href={data.link} target="_blank" rel="noreferrer">
              <i className="fw-bold bi bi-link-45deg"></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
