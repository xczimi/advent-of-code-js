const R = require("ramda");

const solve = (input) => {
  const hmap = input
    .split("\n")
    .filter(Boolean)
    .flatMap((line, y) => line.split("").map((h, x) => ({ h: Number(h), x, y, score: Number(h) === 9 ? [`${x}:${y}`] : 0 })))
    .filter(({ h }) => h >= 0);
  const xMax = R.reduce(R.max, -Infinity, R.map(R.prop("x"), hmap));
  const yMax = R.reduce(R.max, -Infinity, R.map(R.prop("y"), hmap));
  const nextOf =
    (hnmap) =>
    ({ x, y }) =>
      [x < xMax ? { x: x + 1, y } : null, x > 0 ? { x: x - 1, y } : null, y < yMax ? { x, y: y + 1 } : null, y > 0 ? { x, y: y - 1 } : null]
        .filter(Boolean)
        .map(({ x, y }) => hnmap.find(({ x: hx, y: hy }) => x === hx && y === hy))
        .filter(Boolean);

  return R.reverse(R.range(0, 10))
    .reduce((acc, hStep) => {
      return acc.map((cell) => {
        const { h, score, ...pos } = cell;
        if (h === hStep - 1) {
          const nSteps = nextOf(acc)(cell).filter(({ h }) => h === hStep);
          return { h, score: R.uniq(nSteps.flatMap(R.prop("score"))), ...pos };
        }
        return cell;
      });
    }, hmap)
    .filter(R.propEq(0, "h"))
    .map(R.prop("score"))
    .flat().length;
};
const part2 = (input) => {
  const hmap = input
    .split("\n")
    .filter(Boolean)
    .flatMap((line, y) => line.split("").map((h, x) => ({ h: Number(h), x, y, score: Number(h) === 9 ? 1 : 0 })))
    .filter(({ h }) => h >= 0);
  const xMax = R.reduce(R.max, -Infinity, R.map(R.prop("x"), hmap));
  const yMax = R.reduce(R.max, -Infinity, R.map(R.prop("y"), hmap));
  const nextOf =
    (hnmap) =>
    ({ x, y }) =>
      [x < xMax ? { x: x + 1, y } : null, x > 0 ? { x: x - 1, y } : null, y < yMax ? { x, y: y + 1 } : null, y > 0 ? { x, y: y - 1 } : null]
        .filter(Boolean)
        .map(({ x, y }) => hnmap.find(({ x: hx, y: hy }) => x === hx && y === hy))
        .filter(Boolean);
  // this is the number of 0-9 paths
  return R.reverse(R.range(0, 10))
    .reduce((acc, hStep) => {
      return acc.map((cell) => {
        const { h, score, ...pos } = cell;
        if (h === hStep - 1) {
          const nSteps = nextOf(acc)(cell).filter(({ h }) => h === hStep);
          return { h, score: R.sum(nSteps.map(R.prop("score"))), ...pos };
        }
        return cell;
      });
    }, hmap)
    .filter(R.propEq(0, "h"))
    .map(R.prop("score"))
    .reduce(R.add, 0);
};
module.exports = { solve, part2 };
