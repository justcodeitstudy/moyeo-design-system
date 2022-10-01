import React from "react";
import { ThemeProvider } from "styled-components";
import { Theme } from "../src/styles/theme";
import GlobalStyle from "../src/styles/global";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    sort: "requiredFirst",
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  exclude: ["ref", "theme", "as", "forwardedAs"],
  viewMode: "docs",
};
