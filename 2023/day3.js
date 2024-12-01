// const R = require('ramda');

const solve = (input) => {
  const numbers = input.split('\n').map(line => {
    const numbers = ([...line.matchAll(/(\d+)/g)]).map((match,idx) => [match[0],[idx,match[0].length]]);
    console.debug(JSON.stringify({numbers}));
  });
  return "solution";
};
const part2 = (input) => {
  return "solution";
}
module.exports = {solve,part2}
