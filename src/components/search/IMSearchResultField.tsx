import React, { useEffect, useMemo } from "react";
import styles from "./IMSearchResultField.module.scss";
import { IMSearchBox } from "./IMSearchBox";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchActions } from "../../store/reducers/search";
import IMSearchResultList from "./IMSearchResultList";
import IMSearchResultPaginator from "./IMSearchResultPaginator";

interface SearchResultFieldProps {
  queryParam: string;
  currentPage: number;
  className: string | undefined;
}

export const IMSearchResultField = (props: SearchResultFieldProps) => {
  const { className, queryParam, currentPage } = props;
  const { loading, search } = useSelector((state: RootState) => state.search);
  const currentSearchFetched = useMemo(
    () =>
      queryParam == search.keyword &&
      currentPage == search.page &&
      search.results.length != 0,
    [queryParam, currentPage, search]
  );
  const totalPages = useMemo(
    () => (search.totalResults != 0 ? Math.ceil(search.totalResults / 20) : 1),
    [search]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSearchFetched) return;

    dispatch(searchActions.loadSearch({ keyword: queryParam, currentPage }));
  }, [currentSearchFetched]);

  return (
    <div className={className}>
      <IMSearchBox
        className={styles.searchfield}
        placeholder="Your creativity starts here."
        defaultQuery={queryParam}
      />
      {loading && (
        <div className={styles.loading}>
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "4rem", height: "4rem" }}
          />
        </div>
      )}
      {!loading && (
        <>
          <IMSearchResultList results={search.results} />
          <IMSearchResultPaginator
            className={styles.page}
            baseURL={`/search?q=${queryParam}`}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};
