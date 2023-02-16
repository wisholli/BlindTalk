import { FC } from "react";
interface BannerProps {}

export const Banner: FC<BannerProps> = ({}) => {
  return (
    <div className="bg-header-logo shadow-banner text-white p-8 mb-8 text-center">
      <h1 className=" font-titillium drop-shadow-banner text-banner font-bold pb-2">
        conduit
      </h1>
      <p className="text-textAterBanner font-light">
        A place to share your knowledge.
      </p>
    </div>
  );
};
