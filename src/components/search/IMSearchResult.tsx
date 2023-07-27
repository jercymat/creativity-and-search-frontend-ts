import React from "react";
import styles from "./IMSearchResult.module.scss";
import { IMButtonIconRounded } from "../common/button";
import { SearchResult } from "../../model/search";

interface SearchResultProps {
  // for statistics, implement it later
  // index: number;
  // queryID: number;
  result: SearchResult;
  onAddToSearchMapper: (result: SearchResult) => void;
}

const IMSearchResult = (props: SearchResultProps) => {
  const { result, onAddToSearchMapper } = props;

  const handleAddResult = () => {
    onAddToSearchMapper(result);
  };

  return (
    <div className={styles.wrap}>
      <IMButtonIconRounded
        onClick={handleAddResult}
        className={styles.add}
        bsVariant="primary"
        bsIcon="plus-lg"
      />
      <div className={styles.content}>
        <div className={styles.head_wrap}>
          <a href={result.url} target="_blank" rel="noreferrer">
            <h2 className={styles.title}>{result.title}</h2>
          </a>
          <h4 className={styles.url}>{result.url}</h4>
        </div>
        <p className={styles.desc}>{result.description}</p>
      </div>
    </div>
  );
};

export default IMSearchResult;
