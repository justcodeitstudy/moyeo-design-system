import { useEffect } from "react";

export const useResizeEffect = (callback: (e: UIEvent) => void) => {
  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      callback(e);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback]);
};
