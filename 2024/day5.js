const R = require("ramda");

const middleFn = (update) => parseInt(update[(update.length - 1) / 2]);

const solve = (input) => {
  const [rules, updatesStr] = input
    .split("\n\n")
    .filter(Boolean)
    .map((lines) => lines.split("\n").filter(Boolean));
  const updates = updatesStr.map((updateStr) => updateStr.split(","));
  const rulesFns = rules.map((ruleStr) => {
    const [a, b] = ruleStr.split("|");
    return (update) => {
      const aIdx = update.indexOf(a);
      const bIdx = update.indexOf(b);
      // console.debug({aIdx,bIdx,yeah:aIdx < bIdx});
      return aIdx === -1 || bIdx === -1 || aIdx < bIdx;
    };
  });
  return R.sum(updates.filter(R.allPass(rulesFns)).map(middleFn));
};
const part2 = (input, sorted = false) => {
  const [rules, updatesStr] = input
    .split("\n\n")
    .filter(Boolean)
    .map((lines) => lines.split("\n").filter(Boolean));
  const updates = updatesStr.map((updateStr) => updateStr.split(","));
  rulesComparator = (a, b) => {
    return (
      1 ===
      rules
        .map((ruleStr) => {
          const [l, r] = ruleStr.split("|");
          if (l === a && r === b) return 1;
          if (l === b && r === a) return -1;
          return false;
        })
        .find(Boolean)
    );
  };
  return R.sum(
    updates
      .map((update, idx) => {
        const sortedUpdate = R.sort(R.comparator(rulesComparator), update);
        if ((sortedUpdate.join(",") === updatesStr[idx]) === sorted)
          return middleFn(sortedUpdate);
      })
      .filter(Boolean),
  );
};
// part2 reused as part1 for fun
const part1 = (input) => part2(input, true);
module.exports = { solve, part1, part2 };
