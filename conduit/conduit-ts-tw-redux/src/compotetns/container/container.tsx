import { FC, PropsWithChildren } from "react";
interface ContainerProps {}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children,
}) => {
  return <div className="max-w-screen-xl mx-auto">{children}</div>;
};
