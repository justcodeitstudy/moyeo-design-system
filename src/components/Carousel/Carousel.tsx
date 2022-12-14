import React, {
  Children,
  Fragment,
  HTMLAttributes,
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
import { carouselDrag } from "./utils/carouselDrag";

export type IndicatorAlign = "left" | "center" | "right";

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  autoPlay?: boolean;
  autoPlayTime?: number;
  indicatorAlign?: IndicatorAlign;
}

interface CarouselStyledProps {
  currentIndex: number;
  contentsWidth: number;
  translateX: number;
  transitionEnabled: boolean;
  totalLength: number;
}

const Carousel = ({
  children,
  autoPlay = false,
  autoPlayTime = 3000,
  indicatorAlign = "left",
  ...rest
}: CarouselProps) => {
  const totalLength = Children.toArray(children).length + 2;
  const cloneChildren = Children.toArray(children);

  const contentsRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [transitionEnabled, setTransitionEnabled] = useState<boolean>(false);
  const [newChildren, setNewChildren] = useState<ReactNode[]>([]);
  const [contentsWidth, setContentsWidth] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [translateX, setTranslate] = useState<number>(0);
  const [drag, setDrag] = useState<boolean>(false);

  const resizeContentsWidth = useCallback(() => {
    if (contentsRef.current) {
      setContentsWidth(contentsRef.current.clientWidth);
    }
    if (itemRef.current) {
      setItemWidth(itemRef.current.clientWidth);
    }
  }, []);

  useResizeEffect(resizeContentsWidth);

  const nextIndex = useCallback(() => {
    if (currentIndex >= totalLength - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
  }, [currentIndex, totalLength]);

  const prevIndex = useCallback(() => {
    if (currentIndex <= 0) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex((prevCurrentIndex) => prevCurrentIndex - 1);
  }, [currentIndex]);

  const transitionEndHandler = useCallback(() => {
    setTransitionEnabled(false);
    if (currentIndex === 0) {
      return setCurrentIndex(totalLength - 2);
    }
    if (currentIndex === totalLength - 1) {
      return setCurrentIndex(1);
    }
  }, [currentIndex, totalLength]);

  const autoPlayNextIndex = useCallback(() => {
    if (currentIndex === totalLength - 2) {
      setTransitionEnabled(true);
      setCurrentIndex(1);
    } else {
      setTransitionEnabled(true);
      setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
    }
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

      if (drag) {
        clearTimeout(playNextIndex);
      }

      return () => {
        clearTimeout(playNextIndex);
      };
    }
  }, [autoPlay, drag, autoPlayNextIndex, autoPlayTime]);

  useEffect(() => {
    const cloneElement = cloneChildren.map((child) => {
      return React.cloneElement(child as ReactElement, { ref: itemRef });
    });
    setNewChildren([
      cloneElement[cloneElement.length - 1],
      ...cloneElement,
      cloneElement[0],
    ]);
  }, [contentsWidth]);

  const isServerSide = () => {
    return typeof window === "undefined";
  };

  if (isServerSide()) {
    return null;
  }

  return (
    <CarouselContents ref={contentsRef} {...rest}>
      <CarouselItems
        currentIndex={currentIndex}
        transitionEnabled={transitionEnabled}
        contentsWidth={contentsWidth}
        translateX={translateX}
        onTransitionEnd={transitionEndHandler}
        totalLength={totalLength}
        {...carouselDrag({
          contentsWidth,
          nextIndex,
          prevIndex,
          setTransitionEnabled,
          setTranslate,
          drag,
          setDrag,
        })}
      >
        {newChildren.map((child, index) => (
          <Fragment key={`carousel-${index}`}>{child}</Fragment>
        ))}
      </CarouselItems>
      <CarouselIndicatorsWrapper itemWidth={itemWidth}>
        {totalLength > 1 && (
          <CarouselIndicators
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            totalLength={totalLength - 2}
            indicatorAlign={indicatorAlign}
            setTransitionEnabled={setTransitionEnabled}
          />
        )}
      </CarouselIndicatorsWrapper>
    </CarouselContents>
  );
};

export default Carousel;

const CarouselContents = styled.div`
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 252px;

  cursor: pointer;
`;

const CarouselItems = styled.div.attrs<CarouselStyledProps>(
  ({
    currentIndex,
    contentsWidth,
    translateX,
    transitionEnabled,
    totalLength,
  }) => ({
    style: {
      width: `${contentsWidth * totalLength}px`,
      transform: `translate3D(${
        -currentIndex * contentsWidth + translateX
      }px, 0px, 0px)`,
      transition: transitionEnabled ? "all 0.4s ease" : undefined,
    },
  }),
)<CarouselStyledProps>`
  display: flex;

  height: 100%;

  list-style: none;

  margin: 0;
  padding: 0;

  user-select: none;
`;

const CarouselIndicatorsWrapper = styled.div<{ itemWidth: number }>`
  width: ${({ itemWidth }) => (itemWidth ? `${itemWidth}px` : "1220px")};
  margin: 0 auto;
  position: relative;
`;
