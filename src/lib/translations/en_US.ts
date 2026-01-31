const en = {
  menu: {
    loading: "Loading...",
    continue: "Continue",
    newGame: "New Game",
    tutorial: "Tutorial",
    settings: "Settings",
    info: "Info",
  },
  settings: {
    title: "Settings",
    theme: "Theme:",
    language: "Language:",
    color: "Color:",
    gridSize: "Grid Size:",
  },
  info: {
    title: "Info",
    howToPlay: {
      title: "How to play?",
      p1: `
        You must determine which squares in a grid are
        <strong class="active">active</strong> and which are
        <strong class="inactive">inactive</strong>.
      `,
      p2: `
        Each numbered cell indicates how many
        <strong class="active">active</strong>
        squares are in its 3x3 neighbourhood.
      `,
      tutorial: "Play the tutorial",
    },
    credits: {
      title: "Credits:",
      madeBy: "Made by:",
      originalIdeaBy: "Original idea by:",
      font: "Font:",
      icons: "Icons:",
      noAi: "No AI was used when making this app",
    },
  },
  game: {
    tutorial: {
      stage1: `
        The goal of the game is to fill all of the squares with appropreate colors.
      `,
      stage2: `
        The 4 in the corner indicates that all of its neighbours including
        itself are <strong class="active">active</strong>. Fill them in!
      `,
      stage3: `
        Now the 2 has all <strong class="active">active</strong> tiles
        satisfied so the rest of the neighbouring tiles are
        <strong class="inactive">inactive</strong>.
      `,
      stage4: `
        Fill in the rest of the squares and finish the puzzle.
      `,
      skip: "Skip the tutorial",
      continue: "Continue",
      finish: "Finish",
    },
    win: "You win!",
    menu: "Menu",
    restart: "Restart",
  },
};

export default en;
