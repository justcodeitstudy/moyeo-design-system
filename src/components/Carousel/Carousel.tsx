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
import { useResizeEffect } from "../../utils";
import { carouselDrag } from "../../utils/carouselDrag";

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
  const [contentsWidth, setContentsWidth] = useState<number>(0);
  const [translateX, setTranslate] = useState<number>(0);

  const resizeContentsWidth = useCallback(() => {
    if (contentsRef.current) {
      setContentsWidth(contentsRef.current.clientWidth);
    }
  }, []);

  useResizeEffect(resizeContentsWidth);

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

  return (
    <CarouselContents ref={contentsRef} width={width} height={height}>
      <CarouselItems
        currentIndex={currentIndex}
        transitionEnabled={transitionEnabled}
        contentsWidth={contentsWidth}
        translateX={translateX}
        onTransitionEnd={transitionEndHandler}
        {...carouselDrag({
          contentsWidth,
          nextIndex,
          prevIndex,
          setTransitionEnabled,
          setTranslate,
        })}
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
