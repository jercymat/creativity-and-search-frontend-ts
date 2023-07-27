import React from "react";
import { SearchMapperResult } from "../../../model/search-mapper";
import { IMSMBaseResult, IMSMResultAction } from "../common";

type SMResultGroupedProps = {
  result: SearchMapperResult;
  onDeleteResult: (resultID: number) => void;
  onMoveToTheme: (resultID: number) => void;
  onRemoveFromTheme: (resultID: number) => void;
};

const IMSMResultGroupedSERP = (props: SMResultGroupedProps) => {
  const { result, onDeleteResult, onMoveToTheme, onRemoveFromTheme } = props;

  return (
    <IMSMBaseResult result={result}>
      <>
        <IMSMResultAction
          tooltip="Delete Result"
          bsVariant="danger"
          bsIcon="trash3"
          onClick={() => onDeleteResult(parseInt(result.id))}
        />
        <IMSMResultAction
          tooltip="Remove from IdeaTag"
          bsVariant="warning"
          bsIcon="database-x"
          onClick={() => onRemoveFromTheme(parseInt(result.id))}
        />
        <IMSMResultAction
          tooltip="Move to Other IdeaTag"
          bsVariant="primary"
          bsIcon="box-arrow-up-right"
          onClick={() => onMoveToTheme(parseInt(result.id))}
        />
      </>
    </IMSMBaseResult>
  );
};

export default IMSMResultGroupedSERP;
