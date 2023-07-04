import React, { useRef } from "react";
import styles from "./SERP.module.scss";
import { useSearchParams } from "react-router-dom";
import config from "../../config";
import { IMSearchResultField } from "../../components/search";
// import { useDispatch } from 'react-redux';

export const SERPPage = () => {
  const [searchParams] = useSearchParams();
  const searchMapperWrapperRef = useRef(null);

  // const dispatch = useDispatch();

  const currentQuery = searchParams.get("q") ?? "";
  const currentPage = searchParams.has("page")
    ? parseInt(searchParams.get("page") ?? "1")
    : 1;

  // set page title
  document.title = `${currentQuery} - ${config.PRODUCT_NAME}`;

  return (
    <div className={styles.wrap}>
      <IMSearchResultField
        className={styles.result}
        queryParam={currentQuery}
        currentPage={currentPage}
      />
      <div ref={searchMapperWrapperRef} className={styles.saved}>
        <div className="d-flex justify-content-between mb-3">
          <span className="font-logo-main ps-2 d-block">Search Mapper</span>
        </div>
      </div>
    </div>
  );
};
