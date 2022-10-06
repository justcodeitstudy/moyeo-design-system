import ReactDOM from "react-dom";
import { ModalProps } from "./Modal";

interface ModalPortalProps extends Pick<ModalProps, "opened"> {
  children: React.ReactNode;
}

const ModalPortal = ({ children, opened }: ModalPortalProps) => {
  if (!document.body) throw new Error("document.body is not defined");

  return opened ? ReactDOM.createPortal(children, document.body) : null;
};

export default ModalPortal;
