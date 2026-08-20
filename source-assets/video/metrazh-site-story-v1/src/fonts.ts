import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const persianFontFamily = "Vazirmatn";

void loadFont({
  family: persianFontFamily,
  url: staticFile("fonts/vazirmatn-arabic-wght-normal.woff2"),
  weight: "100 900",
  display: "swap",
});
