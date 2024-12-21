// const R = require('ramda');

const R = require("ramda");
const ALL_FENCES = "LURD".split("");

const calcPrice = R.pipe(R.map(({area,fences})=>area*fences),R.sum);

const posIdx = R.pipe(R.pick(["x","y"]),R.values,R.join('-'));
const solve = (input) => {
  const plots = input.split("\n").flatMap((line, y) => line.split("").map((plant, x) => ({plotId:`${x}-${y}`, plant, x, y, area: 1})));
  const plotsByPos = R.indexBy(posIdx,plots);
  const plotByPos = (pos) => plotsByPos[posIdx(pos)];

  const regionByPos = (pos) => R.find(({plotsByPos=[]}) => plotsByPos[posIdx(pos)]);
  const regionIdOfPlots = R.pipe(R.map(posIdx),R.join('|'));
  const regionIdOf = R.pipe(R.prop("plots"),regionIdOfPlots);

  const xMax = R.reduce(R.max, -Infinity, R.map(R.prop("x"), plots));
  const yMax = R.reduce(R.max, -Infinity, R.map(R.prop("y"), plots));
  const neighbours = ({ x, y }) => [x < xMax ? { x: x + 1, y } : null, x > 0 ? { x: x - 1, y } : null, y < yMax ? { x, y: y + 1 } : null, y > 0 ? { x, y: y - 1 } : null].filter(Boolean)
  const tlNeighbours = ({ x, y }) => [x > 0 ? { x: x - 1, y } : null, y > 0 ? { x, y: y - 1 } : null].filter(Boolean)
  const nbPlots = ({ x, y }) => tlNeighbours({x,y}).map(plotByPos);

  return calcPrice(R.reduce((regions,plot) => {
    // console.time(plot.plotId);
    // neighbour plots of the plot with the same plant
    const plotNeighbours = R.filter(R.propEq(plot.plant,"plant"))(nbPlots(plot));
    // regions of the neighbouring plots
    const nbRegions = R.map(plot => regionByPos(plot)(regions))(plotNeighbours).filter(Boolean);
    // unique list of neighbouring regions
    const unbRegions = R.uniq(nbRegions);
    const nbRegionIds = R.pluck("regionId")(unbRegions);
    const otherRegions = R.filter(R.pipe(R.prop("regionId"),(regionId) => !nbRegionIds.includes(regionId)))(regions);
    // the new region is the plot combined with the neighbouring regions
    const newPlots = R.uniq([...R.flatten(R.map(R.prop("plots"))(unbRegions)),plot]);
    const newRegion = { plots: newPlots, plotsByPos: R.indexBy(posIdx,newPlots), area: 1+R.sum(R.pluck("area",unbRegions)), fences: 4+R.sum(R.pluck("fences",unbRegions))-R.length(nbRegions)*2};
    const newRegionWithId = {regionId:posIdx(plot),...newRegion}; //R.join("@",[plot.plant,posId(plot)]
    // console.debug(plot.plotId, regions.length, newPlots.length, plotNeighbours.length,nbRegions.length,unbRegions.length,otherRegions.length, newRegionWithId.regionId );
    // console.timeEnd(plot.plotId);
    return [...otherRegions, newRegionWithId];
  },[])(plots));
};
const part2 = (input) => {
  const plots = input.split("\n").flatMap((line, y) => line.split("").map((plant, x) => ({plotId:`${x}-${y}`, plant, x, y, area: 1})));
  const plotsByPos = R.indexBy(posIdx,plots);
  const plotByPos = (pos) => plotsByPos[posIdx(pos)] ?? { plant: '#' };

  const regionByPos = (pos) => R.find(({plotsByPos=[]}) => plotsByPos[posIdx(pos)]);
  const regionIdOfPlots = R.pipe(R.map(posIdx),R.join('|'));
  const regionIdOf = R.pipe(R.prop("plots"),regionIdOfPlots);

  const HDIR = { UP:"^",DOWN:"v" };
  const VDIR = { LEFT:"<",RIGHT:">" };
  const DIR = { ...HDIR, ...VDIR };
  const movePos = ({x,y}) => ({x:x+1,y:y});

  const xMax = R.reduce(R.max, -Infinity, R.map(R.prop("x"), plots));
  const yMax = R.reduce(R.max, -Infinity, R.map(R.prop("y"), plots));
  const vPosList = ({x,y}) => [y < yMax ? { x, y: y + 1, d:DIR.DOWN, r:y+1 } : {d:DIR.DOWN, r:y+1}, y > 0 ? { x, y: y - 1, d:DIR.UP, r:y } : {d:DIR.UP, r:y}];
  const hPosList = ({x,y}) => [x < xMax ? { x: x + 1, y, d:DIR.RIGHT, c:x+1 } : {d:DIR.RIGHT, c:x+1}, x > 0 ? { x: x - 1, y, d:DIR.LEFT , c:x} : {d:DIR.LEFT, c:x}];
  const nbPosList = (pos) => R.concat(vPosList(pos),hPosList(pos));
  const neighbours = (pos) => nbPosList(pos).filter(Boolean)
  const tlNeighbours = ({ x, y }) => [x > 0 ? { x: x - 1, y } : null, y > 0 ? { x, y: y - 1 } : null].filter(Boolean)
  const nbPlots = ({ x, y }) => tlNeighbours({x,y}).map(plotByPos);

  const fences = ({x,y,plant}) => nbPosList({x,y}).map(({d,r,c,...nbPlot}) => (plant !== plotByPos(nbPlot).plant) ? ({ r,c,d,fence:R.join('',[plant,plotByPos(nbPlot).plant])}) : null).filter(Boolean);
  const plotWithFences = plots.map(plot => R.assoc("fences",fences(plot),plot));

  return R.reduce((regions,plot) => {
    // console.time(plot.plotId);
    // neighbour plots of the plot with the same plant
    const plotNeighbours = R.filter(R.propEq(plot.plant,"plant"))(nbPlots(plot));
    // regions of the neighbouring plots
    const nbRegions = R.map(plot => regionByPos(plot)(regions))(plotNeighbours).filter(Boolean);
    // unique list of neighbouring regions
    const unbRegions = R.uniq(nbRegions);
    const nbRegionIds = R.pluck("regionId")(unbRegions);
    console.debug(R.pluck("regionId",regions), R.pluck("regionId",nbRegions), R.pluck("regionId",unbRegions), plot);
    const otherRegions = R.filter(R.pipe(R.prop("regionId"),(regionId) => !nbRegionIds.includes(regionId)))(regions);
    // the new region is the plot combined with the neighbouring regions
    const newPlots = R.uniq([...R.flatten(R.map(R.prop("plots"))(unbRegions)),plot]);
    const newRegion = { plots: newPlots, plotsByPos: R.indexBy(posIdx,newPlots), area: 1+R.sum(R.pluck("area",unbRegions)), fences:[...plot.fences,...R.pluck("fences",newPlots).flat()]};
    const newRegionWithId = {regionId:posIdx(plot),...newRegion}; //R.join("@",[plot.plant,posId(plot)]
    // console.debug(plot.plotId, regions.length, newPlots.length, plotNeighbours.length,nbRegions.length,unbRegions.length,otherRegions.length, newRegionWithId.regionId );
    // console.timeEnd(plot.plotId);
    return [...otherRegions, newRegionWithId];
  },[])(plotWithFences);
};
module.exports = { solve, part2 };
