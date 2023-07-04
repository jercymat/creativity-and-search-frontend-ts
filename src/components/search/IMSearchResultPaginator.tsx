import React, { useCallback } from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { range } from "../../utils";

interface SearchResultPaginatorProps {
  className: string | undefined;
  baseURL: string;
  currentPage: number;
  totalPages: number;
}

const IMSearchResultPaginator = (props: SearchResultPaginatorProps) => {
  const { baseURL, currentPage, totalPages, className } = props;

  const getPaginationIndex = useCallback(() => {
    if (totalPages <= 5) return range(1, totalPages + 1);

    let bottom = Math.max(currentPage - 2, 1);
    let top = Math.min(currentPage + 2, totalPages);

    if (top === totalPages) bottom -= currentPage + 2 - totalPages;
    if (bottom === 1) top += 1 - (currentPage - 2);

    return range(bottom, top + 1);
  }, [totalPages, currentPage]);

  const handleScrollTop = useCallback(() => window.scrollTo(0, 0), []);

  return (
    <Pagination className={className}>
      <LinkContainer to={`${baseURL}&page=${currentPage - 1}`}>
        <Pagination.Prev
          onClick={handleScrollTop}
          disabled={currentPage === 1}
        />
      </LinkContainer>
      {getPaginationIndex().map((i) => (
        <LinkContainer to={`${baseURL}&page=${i}`} key={i}>
          <Pagination.Item onClick={handleScrollTop} active={currentPage === i}>
            {i}
          </Pagination.Item>
        </LinkContainer>
      ))}
      <LinkContainer to={`${baseURL}&page=${currentPage + 1}`}>
        <Pagination.Next
          onClick={handleScrollTop}
          disabled={currentPage === totalPages}
        />
      </LinkContainer>
    </Pagination>
  );
};

export default IMSearchResultPaginator;
