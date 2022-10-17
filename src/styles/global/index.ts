import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Pretendard, sans-serif;
  }

  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0; }
  img { border:none; }
  ol,ul,li { list-style:none; }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }
`;
