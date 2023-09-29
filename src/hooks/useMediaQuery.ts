import { useState, useEffect } from "react";

export const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== isMatch) setIsMatch(media.matches);

    let listener = () => setIsMatch(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [isMatch, query]);

  return isMatch;
};
