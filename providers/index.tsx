import React, { FunctionComponent } from "react";
import { Router } from "next/router";

import Modal from "../components/Modal";
import ModalProvider from "./modal";
import ThemeProvider from "./theme";
import UserProvider from "./user";

interface ProvidersProps {
  router: Router;
}

const Provider: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <ModalProvider>
          {children}
          <Modal />
        </ModalProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default Provider;
