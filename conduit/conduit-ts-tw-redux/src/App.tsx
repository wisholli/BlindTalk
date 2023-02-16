import { FC } from "react";
import { Banner } from "./compotetns/baner/baner";
import { Header } from "./compotetns/header/header";
import Pagination from "./compotetns/mosules/feed/components/pagination/pagination";

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Pagination />
    </div>
  );
};
