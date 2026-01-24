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
    this.saveSettings();
  },
  setBoardSize(newBoardSize: number) {
    boardSize = newBoardSize;
    this.saveSettings();
  },
  setTheme(newTheme: Theme) {
    theme = newTheme;
    this.saveSettings();
  },
  saveSettings() {
    window.localStorage.setItem("theme", theme);
    window.localStorage.setItem("color", color);
    window.localStorage.setItem("boardSize", boardSize.toString());
  },
  loadSettings() {
    theme = (window.localStorage.getItem("theme") ?? "dark") as Theme;
    color = (window.localStorage.getItem("color") ?? "purple") as Color;
    boardSize = +(window.localStorage.getItem("boardSize") ?? "10");
  },
};

export default settings;
