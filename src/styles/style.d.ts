import "styled-components";
import { Theme as theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof theme.colors;
    typography: typeof theme.typography;
  }
}
