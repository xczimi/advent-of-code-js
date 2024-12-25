const R = require('ramda');

const HDIR = { UP:"^", DOWN:"v" };
const VDIR = { LEFT:"<",RIGHT:">" };
const DIR = { ...HDIR, ...VDIR };

const TILE = {
  ROBOT: "@",
  WALL: "#",
  BOX: "O",
  BOXL: "[",
  BOXR: "]",
  FLOOR: "."
}

const parseInput = (input) => {
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
  return { mapW, mapH, moves, initLayout, fns: { printMap, pxy, vxy, dirPos} };
}

const solve = (input) => {
  const { mapW, mapH, moves, initLayout, fns: { printMap, vxy, dirPos} } = parseInput(input);

  const push = ({ move, from, layout }) => {
    const dest = from+dirPos[move];
    if(layout[dest] === TILE.WALL) return layout;
    if(layout[dest] === TILE.FLOOR) {
      return R.pipe(R.update(dest, layout[from]), R.update(from, layout[dest]), R.join(''))(layout);
    }
    const newLayout = push({ move, from: dest, layout });
    if(newLayout[dest] === TILE.FLOOR) {
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
  return R.sum((R.split('',finalLayout)).map((tile,pos) => tile===TILE.BOX ? vxy(pos) : 0));
  return finalLayout;
};

const expandPart2 = (input) => input.replaceAll(/[#O.@]/g,(substring) => {
  switch(substring) {
    case "#": return "##";
    case "O": return "[]";
    case ".": return "..";
    case "@": return "@.";
  }
  return substring;
});

const part2 = (input) => {
  const { mapW, mapH, moves, initLayout, fns: { printMap, vxy, dirPos} } = parseInput(expandPart2(input));
  console.log(printMap(initLayout));

  const push2 = ({ move, from, layout }) => {
    // console.log(move,from,printMap(layout));
    const dest = from+dirPos[move];
    if(layout[dest] === TILE.WALL) return layout;
    if(layout[dest] === TILE.FLOOR) {
      return R.pipe(R.update(dest, layout[from]), R.update(from, layout[dest]), R.join(''))(layout);
    }
    const newLayout = push2({ move, from: dest, layout });
    if(newLayout[dest] === TILE.FLOOR) {
      // console.log(printMap(newLayout));
      if(R.includes(move)(R.values(HDIR))) {
        // half the box moved, can we move the other half?
        const newLayout2 = push2({ move, from: from+dirPos[layout[dest] === TILE.BOXL ? DIR.RIGHT : DIR.LEFT], layout: newLayout });
        // console.log(printMap(newLayout2));
        if(newLayout2 !== newLayout) {
          // if the other half can move
          return newLayout2;
        } else {
          return layout;
        }
      }
      return R.pipe(R.update(dest, newLayout[from]), R.update(from, newLayout[dest]), R.join(''))(newLayout);
    }
    return newLayout;
  }


  const finalLayout =  R.reduce((layout, move) => {
    if(!dirPos[move]) return layout;
    //console.log(`Move ${move}`);
    const robot = R.indexOf('@')(layout);
    const newLayout = push2({ move, from: robot, layout });
    // console.log(`Moved ${move}\n${printMap(newLayout)}`);
    return newLayout;
  }, initLayout,moves);
  console.log(printMap(finalLayout));
  return R.sum((R.split('',finalLayout)).map((tile,pos) => tile===TILE.BOXL ? vxy(pos) : 0));
  return printMap(finalLayout);
};
module.exports = { solve, part2, expandPart2 };
