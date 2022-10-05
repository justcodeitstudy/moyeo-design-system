import React from "react";
import { ArrowAlign } from "./Accordion";

export interface AccordionContextValue {
  value: boolean;
  align: ArrowAlign;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const context = React.createContext<AccordionContextValue>({
  value: true,
  align: "right",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setValue: () => {},
});

export default context;
