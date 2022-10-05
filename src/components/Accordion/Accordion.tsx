import React, { HTMLAttributes, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";
import AccordionContext from "./AccordionContext";

export type ArrowAlign = "left" | "right";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  isExpanded?: boolean;
  align?: ArrowAlign;
}

const Accordion = ({
  isExpanded = true,
  align = "right",
  children,
  ...rest
}: AccordionProps) => {
  const [value, setValue] = useState(isExpanded);
  const contextValue = useMemo(
    () => ({
      value,
      align,
      setValue,
    }),
    [value, setValue],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <StyledAccordion {...rest}>{children}</StyledAccordion>
    </AccordionContext.Provider>
  );
};

export default Object.assign(Accordion, {
  Title: AccordionTitle,
  Content: AccordionContent,
});

const StyledAccordion = styled.div``;
