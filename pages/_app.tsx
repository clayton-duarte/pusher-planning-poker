import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";

import Providers from "../providers";

const App: FunctionComponent<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <Providers router={router}>
      <Component {...pageProps} />
    </Providers>
  );
};

export default App;
