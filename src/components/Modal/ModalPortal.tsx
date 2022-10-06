import ReactDOM from "react-dom";
import { ModalProps } from "./Modal";

interface ModalPortalProps extends Pick<ModalProps, "opened"> {
  children: React.ReactNode;
}

const ModalPortal = ({ children, opened }: ModalPortalProps) => {
  if (!document.body) throw new Error("document.body is not defined");

  return ReactDOM.createPortal(opened && children, document.body);
};

export default ModalPortal;
