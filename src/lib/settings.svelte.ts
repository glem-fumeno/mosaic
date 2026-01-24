import type { Color, Theme } from "./types";

let theme = $state<Theme>("dark");
let color = $state<Color>("purple");

const settings = {
  get theme() {
    return theme;
  },
  get color() {
    return color;
  },
  setColor(newColor: Color) {
    color = newColor;
  },

  setTheme(newTheme: Theme) {
    theme = newTheme;
  },
};

export default settings;
