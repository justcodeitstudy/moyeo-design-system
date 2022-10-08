import React from "react";
import { ReactNode, MouseEvent, forwardRef } from "react";
import styled from "styled-components";

export interface OptionProps {
  value: string;
  children: ReactNode;
  selected?: boolean;
  onClick?: (e: MouseEvent<Element>) => void;
}

export const Option = forwardRef<HTMLLIElement, OptionProps>(function Option(
  { children, selected, value, onClick, ...rest }: OptionProps,
  ref,
) {
  return (
    <OptionContainer
      ref={ref}
      role="option"
      aria-selected={selected}
      value={value}
      onClick={onClick}
      {...rest}
    >
      <StyledOption value={value} selected={selected}>
        {children}
      </StyledOption>
    </OptionContainer>
  );
});

const OptionContainer = styled("li")`
  display: flex;
  height: 16px;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 10px 12px;
  font-size: 16px;
  font-weight: 300;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[100]};
  }

  &:active {
    ${({ theme }) => theme.typography.header4};
    background: ${({ theme }) => theme.colors.primary[400]};
    color: ${({ theme }) => theme.colors.general.white};
  }
`;

const StyledOption = styled("div")<OptionProps>`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
