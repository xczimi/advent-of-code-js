const R = require("ramda");

const solve = (input) => {
  return R.sum(
    [...input.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g)].map(
      ([, a, b]) => a * b,
    ),
  );
};
const part2 = (input) => {
  const tokens = [
    ...input.matchAll(
      /(mul)\(([0-9]{1,3}),([0-9]{1,3})\)|(do)\(\)|(don't)\(\)/g,
    ),
  ].map(([, code, a, b, yes, no]) =>
    code === "mul" ? a * b : yes ? true : false,
  );
  return tokens.reduce(
    ([sum, enabled], cur) => {
      if (R.type(cur) === "Boolean") return [sum, cur];
      if (enabled) return [sum + cur, enabled];
      else return [sum, enabled];
    },
    [0, true],
  )[0];
};
module.exports = { solve, part2 };
