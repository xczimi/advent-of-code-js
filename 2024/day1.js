const R = require("ramda");
const parseInput = (input) =>
  input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("   "));
const solve = (input) => {
  const pairs = parseInput(input);
  const left = R.sort(R.ascend(R.identity))(R.map(R.prop(0))(pairs));
  const right = R.sort(R.ascend(R.identity))(R.map(R.prop(1))(pairs));
  return R.sum(left.map((leftId, idx) => Math.abs(leftId - right[idx])));
  return 11;
};
const part2 = (input) => {
  const pairs = parseInput(input);
  const left = R.map(R.prop(0))(pairs);
  const right = R.map(R.prop(1))(pairs);
  return R.sum(
    R.map((leftId) => leftId * R.count(R.equals(leftId))(right))(left),
  );
};
module.exports = { solve, part2 };
