import React from "react";
import styles from "./IMSMResult.module.scss";
import { OverlayTrigger } from "react-bootstrap";
import { TooltipHOC } from "../../common/popup";
import { IMButtonIconRounded } from "../../common/button";

type SMResultActionProps = {
  tooltip: string;
  bsVariant: string;
  bsIcon: string;
  onClick: () => void;
};

export const IMSMResultAction = (props: SMResultActionProps) => {
  const { tooltip, bsVariant, bsIcon, onClick } = props;

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 0 }}
      overlay={TooltipHOC(tooltip)}
    >
      <div className={`d-inline-block ${styles.action}`}>
        <IMButtonIconRounded
          bsVariant={bsVariant}
          bsIcon={bsIcon}
          onClick={onClick}
        />
      </div>
    </OverlayTrigger>
  );
};
