const R = require("ramda");
const parseInput = (input) =>
  input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(" ").map((x) => parseInt(x, 10)));
const isSafe = (levels) => {
  const increase = levels[1] > levels[0] ? [1, 2, 3] : [-1, -2, -3];
  return !levels
    .slice(1)
    .find((level, idx) => !increase.includes(level - levels[idx]));
};
const solve = (input) => {
  const reports = parseInput(input);
  return reports.map(isSafe).filter(Boolean).length;
};
const part2 = (input) => {
  const reports = parseInput(input);
  return reports
    .map((levels) => {
      if (isSafe(levels)) return true;
      if (isSafe(levels.slice(1))) return true;
      if (isSafe(levels.slice(0, -1))) return true;
      const increase = levels[1] > levels[0] ? [1, 2, 3] : [-1, -2, -3];
      const problems = levels
        .slice(1)
        .map((level, idx) => !increase.includes(level - levels[idx]));
      if (1 === R.count(R.identity)(problems)) {
        const pidx = problems.indexOf(true);
        return !increase.includes(levels[pidx + 2] - levels[pidx]);
      }
      return false;
    })
    .filter(Boolean).length;
};
module.exports = { solve, part2 };
