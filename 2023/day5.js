const R = require('ramda');

const solve = (input) => {
  const [seedsInput,...mapsInput] = input.split('\n\n').filter(Boolean);
  const maps = Object.fromEntries(mapsInput.map(R.split('\n')).filter(Boolean).map(([map,...lines]) => ([map,lines.map(R.split(' '))])));
  const seeds = seedsInput.split(': ')[1].split(' ');
  return {seeds,seedsInput,maps};
};
const part2 = (input) => {
  return "solution";
}
module.exports = {solve,part2}
