const R = require("ramda");
const solve = (input) => {
  return R.sum(
    input.split("\n").map((line) => {
      const firstDigit = line.match(/^[^\d]*(\d)/);
      const lastDigit = line.match(/(\d)[^\d]*$/);
      if (!firstDigit || !lastDigit) return 0;
      return parseInt(`${firstDigit[1]}${lastDigit[1]}`);
    }),
  );
};
const part2 = (input) => {
  return R.sum(
    input.split("\n").map((line) => {
      const digits = "0|one|two|three|four|five|six|seven|eight|nine".split(
        "|",
      );
      const firstDigits = digits.map((digit, idx) =>
        R.apply(
          Math.min,
          [line.indexOf(digit), line.indexOf(`${idx}`)].filter(
            (idx) => idx !== -1,
          ),
        ),
      );
      const lastDigits = digits.map((digit, idx) =>
        R.apply(
          Math.max,
          [line.lastIndexOf(digit), line.lastIndexOf(`${idx}`)].filter(
            (idx) => idx !== -1,
          ),
        ),
      );
      const firstDigit = firstDigits.indexOf(R.apply(Math.min, firstDigits));
      const lastDigit = lastDigits.indexOf(R.apply(Math.max, lastDigits));
      return parseInt(`${firstDigit}${lastDigit}`);
    }),
  );
};

module.exports = { solve, part2 };
