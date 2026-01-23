import { reset } from "./mosaic";
import type { Position, Tile, TileState } from "./types";

let debugMode = $state<boolean>(false);
let board = $state<Tile[][]>([]);
let width = $state(10);
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
  get debugMode() {
    return debugMode;
  },
  get board() {
    return board;
  },
  get currentTool() {
    return currentTool;
  },
  get gameState() {
    return gameState;
  },
  toggleDebug() {
    debugMode = !debugMode;
  },
  resetGrid() {
    board = reset(width);
    this.saveTiles();
    gameState = "running";
  },
  saveTiles() {
    window.localStorage.setItem("tiles", JSON.stringify(board));
  },
  loadTiles(tiles: string) {
    board = JSON.parse(tiles);
    board.flat().forEach((tile) => (tile.oldState = "disabled"));
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
  updateGameState() {
    if (gameState === "won") return;
    if (game.board.flat().every((tile) => tile.innerState === tile.state)) {
      gameState = "won";
      return;
    }
  },
};

export default game;
