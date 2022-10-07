import React, {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
} from "react";
import styled, { css } from "styled-components";
import { IndicatorAlign } from "./Carousel";

interface CarouselDotsProps extends HTMLAttributes<HTMLLIElement> {
  isInfinite: boolean;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  totalLength: number;
  indicatorAlign: IndicatorAlign;
}

const CarouselIndicators = ({
  totalLength,
  currentIndex,
  setCurrentIndex,
  indicatorAlign,
  isInfinite,
}: CarouselDotsProps) => {
  const totalIndexArray = [...Array(totalLength).keys()];

  const onClickDotHandler = useCallback(
    (index: number) => {
      if (isInfinite) {
        return setCurrentIndex(index + 1);
      }
      return setCurrentIndex(index);
    },
    [isInfinite, setCurrentIndex],
  );

  return (
    <Indicators indicatorAlign={indicatorAlign}>
      {totalIndexArray.map((value) => (
        <Dot
          key={value}
          role="button"
          aria-label={`dot-${value}`}
          currentIndex={currentIndex}
          value={isInfinite ? value + 1 : value}
          onClick={() => onClickDotHandler(value)}
        />
      ))}
    </Indicators>
  );
};

export default CarouselIndicators;

const Indicators = styled.ul<{ indicatorAlign: IndicatorAlign }>`
  position: absolute;

  height: 16px;

  padding: 4px 10px;

  display: flex;
  align-items: center;

  ${({ indicatorAlign }) => {
    switch (indicatorAlign) {
      case "left":
        return css`
          left: 0;
          bottom: 36px;
        `;
      case "center":
        return css`
          left: 50%;
          transform: translate(-50%, 0%);
          bottom: 36px;
        `;
      case "right":
        return css`
          right: 0;
          bottom: 36px;
        `;
      default:
        return;
    }
  }}

  gap: 12px;

  z-index: 1;

  list-style: none;

  background: #fff;
  opacity: 0.5;

  border-radius: 16px;
`;

const Dot = styled.li<{ currentIndex: number }>`
  background: ${({ currentIndex, value }) =>
    currentIndex === value ? "#12d4ff" : "#e6e6e6"};

  width: 8px;
  height: 8px;
  border-radius: 50%;

  cursor: pointer;
`;
