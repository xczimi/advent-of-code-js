const R = require('ramda');

const walkmap = ({fmap, width, opos}) => {
  const flatmap = [...fmap];
  if(opos) flatmap[opos] = "O";
  const gp = flatmap.indexOf("^");
  const DIR_LEFT = -1;
  const DIR_UP = -width;
  const DIR_RIGHT = 1;
  const DIR_DOWN = width;
  const turn = {
    [DIR_LEFT]: DIR_UP,
    [DIR_UP]: DIR_RIGHT,
    [DIR_RIGHT]: DIR_DOWN,
    [DIR_DOWN]: DIR_LEFT,
  }
  const walk = (pos,dir) => {
    flatmap[pos] = "X";
    if(flatmap[pos+dir] === "#") return walk(pos,turn[dir]);
    if(flatmap[pos+dir] === "O") {
      if(opos) {
        opos = false;
        return walk(pos, turn[dir]);
      } else {
        throw new Error(pos+dir);
      }
    }
    if(flatmap[pos+dir] === "*") return;
    return walk(pos+dir,dir);
  }
  walk(gp,DIR_UP);
  return flatmap;
}

const solve = (input) => {
  const map = input.split("\n").filter(Boolean).map(line => `*${line}*`.split(""));
  const width = map[0].length;
  const wall = R.repeat("*", width);
  const fmap = [wall,map.flat(),wall].flat();

  const flatmap = walkmap({fmap,width});

  console.log(R.splitEvery(width,flatmap).map(R.join("")).join("\n"));
  console.log(R.splitEvery(width,fmap).map(R.join("")).join("\n"));
  return flatmap.filter(R.equals("X")).length;
};
const part2 = (input) => {
  const map = input.split("\n").filter(Boolean).map(line => `*${line}*`.split(""));
  const width = map[0].length;
  const wall = R.repeat("*", width);
  const fmap = [wall,map.flat(),wall].flat();
  const gp = fmap.indexOf("^");

  const flatmap = walkmap({fmap,width});
  console.log(R.splitEvery(width,flatmap).map(R.join("")).join("\n"));

  const xps = flatmap.map((c,p) => ["X"].includes(c) ? p : null).filter(Boolean);
  console.log(xps.length);

  return R.uniq(xps.map(opos => {
    try {
      if(gp !== opos) {
        walkmap({fmap, width, opos})
      }
      return;
    } catch(e) {
      const fomap=[...fmap];
      fomap[opos] = "O";
      // console.log(R.splitEvery(width,fomap).map(R.join("")).join("\n"));
      return e.message;
    }
  }).filter(Boolean)).length;

  return "solution";
}
module.exports = {solve,part2}
