import { useEffect, useState } from "react";

const read = () => window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");

export function go(slug: string) {
  window.location.hash = `/${slug}`;
}

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
