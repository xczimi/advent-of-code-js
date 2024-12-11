const R = require("ramda");

const solve = (input, blinks) => {
  const stones = input.split(" ").map(Number);
  const blink = (stones, blinks) => {
    console.log({ blinks, uniqStones: R.uniq(stones).length, stones: stones.length }); // console.debug(stones.join(" "));
    if (blinks) {
      return blink(
        stones.flatMap((stone) => {
          if (stone === 0) return [1];
          if (String(stone).length % 2 === 0) return R.splitAt(String(stone).length / 2, String(stone)).map(Number);
          return [2024 * stone];
        }),
        blinks - 1,
      );
    }
    return stones;
  };
  return blink(stones, blinks).length;
};
const part2 = (input, blinks) => {
  const stones = input.split(" ").map(Number);

  const blinkStone = ({ stone, count }) => {
    if (stone === 0) return [{ stone: 1, count }];
    if (String(stone).length % 2 === 0)
      return R.splitAt(String(stone).length / 2, String(stone))
        .map(Number)
        .map((stone) => ({ stone, count }));
    return [{ stone: 2024 * stone, count }];
  };

  const compactStones = R.pipe(
    R.groupBy(R.prop("stone")),
    R.map((stones) => ({ stone: stones[0].stone, count: R.sum(R.pluck("count", stones)) })),
    R.values,
  );

  const blink = (stones, blinks) => {
    // console.log({blinks, stones, cStones:compactStones(stones)})// console.debug(stones.join(" "));
    if (blinks) {
      return blink(compactStones(stones.flatMap(blinkStone)), blinks - 1);
    }
    return stones;
  };
  return R.sum(
    R.pluck("count")(
      blink(
        stones.map((stone) => ({ stone, count: 1 })),
        blinks,
      ),
    ),
  );
};
module.exports = { solve, part2 };
