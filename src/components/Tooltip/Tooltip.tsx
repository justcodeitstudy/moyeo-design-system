import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

type TooltipColor = "basic" | "primary" | "black";
const tooltipColorStyle: Record<TooltipColor, FlattenSimpleInterpolation> = {
  basic: css`
    background-color: #fff;
    border-color: #dfdfdf;
    color: #4d4d4d;
  `,
  primary: css`
    background-color: #06cbf7;
    border-color: #06cbf7;
    color: #fff;
  `,
  black: css`
    background-color: #4d4d4d;
    border-color: #4d4d4d;
    color: #fff;
  `,
};

type TooltipPosition = "bottom" | "top";
const tooltipPositionStyle: Record<
  TooltipPosition,
  FlattenSimpleInterpolation
> = {
  bottom: css`
    top: calc(100% + 10px);

    &:after {
      top: -7px;
      transform: rotate(45deg);
    }
  `,
  top: css`
    bottom: calc(100% + 10px);

    &:after {
      bottom: -7px;
      transform: rotate(225deg);
    }
  `,
};

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: TooltipPosition;
  color?: TooltipColor;
}

const TooltipContainer = styled.div`
  width: fit-content;
  position: relative;

  &:hover > [role="tooltip"] {
    opacity: 1;
    visibility: visible;
  }
`;

type TooltipContentProps = Required<Pick<TooltipProps, "position" | "color">>;
const TooltipContent = styled.div<TooltipContentProps>`
  width: max-content;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  opacity: 0;
  visibility: hidden;

  padding: 8px 12px;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 400;

  border: 1px solid;

  ${({ position }) => tooltipPositionStyle[position]};
  ${({ color }) => tooltipColorStyle[color]};

  &:after {
    content: "";
    position: absolute;
    left: calc(50% - 6px);

    border: 1px solid;
    ${({ color }) => tooltipColorStyle[color]};

    width: 12px;
    height: 12px;
    border-top-left-radius: 3px;
    -webkit-clip-path: polygon(0 0, 0% 100%, 100% 0);
    clip-path: polygon(0 0, 0% 100%, 100% 0);
  }
`;

const Tooltip = ({
  children,
  content,
  position = "bottom",
  color = "basic",
}: TooltipProps) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipContent role="tooltip" position={position} color={color}>
        {content}
      </TooltipContent>
    </TooltipContainer>
  );
};

export default Tooltip;
