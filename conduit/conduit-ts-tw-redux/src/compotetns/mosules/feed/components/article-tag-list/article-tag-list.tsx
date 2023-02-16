import { FC } from "react";

interface ArticleTagListProps {
  tagList: string[];
}

export const ArticleTagList: FC<ArticleTagListProps> = ({ tagList }) => {
  return (
    <ul className="flex inline-block float-right max-w-1/2 align-top mb-4 pl-0 text-date py-0 leading-6 font-light">
      {tagList.map((tag) => {
        return (
          <li className="border border-mainPage-tagList text-mainPage-tagListColor mr-1em mb-tagList px-0.6 rounded-10">
            {tag}
          </li>
        );
      })}
    </ul>
  );
};
