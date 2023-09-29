interface IHeadlineProps {
  text: string;
}

export const Headline = ({ text }: IHeadlineProps) => (
  <h1 className="font-pacifico font-normal text-4xl md:text-6xl text-black-100 text-center mb-10">
    {text}
  </h1>
);
