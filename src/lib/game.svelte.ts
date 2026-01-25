import { reset } from "./mosaic";
import settings from "./settings.svelte";
import type { Position, Tile, TileState } from "./types";

let board = $state<Tile[][]>([]);
let currentTool = $state<TileState>("active");
let gameState = $state<"running" | "won">("running");

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
    if (tile.state === currentTool) return;
    tile.oldState = tile.state;
    tile.state = currentTool;
    game.saveTiles();
  },
  setGameState(newGameState: "running" | "won") {
    gameState = newGameState;
  },
  updateGameState() {
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
