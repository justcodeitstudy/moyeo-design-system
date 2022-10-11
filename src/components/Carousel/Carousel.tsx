import React, {
  Children,
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import CarouselIndicators from "./CarouselIndicators";

export type IndicatorAlign = "left" | "center" | "right";

export interface CarouselProps {
  children: ReactNode;
  autoPlay?: boolean;
  autoPlayTime?: number;
  indicatorAlign?: IndicatorAlign;
  width?: string;
  height?: string;
}

const Carousel = ({
  children,
  autoPlay = false,
  autoPlayTime = 3000,
  indicatorAlign = "left",
  width = "100%",
  height = "252px",
}: CarouselProps) => {
  const totalLength = Children.toArray(children).length + 2;
  const cloneChildren = Children.toArray(children);

  const contentsRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [transitionEnabled, setTransitionEnabled] = useState<boolean>(false);
  const [newChildren, setNewChildren] = useState<ReactNode[]>([]);
  const [drag, setDrag] = useState<boolean>(false);
  const [mouseMoveX, setMouseMoveX] = useState<number>(0);
  const [dragX, setDragX] = useState<number>(0);
  const [contentsWidth, setContentsWidth] = useState<number>(0);
  const [translateX, setTranslate] = useState<number>(0);

  const nextIndex = useCallback(() => {
    if (currentIndex >= totalLength - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  }, [currentIndex, totalLength]);

  const prevIndex = useCallback(() => {
    if (currentIndex <= 0) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex - 1);
  }, [currentIndex, totalLength]);

  const transitionEndHandler = useCallback(() => {
    setTransitionEnabled(false);
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 2);
    } else if (currentIndex === totalLength - 1) {
      setCurrentIndex(1);
    }
  }, [autoPlay, currentIndex, totalLength]);

  const autoPlayNextIndex = useCallback(() => {
    if (currentIndex === totalLength - 2) {
      setTransitionEnabled(true);
      return setCurrentIndex(1);
    }
    setTransitionEnabled(true);
    return setCurrentIndex(currentIndex + 1);
  }, [currentIndex, totalLength]);

  useEffect(() => {
    if (contentsRef.current) {
      setContentsWidth(contentsRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (autoPlay) {
      const playNextIndex = setTimeout(() => {
        autoPlayNextIndex();
      }, autoPlayTime);

      return () => {
        clearTimeout(playNextIndex);
      };
    }
  }, [autoPlay, autoPlayNextIndex]);

  useEffect(() => {
    const cloneElement = cloneChildren.map((child) => {
      return React.cloneElement(child as ReactElement, {
        style: {
          minWidth: "100%",
          display: "inline-block",
        },
      });
    });
    setNewChildren([
      cloneElement[cloneElement.length - 1],
      ...cloneElement,
      cloneElement[0],
    ]);
  }, [totalLength]);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDrag(true);
    setMouseMoveX(e.pageX);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    [dragX, contentsWidth, drag, mouseMoveX],
  );

  const onMouseUp = useCallback(() => {
    setDrag(false);

    if (dragX < -(contentsWidth / 2)) {
      nextIndex();
    }
    if (dragX > contentsWidth / 2) {
      prevIndex();
    }

    setTransitionEnabled(true);
    setTranslate(0);
  }, [dragX, contentsWidth, nextIndex, prevIndex]);

  const onMouseLeave = useCallback(() => {
    setDrag(false);
  }, []);

  return (
    <CarouselContents ref={contentsRef} width={width} height={height}>
      <CarouselItems
        currentIndex={currentIndex}
        transitionEnabled={transitionEnabled}
        contentsWidth={contentsWidth}
        translateX={translateX}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onTransitionEnd={transitionEndHandler}
      >
        {newChildren.map((child, index) => (
          <Fragment key={`carousel-${index}`}>{child}</Fragment>
        ))}
      </CarouselItems>
      {totalLength > 1 && (
        <CarouselIndicators
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          totalLength={totalLength - 2}
          indicatorAlign={indicatorAlign}
          setTransitionEnabled={setTransitionEnabled}
        />
      )}
    </CarouselContents>
  );
};

export default Carousel;

const CarouselContents = styled.div<{ width: string; height: string }>`
  position: relative;

  overflow: hidden;

  width: ${({ width }) => width && width};
  height: ${({ height }) => height && height};

  cursor: pointer;
`;

const CarouselItems = styled.div<{
  currentIndex: number;
  contentsWidth: number;
  translateX: number;
  transitionEnabled: boolean;
}>`
  display: flex;

  height: 100%;

  list-style: none;

  transform: ${({ currentIndex, contentsWidth, translateX }) =>
    `translate3D(${-currentIndex * contentsWidth + translateX}px, 0px, 0px)`};
  transition: ${({ transitionEnabled }) =>
    transitionEnabled && `all 0.4s ease`};

  margin: 0;
  padding: 0;

  user-select: none;
`;
