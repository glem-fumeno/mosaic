export type TileState = "active" | "inactive" | "disabled";

export type Position = {
  x: number;
  y: number;
};

export type Tile = {
  num?: number;
  position: Position;
  state: TileState;
  innerState: TileState;
  neighbours: Position[];
};

function random(max: number) {
  return Math.floor(Math.random() * max);
}

let chances: Record<number, number> = {
  9: 95,
  8: 90,
  7: 80,
  6: 70,
  5: 60,
  4: 30,
  3: 20,
  2: 5,
  1: 0,
};

export function reset(width: number): Tile[][] {
  let tiles: Tile[][] = [];
  tiles.length = 0;
  for (let y = 0; y < width; y++) {
    tiles.push([]);
    for (let x = 0; x < width; x++) {
      let tile: Tile = {
        position: { x, y },
        state: "disabled",
        innerState: "disabled",
        neighbours: [],
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
    // console.log(isSolvable(tiles));
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
  tiles = structuredClone(tiles);
  while (
    !tiles.flat().every((tile) => tile.innerState === tile.state) &&
    changed
  ) {
    changed = false;
    tiles.flat().forEach((tile) => {
      let disabled = tile.neighbours.filter(
        (pos) => tiles[pos.y][pos.x].state === "disabled",
      );
      if (disabled.length < 1) return;
      let active = tile.neighbours.filter(
        (pos) => tiles[pos.y][pos.x].state === "active",
      );
      let inactive = tile.neighbours.filter(
        (pos) => tiles[pos.y][pos.x].state === "inactive",
      );

      if (disabled.length + active.length === tile.num) {
        disabled.forEach((pos) => {
          tiles[pos.y][pos.x].state = "active";
        });
        changed = true;
      }
      if (
        -(disabled.length + inactive.length) + tile.neighbours.length ===
        tile.num
      ) {
        disabled.forEach((pos) => {
          tiles[pos.y][pos.x].state = "inactive";
        });
        changed = true;
      }
    });
  }
  return changed;
}
