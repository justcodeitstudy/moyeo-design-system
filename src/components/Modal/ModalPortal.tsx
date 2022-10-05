import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [containerElement, setContainerElement] = useState<HTMLElement>();

  useEffect(() => {
    const newContainer = document.createElement("div");
    document.body.append(newContainer);

    setContainerElement(newContainer);
  }, []);

  useEffect(() => {
    return () => {
      if (containerElement) {
        document.body.removeChild(containerElement);
      }
    };
  }, [containerElement]);

  return containerElement
    ? ReactDOM.createPortal(children, containerElement)
    : null;
};

export default ModalPortal;
