import React, {
  Children,
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import CarouselIndicators from "./CarouselIndicators";

export type IndicatorAlign = "left" | "center" | "right";

export interface CarouselProps {
  children: ReactNode;
  infiniteLoop?: boolean;
  autoPlay?: boolean;
  autoPlayTime?: number;
  indicatorAlign?: IndicatorAlign;
  width?: string;
  height?: string;
}

const Carousel = ({
  children,
  infiniteLoop = false,
  autoPlay = false,
  autoPlayTime = 3000,
  indicatorAlign = "left",
  width = "100%",
  height = "252px",
}: CarouselProps) => {
  const totalLength = Children.toArray(children).length;
  const cloneChildren = Children.toArray(children);

  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? 1 : 0);
  const [isInfinite, setIsInfinite] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [newChildren, setNewChildren] = useState<ReactNode[]>([]);

  const nextIndex = useCallback(() => {
    if (isInfinite || currentIndex < totalLength - 1) {
      return setCurrentIndex(currentIndex + 1);
    }
    if (!isInfinite) {
      if (currentIndex >= totalLength - 1) {
        return setCurrentIndex(0);
      }
      return setCurrentIndex(currentIndex + 1);
    }
  }, [isInfinite, currentIndex, totalLength]);

  const transitionEndHandler = useCallback(() => {
    if (isInfinite) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(totalLength);
      } else if (currentIndex === totalLength + 1) {
        setTransitionEnabled(false);
        setCurrentIndex(1);
      }
    }
  }, [isInfinite, currentIndex, totalLength]);

  useEffect(() => {
    setNewChildren(
      cloneChildren.map((child) => {
        return React.cloneElement(child as ReactElement, {
          style: {
            minWidth: "100%",
            display: "inline-block",
          },
        });
      }),
    );
  }, []);

  useEffect(() => {
    setIsInfinite(infiniteLoop && totalLength > 1);
  }, [infiniteLoop, totalLength]);

  useEffect(() => {
    if (isInfinite && (currentIndex === 1 || currentIndex === totalLength)) {
      setTransitionEnabled(true);
    }
  }, [currentIndex, isInfinite, totalLength]);

  useEffect(() => {
    if (autoPlay) {
      const playNextIndex = setTimeout(() => {
        nextIndex();
      }, autoPlayTime);

      return () => {
        clearTimeout(playNextIndex);
        transitionEndHandler();
      };
    }
  }, [autoPlay, autoPlayTime, transitionEndHandler, nextIndex]);

  useEffect(() => {
    if (isInfinite && totalLength > 1) {
      setNewChildren((prevState) => [
        newChildren[totalLength - 1],
        ...prevState,
      ]);
      setNewChildren((prevState) => [...prevState, newChildren[0]]);
    }
  }, [isInfinite, totalLength]);

  return (
    <CarouselContents width={width} height={height}>
      <CarouselItems
        currentIndex={currentIndex}
        transitionEnabled={transitionEnabled}
        onTransitionEnd={transitionEndHandler}
      >
        {newChildren.map((child, index) => (
          <Fragment key={`carousel-${index}`}>{child}</Fragment>
        ))}
      </CarouselItems>
      {totalLength > 1 && (
        <CarouselIndicators
          isInfinite={isInfinite}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          totalLength={totalLength}
          indicatorAlign={indicatorAlign}
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

  user-select: none;
  cursor: pointer;
`;

const CarouselItems = styled.div<{
  currentIndex: number;
  transitionEnabled: boolean;
}>`
  display: flex;

  height: 100%;

  list-style: none;

  transform: ${({ currentIndex }) =>
    `translate3d(-${currentIndex}00%, 0px, 0px)`};

  transition: ${({ transitionEnabled }) =>
    transitionEnabled && `all 0.4s ease`};

  margin: 0;
  padding: 0;
`;
