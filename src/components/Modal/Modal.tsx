import React, { useEffect, useState } from "react";
import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import ModalContent from "./ModalContent";
import ModalPortal from "./ModalPortal";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  opened: boolean;
  onClose?: () => void;
}

type ModalContainerProps = Pick<ModalProps, "opened">;
const ModalContainer = styled.div<ModalContainerProps>`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(10.5px);

  transition: 0.2s;
  transition-property: opacity, visibility;

  ${({ opened }) =>
    opened
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
  opened: openedProps = false,
  onClose,
  ...props
}: ModalProps) => {
  const [opened, setOpened] = useState(openedProps);

  useEffect(() => {
    setOpened(openedProps);
  }, [openedProps]);

  useEffect(() => {
    if (!opened && onClose) {
      onClose();
    }
  }, [opened]);

  return (
    <ModalPortal opened={opened}>
      <ModalContainer
        role="dialog"
        aria-hidden={!opened}
        opened={opened}
        {...props}
        onClick={(event) => {
          props.onClick?.(event);

          setOpened(false);
        }}
      >
        {children}
      </ModalContainer>
    </ModalPortal>
  );
};

Modal.Content = ModalContent;

export default Modal;
