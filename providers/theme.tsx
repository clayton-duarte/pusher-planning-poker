import React, { FunctionComponent } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

enum Palette {
  primary = "#444444",
  secondary = "#666666",
  text = "#222222",
  bg = "#eeeeee",
}

const theme = {
  palette: Palette,
};

export type Theme = typeof theme;

const GlobalStyle = createGlobalStyle<Theme>`
body, html, #__next {
  font-family: monospace;
  background: ${(props) => props.theme.palette.bg};
  color: ${(props) => props.theme.palette.text};
}
`;

const Provider: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default Provider;
