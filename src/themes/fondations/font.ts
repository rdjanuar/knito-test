import { Inter } from "@next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

export const fonts = {
  inter: inter.style.fontFamily,
};
