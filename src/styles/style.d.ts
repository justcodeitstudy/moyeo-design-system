import "styled-components";
import colors from "./theme/colors";
import typography from "./theme/typography";
import breakpoints from "./theme/breakpoints";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof colors;
    typography: typeof typography;
    breakpoints: typeof breakpoints;
  }
}
