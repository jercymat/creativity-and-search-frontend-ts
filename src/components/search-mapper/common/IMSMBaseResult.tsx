import React from "react";
import styles from "./IMSMResult.module.scss";
import { SearchMapperResult } from "../../../model/search-mapper";

type SMBaseResultProps = {
  result: SearchMapperResult;
  children?: React.ReactNode;
};

export const IMSMBaseResult = (props: SMBaseResultProps) => {
  const { result, children } = props;

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <a href={result.url} target="_blank" rel="noreferrer">
          <h2 className={styles.title}>{result.title}</h2>
        </a>
        <h4 className={styles.url}>{result.url}</h4>
      </div>
      <p className={styles.desc}>{result.description}</p>
      <div className={styles.actions}>{children}</div>
    </div>
  );
};
