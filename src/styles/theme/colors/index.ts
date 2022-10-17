import {
  BlackPalette,
  ColorPalette,
  GeneralPalette,
  PrimaryPalette,
  TextPalette,
} from "./ColorPalette";

const primary: PrimaryPalette = {
  "50": "#F3FCFF",
  "100": "#E6FAFE",
  "200": "#C1F2FD",
  "300": "#9BEAFC",
  "400": "#51DBF9",
  "500": "#06CBF7",
  "600": "#05B7DE",
  "700": "#0598b9",
  "800": "#047a94",
  "900": "#036379",
  disabled: "#e6e6e6",
};

const warning: ColorPalette = {
  "50": "#fffbf2",
  "100": "#fef7e6",
  "200": "#FFE6B4",
  "300": "#fce099",
  "400": "#FAC94D",
  "500": "#F8B200",
  "600": "#DFA000",
  "700": "#ba8600",
  "800": "#956b00",
  "900": "#7a5700",
};

const general: GeneralPalette = {
  white: "#ffffff",
  "50": "#fbfbfb",
  "100": "#f7f7f7",
  "200": "#ebebeb",
  "300": "#dfdfdf",
  "400": "#c7c7c7",
  "500": "#afafaf",
  "600": "#9e9e9e",
  "700": "#838383",
  "800": "#696969",
  "900": "#565656",
};

const black: BlackPalette = {
  "50": "#f2f2f2",
  "100": "#e6e6e6",
  "200": "#bfbfbf",
  "300": "#999999",
  "400": "#4d4d4d",
  "500": "#000000",
};

const success: ColorPalette = {
  "50": "#f3fcf5",
  "100": "#e7f9eb",
  "200": "#c3efcd",
  "300": "#9fe5af",
  "400": "#58d274",
  "500": "#10be38",
  "600": "#0eab32",
  "700": "#0c8f2a",
  "800": "#0a7222",
  "900": "#085d1b",
};

const danger: ColorPalette = {
  "50": "#fff5f5",
  "100": "#ffecec",
  "200": "#ffcfcf",
  "300": "#ffb1b1",
  "400": "#ff7777",
  "500": "#F32F2F",
  "600": "#DB2A2A",
  "700": "#B62323",
  "800": "#992525",
  "900": "#7d1e1e",
};

const text: TextPalette = {
  title: "#000000",
  primary: "#4d4d4d",
  secondary: "#999999",
  third: "#BFBFBF",
  disabled: "#e6e6e6",
};

const colors = {
  primary,
  warning,
  general,
  black,
  success,
  danger,
  text,
};

export default colors;
