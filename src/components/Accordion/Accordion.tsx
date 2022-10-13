import React, { HTMLAttributes, useMemo, useState } from "react";
import styled from "styled-components";
import AccordionContent from "./AccordionContent";
import AccordionContext from "./AccordionContext";
import AccordionTitle from "./AccordionTitle";

export type Align = "left" | "right";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  align?: Align;
  isExpanded?: boolean;
}

const Accordion = ({
  align = "right",
  isExpanded = true,
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
