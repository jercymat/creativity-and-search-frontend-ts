import React, { useCallback } from "react";
import styles from "./IMSearchResultList.module.scss";
import { SearchResult } from "../../model/search";
import IMSearchResult from "./IMSearchResult";
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';

interface SearchResultListProps {
  results: SearchResult[];
}

const IMSearchResultList = (props: SearchResultListProps) => {
  // const currentQueryID = useSelector((state: RootState) => state.search.currentQueryID);

  const handleAddToSearchMapper = useCallback((result: SearchResult) => {
    console.log(result);
    console.log("TODO: add to search mapper");
  }, []);

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
