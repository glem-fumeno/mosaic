import type { Color, Theme } from "./types";

let theme = $state<Theme>("dark");
let color = $state<Color>("purple");
let boardSize = $state(10);

const settings = {
  get theme() {
    return theme;
  },
  get color() {
    return color;
  },
  get boardSize() {
    return boardSize;
  },
  setColor(newColor: Color) {
    color = newColor;
  },
  setBoardSize(newBoardSize: number) {
    boardSize = newBoardSize;
  },

  setTheme(newTheme: Theme) {
    theme = newTheme;
  },
};

export default settings;
