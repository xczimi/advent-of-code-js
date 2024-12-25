const R = require('ramda');

const HDIR = { UP:"^", DOWN:"v" };
const VDIR = { LEFT:"<",RIGHT:">" };
const DIR = { ...HDIR, ...VDIR };

const THING = {
  ROBOT: "@",
  WALL: "#",
  BOX: "O",
  BOXL: "[",
  BOXR: "]",
  FLOOR: "."
}

const solve = (input) => {
  const [mapInput, movesInput] = input.split('\n\n');
  const rows = R.split('\n',mapInput);
  const [mapW,mapH] = [rows[0].length,rows.length];
  const initLayout = R.join("",rows);
  const moves = movesInput.split('');
  const printMap = R.pipe(R.splitEvery(mapW),R.join("\n"));
  const xy = (pos) => ({ x: pos%mapW, y: Math.floor(pos/mapW)});
  const pxy = R.pipe(xy,R.values,R.join(":"));
  const vxy = R.pipe(xy,({x,y})=>100*y+x);
  const dirPos = { [DIR.UP] : -mapW, [DIR.DOWN] : mapW, [DIR.LEFT]: -1, [DIR.RIGHT]: 1 };

  const push = ({ move, from, layout }) => {
    const dest = from+dirPos[move];
    if(layout[dest] === THING.WALL) return layout;
    if(layout[dest] === THING.FLOOR) {
      return R.pipe(R.update(dest, layout[from]), R.update(from, layout[dest]), R.join(''))(layout);
    }
    const newLayout = push({ move, from: dest, layout });
    if(newLayout[dest] === THING.FLOOR) {
      return R.pipe(R.update(dest, newLayout[from]), R.update(from, newLayout[dest]), R.join(''))(newLayout);
    }
    return newLayout;
  }

  console.log(printMap(initLayout));
  const finalLayout =  R.reduce((layout, move) => {
    if(!dirPos[move]) return layout;
    //console.log(`Move ${move}`);
    const robot = R.indexOf('@')(layout);
    const newLayout = push({ move, from: robot, layout });
    // console.log(`Moved ${move}\n${printMap(newLayout)}`);
    return newLayout;
  }, initLayout,moves);
  console.log(printMap(finalLayout));
  return R.sum((R.split('',finalLayout)).map((tile,pos) => tile===THING.BOX ? vxy(pos) : 0));
  return finalLayout;
};
const part2 = (input) => {
  return "solution";
};
module.exports = { solve, part2 };
