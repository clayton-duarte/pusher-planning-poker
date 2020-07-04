import React, { FunctionComponent } from "react";
import baseStyled, {
  ThemedStyledInterface,
  createGlobalStyle,
  ThemeProvider,
} from "styled-components";

enum Palette {
  primary = "#444444",
  secondary = "#666666",
  success = "#339933",
  error = "#993333",
  text = "#222222",
  bg = "#eeeeee",
}

const theme = {
  palette: Palette,
};

export type Theme = typeof theme;

const GlobalStyle = createGlobalStyle<Theme>`
body, html, #__next {
  background: ${(props) => props.theme.palette.bg};
  color: ${(props) => props.theme.palette.text};
  font-family: monospace;
  font-size: 16px;
  margin: 0;
}
* {
  box-sizing: border-box;
}
button, *[role="button"] {
  cursor: pointer;
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

export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default Provider;
