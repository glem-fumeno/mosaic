import { setLanguage } from "./translations/language.svelte";
import type { Color, Theme, Page, Language } from "./types";

let theme = $state<Theme>("dark");
let color = $state<Color>("purple");
let language = $state<Language>("English");
let boardSize = $state(6);
let preloadedPages = $state<Page[]>([]);
let tutorialFinished = $state<boolean>(false);

const settings = {
  get preloadedPages() {
    return preloadedPages;
  },
  get theme() {
    return theme;
  },
  get color() {
    return color;
  },
  get language() {
    return language;
  },
  get boardSize() {
    return boardSize;
  },
  get tutorialFinished() {
    return tutorialFinished;
  },
  addPreloadedPage(page: Page) {
    preloadedPages.push(page);
  },
  nextPage(page: Page): Page {
    switch (page) {
      case "/":
        return "/game";
      case "/game":
        return "/settings";
      case "/settings":
        return "/info";
      case "/info":
        return "/";
    }
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
  setLanguage(newLanguage: Language) {
    language = newLanguage;
    setLanguage(newLanguage);
    this.saveSettings();
  },
  setTutorialFinished(newTutorialFinished: boolean) {
    tutorialFinished = newTutorialFinished;
    this.saveSettings();
  },
  saveSettings() {
    localStorage.setItem("theme", theme);
    localStorage.setItem("color", color);
    localStorage.setItem("boardSize", boardSize.toString());
    localStorage.setItem("language", language);
    localStorage.setItem("tutorialFinished", tutorialFinished.toString());
  },
  loadSettings() {
    theme = (localStorage.getItem("theme") ?? "dark") as Theme;
    color = (localStorage.getItem("color") ?? "purple") as Color;
    boardSize = +(localStorage.getItem("boardSize") ?? "6");
    language = (localStorage.getItem("language") ?? "English") as Language;
    tutorialFinished = localStorage.getItem("tutorialFinished") === "true";
    setLanguage(language);
  },
};

export default settings;
