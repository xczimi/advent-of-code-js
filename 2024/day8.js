const R = require("ramda");

const printGrid = (grid) => console.log(grid.map((line) => line.join("")).join("\n"));
const solve = (input) => {
  const grid = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));
  printGrid(grid);
  const mx = grid[0].length;
  const my = grid.length;
  // console.debug({mx, my});
  const inGrid = ({ x, y }) => x >= 0 && x < mx && y >= 0 && y < my;
  const antinodes = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
    const { dx, dy } = { dx: x2 - x1, dy: y2 - y1 };
    return [
      { x: x2 + dx, y: y2 + dy },
      { x: x1 - dx, y: y1 - dy },
    ].filter(inGrid);
  };

  const antennas = grid.flatMap((gridline, y) => gridline.map((cell, x) => (cell !== "." ? { cell, x, y } : null)).filter(Boolean));
  const agrid = R.values(R.map(R.map(R.pick(["x", "y"])))(R.groupBy(R.prop("cell"))(antennas)));
  return R.uniq(
    R.flatten(
      R.map((antennas) => {
        const pairs = antennas.flatMap((pos, idx) => antennas.slice(idx + 1).map((pos2) => antinodes(pos, pos2)));
        return pairs.flat();
      })(agrid),
    ),
  ).length;
};

const part2 = (input) => {
  const grid = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));
  printGrid(grid);
  const mx = grid[0].length;
  const my = grid.length;
  // console.debug({mx, my});
  const inGrid = ({ x, y }) => x >= 0 && x < mx && y >= 0 && y < my;
  const antinodes = ({ x: x1, y: y1 }, { x: x2, y: y2 }, mul = 0) => {
    const { dx, dy } = { dx: x2 - x1, dy: y2 - y1 };
    const nodes = [
      { x: x2 + dx * mul, y: y2 + dy * mul },
      { x: x1 - dx * mul, y: y1 - dy * mul },
    ].filter(inGrid);
    return [...nodes, ...(nodes.length ? antinodes({ x: x1, y: y1 }, { x: x2, y: y2 }, mul + 1) : [])];
  };

  const antennas = grid.flatMap((gridline, y) => gridline.map((cell, x) => (cell !== "." ? { cell, x, y } : null)).filter(Boolean));
  const agrid = R.values(R.map(R.map(R.pick(["x", "y"])))(R.groupBy(R.prop("cell"))(antennas)));
  return R.uniq(
    R.flatten(
      R.map((antennas) => {
        const pairs = antennas.flatMap((pos, idx) => antennas.slice(idx + 1).map((pos2) => antinodes(pos, pos2)));
        return pairs.flat();
      })(agrid),
    ),
  ).length;
};
module.exports = { solve, part2 };
