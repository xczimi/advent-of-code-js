const R = require('ramda');

const HDIR = { N:"^", S:"v" };
const VDIR = { W:"<",E:">" };
const DIR = { ...HDIR, ...VDIR };

const TILE = {
  START: "S",
  END: "E",
  WALL: "#",
  FLOOR: "."
}

const parseInput = (input) => {
  const rows = R.split('\n',input);
  const [mapW,mapH] = [rows[0].length,rows.length];
  const initLayout = R.join("",rows);
  const printMap = R.pipe(R.splitEvery(mapW),R.join("\n"));
  const xy = (pos) => ({ x: pos%mapW, y: Math.floor(pos/mapW)});
  const pxy = R.pipe(xy,R.values,R.join(":"));
  const vxy = R.pipe(xy,({x,y})=>100*y+x);
  const dirPos = { [DIR.N] : -mapW, [DIR.S] : mapW, [DIR.W]: -1, [DIR.E]: 1 };
  const turnL = { [DIR.N] : DIR.W, [DIR.S] : DIR.E, [DIR.W]: DIR.S, [DIR.E]: DIR.N };
  const turnR = { [DIR.N] : DIR.E, [DIR.S] : DIR.W, [DIR.W]: DIR.N, [DIR.E]: DIR.S };
  return { mapW, mapH, initLayout, fns: { printMap, pxy, vxy, dirPos, turnL, turnR} };
}

const solve = (input) => {
  const { mapW, initLayout: layout, fns: { printMap, turnL, turnR, dirPos } } = parseInput(input);
  console.log(printMap(layout));
  const pts = R.map(R.ifElse(R.anyPass([R.equals(TILE.WALL), R.equals(TILE.START)]),R.always(0),R.always(Infinity)), layout);
  console.debug(printMap(pts));

  const start = R.indexOf(TILE.START)(layout);
  const end = R.indexOf(TILE.END)(layout);
  const dir = DIR.E;

  const calcPts = ({ pos, dir, pts }) => {
    console.debug({ pos, dir });
    const fwd = pos+dirPos[dir];
    const left = pos+dirPos[turnL[dir]];
    const right = pos+dirPos[turnR[dir]];
    const back = pos+dirPos[turnL[turnL[dir]]];
    const destPtsInc = [1,1001,1001,2001];
    const nextPos = [fwd,left,right,back];
    const nextDir = [dir,turnL[dir],turnR[dir]];//,turnL[turnL[dir]]];
    const nexts = nextDir.map((dir,idx) => ({
      dir,
      pos: nextPos[idx],
      ptsInc: destPtsInc[idx]
    }))

    return R.reduce((pts, {pos:dest,dir,ptsInc}) => {
      return (layout[dest] !== TILE.WALL) && (pts[pos]+ptsInc <= pts[dest]) ? calcPts({ pos: dest, dir, pts: R.update(dest,pts[pos]+ptsInc)(pts)}) : pts;
    },pts,nexts);
  }
  const tilePts = calcPts({pos:start,dir, pts});

  console.debug(printMap(tilePts));

  return tilePts[end];
};
const part2 = (input) => {
  return "solution";
};
module.exports = { solve, part2 };
