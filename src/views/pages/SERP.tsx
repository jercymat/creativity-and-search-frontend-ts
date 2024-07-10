import React, { useEffect, useRef } from "react";
import styles from "./SERP.module.scss";
import { useSearchParams } from "react-router-dom";
import config from "../../config";
import { IMSearchResultField } from "../../components/search";
import { LinkContainer } from "react-router-bootstrap";
import IMSMListSERP from "../../components/search-mapper/IMSMListSERP";
import { IMButtonRightIcon } from "../../components/common/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { globalActions } from "../../store/reducers/global";

export const SERPPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { smThemes } = useSelector((state: RootState) => state.searchMapper);
  const searchMapperWrapperRef = useRef<HTMLDivElement>(null);

  const currentQuery = searchParams.get("q") ?? "";
  const currentPage = searchParams.has("page")
    ? parseInt(searchParams.get("page") ?? "1")
    : 1;

  // set page title
  document.title = `${currentQuery} - ${config.PRODUCT_NAME}`;

  useEffect(() => {
    dispatch(
      globalActions.updateSearchMapperWidth(
        searchMapperWrapperRef.current?.offsetWidth ?? 0
      )
    );
  }, []);

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
          <LinkContainer to="/map">
            <IMButtonRightIcon
              bsIcon="chevron-right"
              bsVariant="primary"
              disabled={
                smThemes.length == 1 && smThemes[0].searchResultList.length == 0
              }
            >
              {config.IDEA_CANVAS_NAME}
            </IMButtonRightIcon>
          </LinkContainer>
        </div>
        <IMSMListSERP />
      </div>
    </div>
  );
};
