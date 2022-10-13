import ReactDOM from "react-dom";
import { ModalProps } from "./Modal";

interface ModalPortalProps extends Pick<ModalProps, "isOpen"> {
  children: React.ReactNode;
}

const ModalPortal = ({ children, isOpen }: ModalPortalProps) => {
  if (!document.body) throw new Error("document.body is not defined");

  return ReactDOM.createPortal(isOpen && children, document.body);
};

export default ModalPortal;
