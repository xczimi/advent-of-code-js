const R = require('ramda');

const xmasCount = word => line => [...line.matchAll(word)].filter(Boolean).length;
const xmasCounts = word => lines => R.sum(lines.map(xmasCount(word)));

const solve = (input) => {
  const lines = input.split("\n").filter(Boolean);
  const N = lines[0].length;
  const _ = '.';
  const fullCount = lines => [xmasCounts(/XMAS/g)(lines),xmasCounts(/SAMX/g)(lines)];
  const vlines = R.range(0,N).map(i => lines.map(line => line[i]).join(""));

  const d1lines = lines.map((line,i) => R.repeat(_,i).join('')+line+R.repeat(_,N-i).join(''));
  const d2lines = lines.map((line,i) => R.repeat(_,N-i).join('')+line+R.repeat(_,i).join(''));

  const vd = lines => R.range(0,2*N).map(i => lines.map(line => line[i]).join(""));
  const vd1lines = vd(d1lines);
  const vd2lines = vd(d2lines);

  return R.sum([...fullCount(lines),...fullCount(vlines),...fullCount(vd1lines),...fullCount(vd2lines)]);
};
const part2 = (input) => {
  const lines = input.split("\n").filter(Boolean);
  return lines.flatMap((line,li) => line.split('').map((c,i) => {
    const N = lines[0].length;
    if(c==='A' && li>0 && li+1<N && i>0 && i+1<N) {
      return [`${lines[li-1][i-1]}${lines[li+1][i+1]}`,`${lines[li-1][i+1]}${lines[li+1][i-1]}`].filter(w => w==='MS' || w==='SM').length === 2;
    }
    return false;
  })).filter(Boolean).length;
}
module.exports = {solve,part2}
