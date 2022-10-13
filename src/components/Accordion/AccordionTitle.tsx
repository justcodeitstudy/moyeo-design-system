import React, { HTMLAttributes, useCallback, useContext } from "react";
import styled from "styled-components";
import AccordionContext from "./AccordionContext";
import { ArrowIcon } from "Icon/svg";
import { Align } from "./Accordion";

type AccordionTitleProps = HTMLAttributes<HTMLDivElement>;

const AccordionTitle = ({
  children,
  onClick,
  ...rest
}: AccordionTitleProps) => {
  const { value, align, setValue } = useContext(AccordionContext);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setValue(!value);
      onClick?.(e);
    },
    [value, setValue, onClick],
  );

  return (
    <Wrapper align={align} onClick={handleClick} {...rest}>
      {align === "left" && (
        <IconWrapper isExpanded={value} align={align}>
          <ArrowIcon />
        </IconWrapper>
      )}
      {children}
      {align === "right" && (
        <IconWrapper isExpanded={value} align={align}>
          <ArrowIcon />
        </IconWrapper>
      )}
    </Wrapper>
  );
};

export default AccordionTitle;

const Wrapper = styled.div<{ align: Align }>`
  display: flex;
  padding: 13px 12px 13px 16px;
  justify-content: ${({ align }) =>
    align === "right" ? "space-between" : "flex-start"};
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.general[300]};
  ${({ theme }) => theme.typography.sm};
  cursor: pointer;
`;

const IconWrapper = styled.div<{ isExpanded: boolean; align: Align }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: ${({ align }) => (align === "left" ? "8px" : "0")};
  transform: ${({ isExpanded }) => (isExpanded ? "rotate(-180deg)" : "")};
  transition: transform 0.3s;
`;
