const R = require('ramda');

const QUBES = {red: 12, green: 13, blue: 14};

const solve = (input) => {
  const gameLines = input.split('\n').map((line) => {
    const [game, draws] = line.split(': ');
    if (game) {
      const [_,gameId] = game.split(' ');
      if(draws.split('; ').map(draw => {
            return draw.split(', ').map(qubes => {
              const [n, color] = qubes.split(' ');
              // impossible?
              return !(QUBES[color] && (n <= QUBES[color]));
            }).filter(Boolean)
          }
        ).flat().filter(Boolean).length === 0) {
        return parseInt(gameId);
      }
    }
  }).filter(Boolean);
  return R.sum(gameLines);
};
const part2 = (input) => {
  const gameLines = input.split('\n').map((line) => {
    if(!line) return;
    const [game, draws] = line.split(': ');
    const [_, gameId] = game.split(' ');
    const qubes = draws.split('; ').map(draw => {
      return Object.fromEntries(draw.split(', ').map(qubes => {
        const [n, color] = qubes.split(' ');
        return [color, parseInt(n)];
      }))
    });
    //console.debug({qubes});
    return R.product(["red","green","blue"].map(color => R.apply(Math.max,R.map(R.propOr(0,color),qubes))));
  }).filter(Boolean);
  //console.debug({gameLines},R.sum(gameLines));
  return R.sum(gameLines);
}
module.exports = {solve,part2}
