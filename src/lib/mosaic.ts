import type { Position, Tile, TileState } from "$lib/types";
import { random } from "./utils";

let chances: Record<number, number> = {
  9: 95,
  8: 70,
  7: 60,
  6: 80,
  5: 30,
  4: 20,
  3: 10,
  2: 5,
  1: 0,
};

export function getNeighbouringTiles(
  tiles: Tile[][],
  tile: Tile,
): {
  active: number;
  inactive: number;
  disabled: Position[];
} {
  let active = 0;
  let inactive = 0;
  const disabled: Position[] = [];
  tile.neighbours.forEach(({ x, y }) => {
    switch (tiles[y][x].state) {
      case "active":
        active++;
        break;
      case "inactive":
        inactive++;
        break;
      case "disabled":
        disabled.push({ x, y });
        break;
    }
  });
  return {
    active,
    inactive,
    disabled,
  };
}

export function reset(width: number): Tile[][] {
  let tiles: Tile[][] = [];
  tiles.length = 0;
  for (let y = 0; y < width; y++) {
    tiles.push([]);
    for (let x = 0; x < width; x++) {
      let tile: Tile = {
        position: { x, y },
        oldState: "disabled",
        state: "disabled",
        innerState: "disabled",
        neighbours: [],
        locked: false,
      };
      for (let i = Math.max(y - 1, 0); i < Math.min(y + 2, width); i++) {
        for (let j = Math.max(x - 1, 0); j < Math.min(x + 2, width); j++) {
          tile.neighbours.push({ x: j, y: i });
        }
      }
      tiles.at(-1)!.push(tile);
    }
  }
  let newState: TileState = "active";
  let validTiles: Set<number> = new Set([]);
  while (!tiles.flat().every((tile) => tile.innerState !== "disabled")) {
    let failed = true;
    let tile: Tile;
    let activeCount: number;
    let tilesAffected: Tile[] = [];
    let similarCount = 0;
    do {
      do {
        if (validTiles.size < 1) {
          tile = tiles[random(tiles.length)][random(tiles.length)];
        } else {
          const p = [...validTiles][random(validTiles.size)];
          const y = p % width;
          const x = (p - y) / width;
          tile = tiles[y][x];
        }
      } while (tile.num !== undefined);
      tilesAffected.forEach((tile) => {
        tile.innerState = "disabled";
      });
      tilesAffected = [];
      activeCount = 0;
      similarCount = 0;
      tile.neighbours.forEach(({ x, y }) => {
        if (tiles[y][x].innerState === "disabled") {
          tiles[y][x].innerState = newState;
          tilesAffected.push(tiles[y][x]);
          failed = false;
        }
        if (tiles[y][x].innerState === newState) {
          similarCount++;
        }
        if (tiles[y][x].innerState === "active") {
          activeCount++;
        }
      });
    } while (
      failed ||
      random(100) <= 20 * Math.abs(4.5 - activeCount) ||
      random(100) <= chances[similarCount]
    );
    tile.num = activeCount;
    newState = newState === "active" ? "inactive" : "active";
    tile.neighbours.forEach(({ x, y }) => {
      tiles[y][x].neighbours.forEach((neighbour) => {
        validTiles.add(neighbour.x * width + neighbour.y);
      });
    });
  }
  tiles.flat().forEach((tile) => {
    if (tile.num === undefined) return;
    let tmp = tile.num;
    tile.num = undefined;
    if (!isSolvable(tiles)) {
      tile.num = tmp;
    }
  });
  return tiles;
}
export function isSolvable(tiles: Tile[][]) {
  let changed = true;
  while (
    !tiles.flat().every((tile) => tile.innerState === tile.state) &&
    changed
  ) {
    changed = false;
    tiles.flat().forEach((tile) => {
      const { active, inactive, disabled } = getNeighbouringTiles(tiles, tile);
      if (disabled.length < 1) return;

      if (disabled.length + active === tile.num) {
        disabled.forEach(({ x, y }) => {
          tiles[y][x].state = "active";
        });
        changed = true;
        return;
      }
      if (-(disabled.length + inactive) + tile.neighbours.length === tile.num) {
        disabled.forEach(({ x, y }) => {
          tiles[y][x].state = "inactive";
        });
        changed = true;
        return;
      }
    });
  }
  tiles.flat().forEach((tile) => {
    tile.state = "disabled";
  });
  return changed;
}
