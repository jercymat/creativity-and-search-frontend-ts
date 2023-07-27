import React from "react";
import { Tooltip } from "react-bootstrap";

export const TooltipHOC = (text: string) => {
  const ComposedTooltip = (props: object) => (
    <Tooltip {...props}>{text}</Tooltip>
  );
  return ComposedTooltip;
};
