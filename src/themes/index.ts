import { extendTheme } from "@chakra-ui/react";
import { fonts, colors } from "./fondations";

const overrides = {
  fonts,
  colors,
  styles: {
    global: () => ({
      body: {
        fontFamily: "inter",
        bg: "rgba(249, 250, 251, 1)",
      },
    }),
  },
};

export default extendTheme(overrides);
