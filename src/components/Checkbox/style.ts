import { Theme } from "../../styles/theme";
import { Size } from "./Checkbox";

export const getCheckboxSize = (boxSize: Size) => {
  const checkbox = {
    medium: { width: 24, height: 24 },
    large: { width: 28, height: 28 },
    small: { width: 20, height: 20 },
  };

  const icon = {
    medium: { width: 18, height: 14 },
    large: { width: 20, height: 16 },
    small: { width: 14, height: 12 },
  };

  return {
    checkbox: checkbox[boxSize],
    icon: icon[boxSize],
  };
};

export const getLabelSize = (boxSize: Size) => {
  const font = {
    medium: { fontSize: Theme.typography.md["font-size"], marginLeft: 12 },
    large: { fontSize: Theme.typography.lg["font-size"], marginLeft: 16 },
    small: { fontSize: Theme.typography.md["font-size"], marginLeft: 12 },
  };

  return font[boxSize];
};
