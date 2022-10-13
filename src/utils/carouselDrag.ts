import { isMobile } from "./checkMobile";
import React, { Dispatch, SetStateAction, useState } from "react";

interface CarouselDragProps {
  contentsWidth: number;
  nextIndex: () => void;
  prevIndex: () => void;
  setTransitionEnabled: Dispatch<SetStateAction<boolean>>;
  setTranslate: Dispatch<SetStateAction<number>>;
}

export const carouselDrag = ({
  contentsWidth,
  nextIndex,
  prevIndex,
  setTransitionEnabled,
  setTranslate,
}: CarouselDragProps) => {
  const [drag, setDrag] = useState<boolean>(false);
  const [mouseMoveX, setMouseMoveX] = useState<number>(0);
  const [dragX, setDragX] = useState<number>(0);

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

          setTranslate(() => {
            if (dragX < -contentsWidth) {
              return -contentsWidth;
            }
            if (dragX > contentsWidth) {
              return contentsWidth;
            }
            return dragX;
          });
        }
      },
      onTouchCancel: () => {
        setDrag(false);
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

        setTranslate(() => {
          if (dragX < -contentsWidth) {
            return -contentsWidth;
          }
          if (dragX > contentsWidth) {
            return contentsWidth;
          }
          return dragX;
        });
      }
    },
    onMouseLeave: () => {
      setDrag(false);
    },
  };
};
