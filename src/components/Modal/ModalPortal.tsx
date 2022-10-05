import ReactDOM from "react-dom";
import { ModalProps } from "./Modal";

interface ModalPortalProps extends Pick<ModalProps, "opened"> {
  children: React.ReactNode;
}

const ModalPortal = ({ children, opened }: ModalPortalProps) => {
  return opened ? ReactDOM.createPortal(children, document.body) : null;
};

export default ModalPortal;
