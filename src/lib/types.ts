export type Theme = "dark" | "light";
export type Color =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink";

export type TileState = "active" | "inactive" | "disabled";

export type Position = {
  x: number;
  y: number;
};

export type Tile = {
  num?: number;
  position: Position;
  oldState: TileState;
  state: TileState;
  innerState: TileState;
  neighbours: Position[];
};
