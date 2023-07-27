import React from "react";
import config from "../../../config";

interface Props {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

const defaultProps: Props = {
  className: "text-center",
};

export function IMLogoLarge(props: Props) {
  const { id, className, style } = props;

  return (
    <div id={id} className={className} style={style}>
      <img
        src="https://via.placeholder.com/120/023246/023246.jpg"
        width="120"
        height="120"
        className="mb-2 mx-auto"
        style={{ borderRadius: "50%" }}
        alt="Idea Map logo"
      />
      <span className="font-logo-main d-block">{config.PRODUCT_NAME}</span>
    </div>
  );
}

IMLogoLarge.defaultProps = defaultProps;
