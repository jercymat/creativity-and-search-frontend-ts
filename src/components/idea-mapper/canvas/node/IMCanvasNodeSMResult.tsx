import React, { ComponentType } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./CanvasNode.scss";

export const IMCanvasNodeSMResult: ComponentType<NodeProps> = (
  props: NodeProps
) => {
  const { data } = props;

  return (
    <div
      className="im-sm-result-node im-sm-node-wrap"
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
      <div className="im-sm-result__content-wrap noselect">
        <div className="im-sm-result__head">
          <h2 className="im-sm-result__head__title">{data.title}</h2>
          <h4 className="im-sm-result__head__url">{data.url}</h4>
        </div>
        <p className="im-sm-result__desc">{data.desc}</p>
      </div>
    </div>
  );
};
