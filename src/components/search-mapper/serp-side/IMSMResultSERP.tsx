import React from "react";
import { SearchMapperResult } from "../../../model/search-mapper";
import { IMSMBaseResult, IMSMResultAction } from "../common";

type SMResultProps = {
  result: SearchMapperResult;
  onDeleteResult: (resultID: number) => void;
  onAddToTheme: (resultID: number) => void;
};

const IMSMResultSERP = (props: SMResultProps) => {
  const { result, onDeleteResult, onAddToTheme } = props;

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
          tooltip="Add to IdeaTag"
          bsVariant="primary"
          bsIcon="database-add"
          onClick={() => onAddToTheme(parseInt(result.id))}
        />
      </>
    </IMSMBaseResult>
  );
};

export default IMSMResultSERP;
