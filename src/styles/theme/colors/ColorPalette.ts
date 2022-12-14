export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface TextPalette {
  title: string;
  primary: string;
  secondary: string;
  third: string;
  disabled: string;
}

export type PrimaryPalette = ColorPalette & { disabled: string };
export type GeneralPalette = ColorPalette & { white: string };
export type BlackPalette = Omit<ColorPalette, 600 | 700 | 800 | 900>;
