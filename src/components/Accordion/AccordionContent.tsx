import React, { HTMLAttributes, useContext, useLayoutEffect } from "react";
import styled from "styled-components";
import AccordionContext from "./AccordionContext";

export type AccordionContentProps = HTMLAttributes<HTMLDivElement>;

const AccordionContent = ({ children, ...rest }: AccordionContentProps) => {
  const { value } = useContext(AccordionContext);

  return (
    <StyledAccordionContent isExpanded={value} {...rest}>
      {children}
    </StyledAccordionContent>
  );
};

export default AccordionContent;

const StyledAccordionContent = styled.div<{
  isExpanded: boolean;
}>`
  height: ${({ isExpanded }) => (isExpanded ? "auto" : "0")};
  padding: ${({ isExpanded }) => (isExpanded ? "12px 16px 20px 16px" : "0")};
  border-bottom: ${({ theme, isExpanded }) =>
    isExpanded ? `1px solid ${theme.colors.general[300]}` : ""};
  color: ${({ theme }) => theme.colors.general[600]};
  ${({ theme }) => theme.typography.sm};
  background-color: white;
  overflow: hidden;

  transition: height 0.3s;
`;
