const R = require("ramda");

const solve = (input) => {
  const inputLines = input.split("\n").filter(Boolean);
  const symbols = inputLines.map((line) => [...line.matchAll(/[^.\d]/g)].map((match) => match.index));
  const partNumbers = inputLines.map((line, lidx) => {
    const numbers = [...line.matchAll(/\d+/g)].map((match) => {
      const hasAdjacentSymbol =
        [lidx - 1, lidx, lidx + 1]
          .map((idx) => {
            if (symbols[idx]) {
              return symbols[idx].map((sidx) => sidx >= match.index - 1 && sidx <= match.index + match[0].length).filter(Boolean).length > 0;
            }
            return false;
          })
          .filter(Boolean).length > 0;
      // if(!hasAdjacentSymbol) {
      //   console.debug(`Found number ${match[0]} in line ${lidx} at index ${match.index} part ${hasAdjacentSymbol}`);
      // }
      return hasAdjacentSymbol ? parseInt(match[0]) : 0;
    });
    return numbers;
  });
  return R.sum(partNumbers.flat());
};
const part2 = (input) => {
  const inputLines = input.split("\n").filter(Boolean);
  const numbers = inputLines.map((line) =>
    [...line.matchAll(/\d+/g)].map((match) => ({
      number: parseInt(match[0]),
      start: match.index,
      end: match.index + match[0].length - 1,
    })),
  );
  const gears = inputLines.flatMap((line, lidx) =>
    [...line.matchAll(/[*]/g)].map((match) => {
      const pos = match.index;
      const gearNumbers = [lidx - 1, lidx, lidx + 1].flatMap((idx) => {
        if (numbers[idx]) {
          return numbers[idx].map((num) => (num.start - 1 <= pos && num.end + 1 >= pos ? num.number : null)).filter(Boolean);
        }
        return [];
      });
      return gearNumbers.length === 2 ? R.product(gearNumbers) : 0;
    }),
  );
  return R.sum(gears);
};
module.exports = { solve, part2 };
