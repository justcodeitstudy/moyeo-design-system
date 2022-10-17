import { Theme } from "styles/theme";
import { Color } from "./Chip";

const getOutLineColor = (color: Color) => {
  switch (color) {
    case "active":
      return Theme.colors.primary["500"];
    case "danger":
      return Theme.colors.danger["500"];
    case "warning":
      return Theme.colors.warning["500"];
    default:
      return "#fff";
  }
};

export const getBorderColor = (color: Color, outlined?: boolean) => {
  if (color === "basic") {
    return Theme.colors.general["300"];
  }
  if (outlined) {
    return getOutLineColor(color);
  }
  return "none";
};

export const getColor = (color: Color, outlined?: boolean) => {
  if (color === "basic") {
    return Theme.colors.general["600"];
  }
  if (outlined) {
    return getOutLineColor(color);
  }
  return "#fff";
};

export const getBackgroundColor = (color: Color, outlined?: boolean) => {
  if (outlined) {
    return "#fff";
  }
  return getOutLineColor(color);
};
