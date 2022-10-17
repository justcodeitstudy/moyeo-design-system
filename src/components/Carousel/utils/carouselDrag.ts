import { isMobile } from "./checkMobile";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

interface CarouselDragProps {
  contentsWidth: number;
  nextIndex: () => void;
  prevIndex: () => void;
  setTransitionEnabled: Dispatch<SetStateAction<boolean>>;
  setTranslate: Dispatch<SetStateAction<number>>;
  drag: boolean;
  setDrag: Dispatch<SetStateAction<boolean>>;
}

export const carouselDrag = ({
  contentsWidth,
  nextIndex,
  prevIndex,
  setTransitionEnabled,
  setTranslate,
  drag,
  setDrag,
}: CarouselDragProps) => {
  const [mouseMoveX, setMouseMoveX] = useState<number>(0);
  const [dragX, setDragX] = useState<number>(0);

  const translateHandler = useCallback(() => {
    if (dragX < -contentsWidth) {
      return -contentsWidth;
    }
    if (dragX > contentsWidth) {
      return contentsWidth;
    }
    return dragX;
  }, [dragX, contentsWidth]);

  if (isMobile) {
    return {
      onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setDrag(true);
        setMouseMoveX(e.touches[0].pageX);
      },
      onTouchEnd: () => {
        setDrag(false);

        if (dragX < -(contentsWidth / 2)) {
          nextIndex();
        }
        if (dragX > contentsWidth / 2) {
          prevIndex();
        }

        setTransitionEnabled(true);
        setTranslate(0);
      },
      onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => {
        if (drag) {
          setDragX(e.changedTouches[0].pageX - mouseMoveX);

          setTranslate(translateHandler);
        }
      },
      onTouchCancel: () => {
        setDrag(false);
        setTranslate(0);
      },
    };
  }
  return {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setDrag(true);
      setMouseMoveX(e.pageX);
    },
    onMouseUp: () => {
      setDrag(false);

      if (dragX < -(contentsWidth / 2)) {
        nextIndex();
      }
      if (dragX > contentsWidth / 2) {
        prevIndex();
      }

      setTransitionEnabled(true);
      setTranslate(0);
    },
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (drag) {
        setDragX(e.pageX - mouseMoveX);

        setTranslate(translateHandler);
      }
    },
    onMouseLeave: () => {
      setDrag(false);
      setTranslate(0);
    },
  };
};
