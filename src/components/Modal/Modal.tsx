import React, { useCallback, useEffect } from "react";
import { HTMLAttributes } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import ModalContent from "./ModalContent";
import ModalPortal from "./ModalPortal";

export type ModalDim = "blur" | "black";
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  dim?: ModalDim;

  /**
   * ESC 키로 닫는 기능을 막는 옵션입니다.
   */
  blockEscClose?: boolean;
}

const modalContainerDim: Record<ModalDim, FlattenSimpleInterpolation> = {
  blur: css`
    background-color: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(10.5px);
  `,
  black: css`
    background-color: rgba(217, 217, 217, 0.5);
    background-blend-mode: multiply;
  `,
};

type ModalContainerProps = Required<Pick<ModalProps, "isOpen" | "dim">>;
const ModalContainer = styled.div<ModalContainerProps>`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;

  ${({ dim }) =>
    css`
      ${modalContainerDim[dim]}
    `}

  transition: 0.2s;
  transition-property: opacity, visibility;

  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
          z-index: 9999;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `}
`;

const Modal = ({
  children,
  isOpen = false,
  onClose,
  blockEscClose = false,
  dim = "black",
  ...props
}: ModalProps) => {
  const onKeydownClose = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) {
      onClose();
    }

    if (isOpen && !blockEscClose) {
      window.addEventListener("keyup", onKeydownClose);

      return () => {
        window.removeEventListener("keyup", onKeydownClose);
      };
    }
  }, [isOpen, blockEscClose]);

  return (
    <ModalPortal isOpen={isOpen}>
      <ModalContainer
        role="dialog"
        aria-hidden={!isOpen}
        isOpen={isOpen}
        dim={dim}
        {...props}
        onClick={(event) => {
          props.onClick?.(event);
          onClose();
        }}
      >
        {children}
      </ModalContainer>
    </ModalPortal>
  );
};

Modal.Content = ModalContent;

export default Modal;
