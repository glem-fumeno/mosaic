import { getNeighbouringTiles, reset } from "$lib/mosaic";
import settings from "./settings.svelte";
import type { Tile, TileState } from "$lib/types";

let board = $state<Tile[][]>([]);
let errors = $state<number>(0);
let timer = $state<number>(0);
let pauseTimer = $state(() => {});
let currentTool = $state<TileState>("active");
let gameState = $state<"running" | "won">("running");
const tutorialBoard: { s: TileState; n?: number }[][] = [
  [{ s: "active", n: 4 }, { s: "active" }, { s: "inactive", n: 2 }],
  [{ s: "active" }, { s: "active" }, { s: "inactive" }],
  [{ s: "inactive" }, { s: "active", n: 4 }, { s: "active", n: 3 }],
];
const tutorialStages = [
  [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
];

const game = {
  get board() {
    return board;
  },
  get errors() {
    return errors;
  },
  get timer() {
    let minutes = Math.floor(timer / 60).toString();
    let seconds = (timer % 60).toString();

    if (+seconds < 10) seconds = `0${seconds}`;
    if (+minutes < 10) minutes = `0${minutes}`;
    return `${minutes}:${seconds}`;
  },
  get currentTool() {
    return currentTool;
  },
  get gameState() {
    return gameState;
  },
  setTimer() {
    const interval = setInterval(() => {
      timer++;
    }, 1000);
    pauseTimer = () => clearInterval(interval);
  },
  stopTimer() {
    pauseTimer();
  },
  resetGrid() {
    localStorage.removeItem(`tiles ${settings.boardSize}`);
    localStorage.removeItem(`errors ${settings.boardSize}`);
    localStorage.removeItem(`timer ${settings.boardSize}`);
    board = reset(settings.boardSize);
    gameState = "running";
    errors = 0;
    timer = 0;
    pauseTimer();
    this.setTimer();
  },
  saveTiles() {
    localStorage.setItem(`tiles ${settings.boardSize}`, JSON.stringify(board));
    localStorage.setItem(`errors ${settings.boardSize}`, errors.toString());
    localStorage.setItem(`timer ${settings.boardSize}`, timer.toString());
  },
  loadTutorialStage(stage: number) {
    let newBoard = structuredClone($state.snapshot(board));
    if (board.length !== tutorialBoard.length || stage === 0) {
      newBoard = reset(3);
    }
    tutorialBoard.forEach((t, y) => {
      t.forEach(({ s, n }, x) => {
        newBoard[y][x].innerState = s;
        newBoard[y][x].num = n;
      });
    });
    tutorialStages[stage].forEach((t, y) => {
      t.forEach((l, x) => {
        newBoard[y][x].locked = l === 1;
      });
    });
    board = newBoard;
  },
  isTutorialStageSolved(stage: number) {
    if (board.length !== tutorialBoard.length) {
      return false;
    }
    let solved = true;
    tutorialStages[stage].forEach((t, y) => {
      t.forEach((l, x) => {
        if (board[y][x].state !== tutorialBoard[y][x].s && l === 0) {
          solved = false;
        }
      });
    });
    return solved;
  },
  loadTiles() {
    settings.loadSettings();
    const tiles = localStorage.getItem(`tiles ${settings.boardSize}`);
    if (tiles === null) return this.resetGrid();
    const newBoard = JSON.parse(tiles);
    if (newBoard.length != settings.boardSize) return this.resetGrid();
    board = newBoard;
    errors = +(localStorage.getItem(`errors ${settings.boardSize}`) ?? 0);
    timer = +(localStorage.getItem(`timer ${settings.boardSize}`) ?? 0);
    board.flat().forEach((tile) => (tile.oldState = "disabled"));
    gameState = "running";
  },
  setTool(tool: TileState) {
    currentTool = tool;
  },
  updateTile(x: number, y: number) {
    let tile = game.board[y][x];
    if (tile.locked) return;
    if (tile.state === currentTool) return;
    tile.oldState = tile.state;
    tile.state = currentTool;
    if (tile.state !== "disabled" && tile.state !== tile.innerState) {
      errors++;
    }
  },
  setGameState(newGameState: "running" | "won") {
    gameState = newGameState;
  },
  updateGameState() {
    game.saveTiles();
    if (gameState === "won") {
      localStorage.removeItem(`tiles ${settings.boardSize}`);
      localStorage.removeItem(`errors ${settings.boardSize}`);
      localStorage.removeItem(`timer ${settings.boardSize}`);
      return;
    }

    if (game.board.flat().every((tile) => tile.innerState === tile.state)) {
      gameState = "won";
      localStorage.removeItem(`tiles ${settings.boardSize}`);
      localStorage.removeItem(`errors ${settings.boardSize}`);
      localStorage.removeItem(`timer ${settings.boardSize}`);
      return;
    }
  },
  getTileStatus(tile: Tile): "error" | "solved" | "none" {
    const { active, inactive, disabled } = getNeighbouringTiles(
      game.board,
      tile,
    );

    if (tile.num === undefined) return "none";
    if (active > tile.num) return "error";
    if (inactive > tile.neighbours.length - tile.num) return "error";
    if (disabled.length === 0) return "solved";

    return "none";
  },
};

export default game;
