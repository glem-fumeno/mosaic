const pl = {
  menu: {
    loading: "Ładowanie...",
    continue: "Kontynuuj",
    newGame: "Nowa Gra",
    tutorial: "Samouczek",
    settings: "Ustawienia",
    info: "O aplikacji",
  },
  settings: {
    title: "Ustawienia",
    theme: "Motyw:",
    language: "Język:",
    color: "Kolor:",
    gridSize: "Rozmiar planszy:",
  },
  info: {
    title: "O aplikacji",
    howToPlay: {
      title: "Instrukcja:",
      p1: `
        Celem gry jest odkrycie, które kafelki na planszy są
        <strong class="active">aktywne</strong>, a które
        <strong class="inactive">nieaktywne</strong>.
      `,
      p2: `
        Każdy ponumerowany kafelek wskazuje na to
        jak dużo <strong class="active">aktywnych</strong>
        kafelków jest w jego otoczeniu (3x3).
      `,
      tutorial: "Zagraj w samouczek",
    },
    credits: {
      title: "Źródła:",
      madeBy: "Zrobione przez:",
      originalIdeaBy: "Oryginalny pomysł:",
      font: "Czcionka:",
      icons: "Ikony:",
      noAi: "Aplikacja stworzona bez użycia AI",
    },
  },
  game: {
    tutorial: {
      stage1: `
        Celem gry jest wypełnienie wszystkich kafelków odpowiednimi kolorami.
      `,
      stage2: `
        Kafelek z 4 w rogu wskazuje na to że wszystkie otaczające go kafelki
        (włącznie z nim) są <strong class="active">aktywne</strong>.
        Wypełnij je!
      `,
      stage3: `
        Teraz kafelek z numerem 2 ma spełnioną liczbę
        <strong class="active">aktywnych</strong> kafelków więc pozostałe
        otaczające kafelki są <strong class="inactive">nieaktywne</strong>.
      `,
      stage4: `
        Uzupełnij resztę planszy aby rozwiązać łamigłówkę.
      `,
      skip: "Pomiń samouczek",
      continue: "Dalej",
      finish: "Zakończ",
    },
    win: "Wygrana!",
    menu: "Menu",
    restart: "Restart",
  },
};

export default pl;
