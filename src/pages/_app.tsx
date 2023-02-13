import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { wrapper } from "@/store";
import themes from "@/themes";

export function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={themes}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default wrapper.withRedux(App);
