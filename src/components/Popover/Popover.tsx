import styled from "styled-components";
import React, {
  useEffect,
  useRef,
  ReactNode,
  forwardRef,
  FunctionComponentElement,
  MutableRefObject,
  RefCallback,
} from "react";
import {
  calcAnchorCoord,
  VerticalAnchorOrigin,
  HorizontalAnchorOrigin,
} from "./calcAnchorCoord";
import ReactDOM from "react-dom";
import { useResizeEffect } from "../../utils";

export interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorOrigin?: {
    vertical: VerticalAnchorOrigin;
    horizontal: HorizontalAnchorOrigin;
  };
  transformOrigin?: {
    vertical: VerticalAnchorOrigin;
    horizontal: HorizontalAnchorOrigin;
  };
  anchorPosition?: {
    x: number;
    y: number;
  };
  children: ReactNode;
  opener: PopoverOpenerType;
}

export type PopoverOpenerType = FunctionComponentElement<{
  ref: MutableRefObject<HTMLElement> | RefCallback<HTMLElement>;
}>;

export interface ObservedRefType {
  anchorNode: HTMLElement | null;
  childNode: HTMLDivElement | null;
}

export const Popover = forwardRef<ObservedRefType, PopoverProps>(
  function Popover({
    isOpen,
    onClose,
    children,
    anchorOrigin = {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin = {
      vertical: "top",
      horizontal: "left",
    },
    anchorPosition = {
      x: 0,
      y: 0,
    },
    opener,
  }) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const anchorRef = useRef<HTMLElement | null>(null);

    const renderContentRect = () => {
      if (!anchorRef.current || !contentRef.current) {
        return;
      }

      const anchorRect = anchorRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      const { x, y } = calcAnchorCoord({
        anchorRect,
        contentRect,
        anchorOrigin,
        transformOrigin,
        anchorPosition,
      });

      contentRef.current.style.left = x + "px";
      contentRef.current.style.top = y + "px";
      contentRef.current.style.opacity = "1";
      contentRef.current.style.transform = "scale(1)";
    };

    useEffect(() => renderContentRect(), [isOpen]);

    useResizeEffect(renderContentRect);

    const ContainerRef = useRef<HTMLDivElement>(null);

    if (!document.body) {
      throw new Error("document.body is not defined");
    }

    return (
      <>
        {React.isValidElement(opener) &&
          React.cloneElement(opener, {
            ref: (node: HTMLElement) => {
              anchorRef.current = node;

              const { ref } = opener;

              if (!ref) {
                return;
              }

              if (typeof ref === "function") {
                ref(node);
              } else if (ref !== null) {
                ref.current = node;
              }
            },
          })}
        {ReactDOM.createPortal(
          isOpen && (
            // TODO: 추후에 Modal 컴포넌트로 리팩토링?
            <Container role="dialog" ref={ContainerRef}>
              <Dim aria-hidden="true" onClick={onClose} />
              <Paper ref={contentRef}>{children}</Paper>
            </Container>
          ),
          document.body,
        )}
      </>
    );
  },
);

const Paper = styled("div")`
  position: absolute;
  overflow: hidden auto;
  min-width: 200px;
  outline: 0px;
  opacity: 0;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.text.title};
  border-radius: 4px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  transition: opacity 0.7 ease-in, transform 0.7 ease-in;
`;

const Container = styled("div")`
  position: absolute;
  z-index: 1000;
  inset: 0px;
`;

const Dim = styled("div")`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  background-color: "transparent";
`;
