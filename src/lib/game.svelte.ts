import { reset } from "./mosaic";
import settings from "./settings.svelte";
import type { Position, Tile, TileState } from "./types";

let board = $state<Tile[][]>([]);
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

export function getNeighbouringTiles(
  tiles: Tile[][],
  tile: Tile,
): {
  active: Position[];
  inactive: Position[];
  disabled: Position[];
} {
  const active = tile.neighbours.filter(
    ({ x, y }) => tiles[y][x].state === "active",
  );
  const inactive = tile.neighbours.filter(
    ({ x, y }) => tiles[y][x].state === "inactive",
  );
  const disabled = tile.neighbours.filter(
    ({ x, y }) => tiles[y][x].state === "disabled",
  );
  return {
    active,
    inactive,
    disabled,
  };
}

const game = {
  get board() {
    return board;
  },
  get currentTool() {
    return currentTool;
  },
  get gameState() {
    return gameState;
  },
  resetGrid() {
    window.localStorage.removeItem(`tiles ${settings.boardSize}`);
    board = reset(settings.boardSize);
    gameState = "running";
  },
  saveTiles() {
    window.localStorage.setItem(
      `tiles ${settings.boardSize}`,
      JSON.stringify(board),
    );
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
    const tiles = window.localStorage.getItem(`tiles ${settings.boardSize}`);
    if (tiles === null) return this.resetGrid();
    const newBoard = JSON.parse(tiles);
    if (newBoard.length != settings.boardSize) return this.resetGrid();
    board = newBoard;
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
  },
  setGameState(newGameState: "running" | "won") {
    gameState = newGameState;
  },
  updateGameState() {
    game.saveTiles();
    if (gameState === "won") {
      return window.localStorage.removeItem(`tiles ${settings.boardSize}`);
    }

    if (game.board.flat().every((tile) => tile.innerState === tile.state)) {
      gameState = "won";
      return window.localStorage.removeItem(`tiles ${settings.boardSize}`);
    }
  },
};

export default game;
