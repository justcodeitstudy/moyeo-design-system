import React, { HTMLAttributes, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AccordionContext from "./AccordionContext";

export type AccordionContentProps = HTMLAttributes<HTMLDivElement>;

const AccordionContent = ({ children, ...rest }: AccordionContentProps) => {
  const [height, setHeight] = useState("");
  const { value } = useContext(AccordionContext);
  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      setHeight(`${ref.current.clientHeight}px`);
    }
  }, []);

  return (
    <StyledAccordionContent height={height} isExpanded={value} {...rest}>
      <div ref={ref} style={{ padding: "12px 16px 20px 16px" }}>
        {children}
      </div>
    </StyledAccordionContent>
  );
};

export default AccordionContent;

const StyledAccordionContent = styled.div<{
  height: string;
  isExpanded: boolean;
}>`
  height: ${({ height, isExpanded }) => (isExpanded ? height : "0")};
  border-bottom: ${({ theme, isExpanded }) =>
    isExpanded ? `1px solid ${theme.colors.general[300]}` : ""};
  color: ${({ theme }) => theme.colors.general[600]};
  ${({ theme }) => theme.typography.sm};
  background-color: ${({ theme }) => theme.colors.general.white};
  overflow: hidden;
  transition: height 0.3s;
`;
