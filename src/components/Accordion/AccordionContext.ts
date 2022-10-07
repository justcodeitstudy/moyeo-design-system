import React from "react";
import { Align } from "./Accordion";

export interface AccordionContextValue {
  value: boolean;
  align: Align;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const context = React.createContext<AccordionContextValue>({
  align: "right",
  value: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setValue: () => {},
});

export default context;
