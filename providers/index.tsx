import React, { FunctionComponent } from "react";

import ThemeProvider from "./theme";
import { Router } from "next/router";

interface ProvidersProps {
  router: Router;
}

const Provider: FunctionComponent<ProvidersProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Provider;
