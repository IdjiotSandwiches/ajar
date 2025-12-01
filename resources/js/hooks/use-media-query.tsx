import { useState, useEffect } from "react";

export default function useMediaQuery(query: string): boolean {
  const getMatches = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    const handler = () => setMatches(matchQueryList.matches);

    handler(); 
    matchQueryList.addEventListener("change", handler);

    return () => matchQueryList.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
