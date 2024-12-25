const R = require('ramda');
const {fetchInput, fetchSample} = require("../utils");

const {execSync} = require('child_process');
const fs = require("node:fs");

const solve = (input, {steps = 100, xMax = 11, yMax = 7} = {}) => {
  const counts = R.repeat(R.repeat(0,yMax),xMax);
  const countRobots = R.reduce((counts, robot) => R.assocPath([robot.y,robot.y],R.path([robot.y,robot.y])(counts)+1)(counts),counts);
  const printRobots = (robots, step) => {
    const countByPos = R.groupBy(R.pipe(R.pick(["x","y"]),R.values,R.join("-")),robots);
    const printed = R.join("\n", R.map( (y) => R.join("",R.map((x)=> countByPos[`${x}-${y}`] ? "#" : " ",R.range(0,xMax))),R.range(0,yMax)));
    if((step%101 === 88) && (step%103 === 31)) {
      console.clear();
      console.log(`Step: ${step}`);
      console.log(printed);
      execSync('sleep 0.3');
      fs.writeFileSync(`2024/day14/robots.${step}.txt`,printed);
    }
  }
  const robots = R.map(R.map(Number),R.project(["x","y","vx","vy"],R.pluck("groups",[...input.matchAll(/p=(?<x>\d+),(?<y>\d+) v=(?<vx>[-\d]+),(?<vy>[-\d]+)/g)])));
  const robotStep = ({x,y,vx,vy}) => ({x:(x+vx+xMax)%xMax,y:(y+vy+yMax)%yMax,vx,vy});
  //printRobots(robots);
  const afterSteps = R.project(["x","y"],R.reduce((acc,step) => {
    printRobots(acc, step);
    return R.map(robotStep, acc)
  },robots,R.range(0,steps)));
  printRobots(afterSteps);
  const {xHalf,yHalf} = {xHalf: (xMax-1)/2, yHalf:(yMax-1)/2};
  const robotQs = R.groupBy(({x,y}) => [[x>xHalf,x<xHalf,x===xHalf].indexOf(true),[y>yHalf,y<yHalf,y===yHalf].indexOf(true)].join('#'), afterSteps);
  const qCounts = ["0#0","0#1","1#0","1#1"].map(q => (robotQs[q] ?? []).length);
  //return qCounts;
  return R.reduce(R.multiply,1,qCounts);
};
const part2 = (input) => {
  return "solution";
};
module.exports = { solve, part2 };
