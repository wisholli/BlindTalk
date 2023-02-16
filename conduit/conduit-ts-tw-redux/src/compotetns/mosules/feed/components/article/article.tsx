import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../../../../container/container";
import { ArticleTagList } from "../article-tag-list/article-tag-list";
import { Button } from "../button/button";
import { FeedArticle } from "../../../../../services/dto/global-feed.in";
import { DateTime } from "luxon";

interface ArticleProps extends FeedArticle {}

export const Article: FC<ArticleProps> = ({
  author,
  title,
  description,
  createdAt,
  favoritesCount,
  tagList,
}) => {
  return (
    <Container>
      <div className="border-t py-6 border-black/10 ">
        <div className="flex justify-between mb-4 font-light">
          <div className="flex">
            <NavLink to={`/@${author.username}`}>
              <img
                className="inline-block h-8 w-8 rounded-full"
                src={
                  author.image
                    ? author.image
                    : "https://api.realworld.io/images/demo-avatar.png"
                }
                alt="avatar"
              />
            </NavLink>
            <div className="inline-flex flex-col inline-block mr-6 ml-1.5 leading-4 font-medium ">
              <NavLink to={`/@${author.username}`}>{author.username}</NavLink>
              <span className="hover:no-underline text-mainPage-date text-date">
                {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}
              </span>
            </div>
          </div>
          <div>
            <Button text={favoritesCount} />
          </div>
        </div>

        <NavLink to="/article" className="hover:no-underline">
          <h1 className="font-semibold text-2xl mb-title text-mainPage-black">
            {title}
          </h1>
          <p className="text-base leading-1.3 font-light text-mainPage-article mb-article">
            {description}
          </p>
          <span className="max-w-30 text-date font-light text-mainPage-date align-middle">
            Read more...
          </span>
          <ArticleTagList tagList={tagList} />
        </NavLink>
      </div>
    </Container>
  );
};
