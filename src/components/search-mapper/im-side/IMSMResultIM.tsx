import React from "react";
import { SearchMapperResult } from "../../../model/search-mapper";
import { IMSMBaseResult } from "../common";

type SMResultProps = {
  result: SearchMapperResult;
};

export const IMSMResultIM = (props: SMResultProps) => {
  const { result } = props;

  return <IMSMBaseResult result={result} />;
};
