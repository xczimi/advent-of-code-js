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
  const printMap = (maze) => R.pipe(R.splitEvery(mapW),R.join("\n"))(maze);
  const xy = (pos) => ({ x: pos%mapW, y: Math.floor(pos/mapW)});
  const pxy = R.pipe(xy,R.values,R.join(":"));
  const vxy = R.pipe(xy,({x,y})=>100*y+x);
  const dirPos = { [DIR.N] : -mapW, [DIR.S] : mapW, [DIR.W]: -1, [DIR.E]: 1 };
  const turnL = { [DIR.N] : DIR.W, [DIR.S] : DIR.E, [DIR.W]: DIR.S, [DIR.E]: DIR.N };
  const turnR = { [DIR.N] : DIR.E, [DIR.S] : DIR.W, [DIR.W]: DIR.N, [DIR.E]: DIR.S };
  return { mapW, mapH, initLayout, fns: { printMap, pxy, vxy, dirPos, turnL, turnR} };
}

const solve = (input) => {
  const { mapW, initLayout: layout, fns: { printMap, pxy, turnL, turnR, dirPos } } = parseInput(input);
  console.log(printMap(layout));
  const initPts = R.map(R.ifElse(R.equals(TILE.WALL),R.always(0),R.always(Infinity)), layout);
  const ptsDir = {
    [DIR.N] : R.clone(initPts),
    [DIR.W] : R.clone(initPts),
    [DIR.S] : R.clone(initPts),
    [DIR.E] : R.clone(initPts),
  }
  console.debug(printMap(initPts));

  const startPos = R.indexOf(TILE.START)(layout);
  const end = R.indexOf(TILE.END)(layout);
  const startDir = DIR.E;
  ptsDir[startDir][startPos] = 0;
  console.debug(ptsDir[DIR.N][startPos],ptsDir[DIR.W][startPos],ptsDir[DIR.S][startPos],ptsDir[DIR.E][startPos]);


  const calcPts = ({ pos:srcPos, dir:srcDir }) => {
    // console.debug({ srcPos: pxy(srcPos), srcDir });
    const nextPoss = [srcPos+dirPos[srcDir],srcPos,srcPos];
    const nextDirs = [srcDir,turnL[srcDir],turnR[srcDir]];
    const ptsIncs = [1,1000,1000];
    const nexts = R.values(R.mapObjIndexed((destDir,idx) => ({
      destPos: nextPoss[idx],
      destDir,
      ptsInc: ptsIncs[idx]
    }))(nextDirs))

    // console.debug({nexts:nexts.map(({destPos,destDir})=>[pxy(destPos),destDir].join(''))});

    const srcPt = ptsDir[srcDir][srcPos];

    return R.filter(Boolean,R.map(({destPos,destDir,ptsInc}) => {
      const destPt = ptsDir[destDir][destPos];
      // console.debug(`Move ${pxy(destPos)} ${destDir} ${ptsInc} ${srcPt+ptsInc} lt ${destPt}`);
      if(srcPt+ptsInc < destPt) {
        // console.debug(`set ${pxy(destPos)} ${destDir} ${srcPt}+${ptsInc} = ${srcPt+ptsInc}`);
        ptsDir[destDir][destPos] = srcPt + ptsInc;
        return ({ pos: destPos, dir: destDir });
      }
    })(nexts));
  }

  let moves = [{pos:startPos,dir:startDir}];

  while(moves.length) {
    moves = moves.flatMap(calcPts);
  }

  return R.min(ptsDir[DIR.N][end],ptsDir[DIR.E][end]);
};
const part2 = (input) => {
  const {mapW, initLayout: layout, fns: {printMap, pxy, turnL, turnR, dirPos}} = parseInput(input);
  console.log(printMap(layout));
  const initPts = R.map(R.ifElse(R.equals(TILE.WALL), R.always(0), R.always(Infinity)), layout);
  const mazePts = R.map(pt => R.fromPairs(R.zip(R.values(DIR),[R.clone(pt),R.clone(pt),R.clone(pt),R.clone(pt)])))(initPts);
  const mazeEdges = R.map(pt => R.fromPairs(R.zip(R.values(DIR),[[],[],[],[]])))(initPts);

  const startPos = R.indexOf(TILE.START)(layout);
  const end = R.indexOf(TILE.END)(layout);
  const startDir = DIR.E;
  mazePts[startPos][startDir] = 0;
  mazeEdges[startPos][startDir] = [startPos];
  console.debug(mazePts[startPos]);

  const calcPts = ({ pos:srcPos, dir:srcDir }) => {
    // console.debug({ srcPos: pxy(srcPos), srcDir });
    const nextPoss = [srcPos+dirPos[srcDir],srcPos,srcPos];
    const nextDirs = [srcDir,turnL[srcDir],turnR[srcDir]];
    const ptsIncs = [1,1000,1000];
    const nexts = R.values(R.mapObjIndexed((destDir,idx) => ({
      destPos: nextPoss[idx],
      destDir,
      ptsInc: ptsIncs[idx]
    }))(nextDirs))

    // console.debug({nexts:nexts.map(({destPos,destDir})=>[pxy(destPos),destDir].join(''))});

    const srcPt = mazePts[srcPos][srcDir];

    return R.filter(Boolean,R.map(({destPos,destDir,ptsInc}) => {
      const destPt = mazePts[destPos][destDir];
      // console.debug(`Move ${pxy(destPos)} ${destDir} ${ptsInc} ${srcPt+ptsInc} lt ${destPt}`);
      if(srcPt+ptsInc <= destPt) {
        // console.debug(`set ${pxy(destPos)} ${destDir} ${srcPt}+${ptsInc} = ${srcPt+ptsInc}`);
        mazePts[destPos][destDir] = srcPt + ptsInc;
        if(srcPt+ptsInc === destPt) {
          mazeEdges[destPos][destDir] = R.uniq([...mazeEdges[srcPos][srcDir],...mazeEdges[destPos][destDir],destPos]);
        } else {
          mazeEdges[destPos][destDir] = R.uniq([...mazeEdges[srcPos][srcDir],destPos]);
        }
        if(srcPt+ptsInc < destPt) {
          return ({ pos: destPos, dir: destDir });
        }
      }
    })(nexts));
  }

  let moves = [{pos:startPos,dir:startDir}];

  while(moves.length) {
    moves = moves.flatMap(calcPts);
  }

  return R.min(mazeEdges[end][DIR.N].length,mazeEdges[end][DIR.E].length);

};
module.exports = { solve, part2 };
