import React, { HtmlHTMLAttributes, MouseEvent, useCallback } from "react";
import styled from "styled-components";

export type TabsProps = HtmlHTMLAttributes<HTMLUListElement>;

export const Tabs = ({ children, ...rest }: TabsProps) => {
  return (
    <StyledTabs role="tab" {...rest}>
      {children}
    </StyledTabs>
  );
};

interface TabsItemProps extends HtmlHTMLAttributes<HTMLLIElement> {
  value?: string;
  selected?: boolean;
  onTabSelect?: (value: string) => void;
}

export const Item = ({
  value,
  selected = false,
  children,
  onClick,
  onTabSelect,
  ...rest
}: TabsItemProps) => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      if (value) {
        onTabSelect?.(value);
      }
      onClick?.(e);
    },
    [value, onTabSelect],
  );

  return (
    <StyledItem
      role="tablist"
      aria-selected={selected}
      selected={selected}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </StyledItem>
  );
};

Tabs.Item = Item;

const StyledTabs = styled.ul`
  width: max-content;
  overflow-x: scroll;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const StyledItem = styled.li<TabsItemProps>`
  display: inline-block;
  padding: 14px 20px;
  ${({ theme }) => theme.typography.header3};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.primary[500] : theme.colors.text.secondary};
  border-bottom: ${({ theme, selected }) =>
    selected
      ? `2px solid ${theme.colors.primary[500]}`
      : "0 solid transparent"};
  background: #ffffff;
  transition: border-bottom-color 0.5s;
  cursor: pointer;

  &:hover {
    color: ${({ theme, selected }) =>
      selected ? theme.colors.primary[500] : theme.colors.text.primary};
  }

  @media (max-width: ${({ theme }) => `${theme.breakpoints.md - 1}px`}) {
    ${({ theme }) => theme.typography.md};
  }
`;
