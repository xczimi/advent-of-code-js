const R = require('ramda');

const solve = (input) => {
  const cards = input.split('\n').filter(Boolean).map(line => {
    const [_,cardNumbers] = line.split(/: +/);
    const [winNums,cardNums] = cardNumbers.split(/ \| +/).map(R.split(/ +/)).map(R.map(parseInt));
    const nums = R.intersection(winNums,cardNums).length;
    return nums>0 ? Math.pow(2,nums-1) : 0;
  });

  return R.sum(cards);
};
const part2 = (input) => {
  const cardWins = input.split('\n').filter(Boolean).map(line => {
    const [_,cardNumbers] = line.split(/: +/);
    const [winNums,cardNums] = cardNumbers.split(/ \| +/).map(R.split(/ +/)).map(R.map(parseInt));
    return R.intersection(winNums,cardNums).length;
  });

  const cards = cardWins.reduce((acc,cur,idx) => {
    if(cur) {
      return acc.map((val,i) => i >= idx+1 && i <= idx+cur ? val+acc[idx] : val);
    }
    return acc;
  },R.repeat(1,cardWins.length))
  return R.sum(cards);
}
module.exports = {solve,part2}
