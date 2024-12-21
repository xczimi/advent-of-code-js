const R = require('ramda');
const BigNumber = require('bignumber.js');

const solve = (input, pPlus=BigNumber(0)) => {
  const machines = R.pluck("groups",[...input.matchAll(/Button A: X\+(?<Xa>\d+), Y\+(?<Ya>\d+)\nButton B: X\+(?<Xb>\d+), Y\+(?<Yb>\d+)\nPrize: X=(?<Xp0>\d+), Y=(?<Yp0>\d+)/g)]);
  return R.sum(machines.map(({Xa,Ya,Xb,Yb,Xp0,Yp0}) => {
    const {Xp,Yp} = {Xp:pPlus.plus(Xp0),Yp:pPlus.plus(Yp0)};
    const pressA = Xp.multipliedBy(-Yb).plus(Yp.multipliedBy(Xb)).div(Xb*Ya-Yb*Xa);
    const pressB = Xp.multipliedBy(-Ya).plus(Yp.multipliedBy(Xa)).div(Xa*Yb-Ya*Xb);
    return (pressA.isInteger()&&pressB.isInteger()&&pressA>0&&pressB>0) ? pressA.times(3).plus(pressB) : 0;
  }));
};
const part2 = (input, pPlus=BigNumber(10000000000000)) => {
  const machines = R.pluck("groups",[...input.matchAll(/Button A: X\+(?<Xa>\d+), Y\+(?<Ya>\d+)\nButton B: X\+(?<Xb>\d+), Y\+(?<Yb>\d+)\nPrize: X=(?<Xp0>\d+), Y=(?<Yp0>\d+)/g)]);
  return R.sum(machines.map(({Xa,Ya,Xb,Yb,Xp0,Yp0}) => {
    const {Xp,Yp} = {Xp:pPlus.plus(Xp0),Yp:pPlus.plus(Yp0)};
    const pressA = Xp.multipliedBy(-Yb).plus(Yp.multipliedBy(Xb)).div(Xb*Ya-Yb*Xa);
    const pressB = Xp.multipliedBy(-Ya).plus(Yp.multipliedBy(Xa)).div(Xa*Yb-Ya*Xb);
    return (pressA.isInteger()&&pressB.isInteger()&&pressA>0&&pressB>0) ? pressA.times(3).plus(pressB) : 0;
  }));
};
module.exports = { solve, part2 };
