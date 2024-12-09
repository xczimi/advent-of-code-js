const R = require('ramda');

const parseInput = (input) => input.split("\n").filter(Boolean).map(line => line.split(": ")).map(([total,operands]) => [Number(total),operands.split(" ").map(Number)]);
const solve = (input) => {
  const lines = parseInput(input);
  const solveLine = (curr,[left,...right],ctx) => {
    if(right.length === 0) return [curr*left,curr+left].includes(ctx.total);
    if(curr>ctx.total) return false;
    if(solveLine(curr+left,right,{...ctx,calc:[...(ctx.calc||[]),"+"]})) return true;
    if(solveLine(curr*left,right,{...ctx,calc:[...(ctx.calc||[]),"*"]})) return true;
    return false;
  }
  const solvedLines = lines.map(([total,[curr,...right]]) => solveLine(curr,right,{total}) ? total : 0);
  return R.sum(solvedLines);
};
const part2 = (input) => {
  const lines = parseInput(input);
  const solveLine = (curr,[left,...right],ctx) => {
    if(right.length === 0) return [curr*left,curr+left,Number(`${curr}${left}`)].includes(ctx.total);
    if(curr>ctx.total) return false;
    if(solveLine(Number(`${curr}${left}`),right,{...ctx,calc:[...(ctx.calc||[]),"||"]})) return true;
    if(solveLine(curr+left,right,{...ctx,calc:[...(ctx.calc||[]),"+"]})) return true;
    if(solveLine(curr*left,right,{...ctx,calc:[...(ctx.calc||[]),"*"]})) return true;
    return false;
  }
  const solvedLines = lines.map(([total,[curr,...right]]) => solveLine(curr,right,{total}) ? total : 0);
  return R.sum(solvedLines);
}
module.exports = {solve,part2}
