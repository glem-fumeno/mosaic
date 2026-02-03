import { setLanguage } from "$lib/translations/language.svelte";
import type { Color, Theme, Page, Language } from "$lib/types";

let theme = $state<Theme>("dark");
let color = $state<Color>("purple");
let language = $state<Language>("English");
let boardSize = $state(6);
let preloadedPages = $state<Page[]>([]);
let tutorialFinished = $state<boolean>(false);
let timerShown = $state<boolean>(true);

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
  get timerShown() {
    return timerShown;
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
  setTimerShown(newTimerShown: boolean) {
    timerShown = newTimerShown;
    this.saveSettings();
  },
  saveSettings() {
    localStorage.setItem("theme", theme);
    localStorage.setItem("color", color);
    localStorage.setItem("boardSize", boardSize.toString());
    localStorage.setItem("language", language);
    localStorage.setItem("tutorialFinished", tutorialFinished.toString());
    localStorage.setItem("timerShown", timerShown.toString());
  },
  loadSettings() {
    theme = (localStorage.getItem("theme") ?? "dark") as Theme;
    color = (localStorage.getItem("color") ?? "purple") as Color;
    boardSize = +(localStorage.getItem("boardSize") ?? "6");
    language = (localStorage.getItem("language") ?? "English") as Language;
    tutorialFinished = localStorage.getItem("tutorialFinished") === "true";
    timerShown = localStorage.getItem("timerShown") !== "false";
    setLanguage(language);
  },
};

export default settings;
