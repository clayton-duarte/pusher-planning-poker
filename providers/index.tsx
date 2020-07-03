import React, { FunctionComponent } from "react";
import { Router } from "next/router";

import Modal from "../components/Modal";
import ModalProvider from "./modal";
import ThemeProvider from "./theme";

interface ProvidersProps {
  router: Router;
}

const Provider: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ModalProvider>
        {children}
        <Modal />
      </ModalProvider>
    </ThemeProvider>
  );
};

export default Provider;
