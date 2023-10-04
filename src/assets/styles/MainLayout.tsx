import { Header } from "../../components/header/Header";

interface IMainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
