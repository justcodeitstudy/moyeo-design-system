import React, { useEffect } from "react";

export const isSameComponent = <T>(
  source: React.ReactNode | React.ReactFragment | React.ReactPortal,
  target: React.Component<T> | React.FunctionComponent<T>,
): source is React.FunctionComponentElement<T> => {
  if (!React.isValidElement(source)) {
    return false;
  }

  if (source?.type === target) {
    return true;
  }

  return false;
};

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
