import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: Pretendard, sans-serif;
  }
`;

export default GlobalStyle;
