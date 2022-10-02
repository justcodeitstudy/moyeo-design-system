import React, { HtmlHTMLAttributes, useCallback } from "react";
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
  onTabSelect,
}: TabsItemProps) => {
  const handleClick = useCallback(() => {
    if (onTabSelect && value) {
      onTabSelect(value);
    }
  }, [value, onTabSelect]);

  return (
    <StyledItem
      role="tablist"
      aria-selected={selected}
      selected={selected}
      onClick={handleClick}
    >
      {children}
    </StyledItem>
  );
};

Tabs.Item = Item;

const StyledTabs = styled.ul`
  padding: 0;
  margin: 0;
  flex: 1;
`;

const StyledItem = styled.li<TabsItemProps>`
  display: inline-block;
  padding: 14px 20px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: ${({ selected }) => (selected ? `#06CBF7` : `#999999`)};
  background: #ffffff;

  border-bottom: ${({ selected }) =>
    selected ? `2px solid #06CBF7` : "0 solid transparent"};
  cursor: pointer;
  transition: border-bottom-color 0.5s;

  &:hover {
    color: ${({ selected }) => (selected ? `#06CBF7` : `#4d4d4d`)};
  }
`;
