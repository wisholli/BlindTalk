import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useGetGlobalFeedQuery } from "../../../../../services/repository";
import { ArticleList } from "../article-list/article-list";
import { Container } from "../../../../container/container";

const Pagination = () => {
  const number = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useGetGlobalFeedQuery(
    `articles?limit=10&offset=${currentPage}`
  );

  if (data?.articlesCount) {
    let pagesCount = Math.ceil(data?.articlesCount / 10);
    let pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    const handlePageClick = (event: { selected: number }) => {
      const currentPageSelected = event.selected * number;
      setCurrentPage(currentPageSelected);
    };
    return (
      <Container>
        <ArticleList articlesData={data} />
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pagesCount}
          marginPagesDisplayed={3}
          previousLabel="<"
          containerClassName={
            "flex place-content-center pagination justify-content-center"
          }
        />
      </Container>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Pagination;
