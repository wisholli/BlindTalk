import { FC } from "react";
import { GlobalFeedIn } from "../../../../../services/dto/global-feed.in";
import { Container } from "../../../../container/container";
import { Article } from "../article/article";
import { FeedToggle } from "../feed-toggle/feed-toggle";
import { TagList } from "../tag-list/tag-list";

interface ArticleListProps {
  articlesData: GlobalFeedIn | undefined;
}

export const ArticleList: FC<ArticleListProps> = ({ articlesData }) => {
  console.log("articlesData", articlesData);

  const articlesList = articlesData?.articles.map((article) => {
    return <Article {...article} />;
  });

  return (
    <Container>
      <div className="flex">
        <div className="w-3/4">
          <FeedToggle />
          {articlesList}
        </div>
        <div className="w-1/4 ml-8">
          <TagList />
        </div>
      </div>
    </Container>
  );
};
