import React, { useCallback } from "react";
import styles from "./IMSearchResultList.module.scss";
import { SearchResult } from "../../model/search";
import IMSearchResult from "./IMSearchResult";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { searchMapperActions } from "../../store/reducers/search-mapper";

interface SearchResultListProps {
  results: SearchResult[];
}

const IMSearchResultList = (props: SearchResultListProps) => {
  // const currentQueryID = useSelector((state: RootState) => state.search.currentQueryID);
  const { loading } = useSelector((state: RootState) => state.search);

  const dispatch = useDispatch();

  const handleAddToSearchMapper = useCallback(
    (result: SearchResult) => {
      if (loading) return;

      dispatch(searchMapperActions.addResults(result));
    },
    [loading]
  );

  return (
    <div className={styles.wrap}>
      {props.results.map((result) => (
        <IMSearchResult
          key={result.id}
          // for statistics, implement it later
          // index={idx}
          // queryID={currentQueryID}
          result={result}
          onAddToSearchMapper={handleAddToSearchMapper}
        />
      ))}
    </div>
  );
};

export default IMSearchResultList;
