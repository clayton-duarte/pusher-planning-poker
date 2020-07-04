import React, { FunctionComponent } from "react";
import { Router } from "next/router";

import Modal from "../components/Modal";
import ModalProvider from "./modal";
import ThemeProvider from "./theme";
import RoomProvider from "./room";
import UserProvider from "./user";

interface ProvidersProps {
  router: Router;
}

const Provider: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <RoomProvider>
          <ModalProvider>
            {children}
            <Modal />
          </ModalProvider>
        </RoomProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default Provider;
