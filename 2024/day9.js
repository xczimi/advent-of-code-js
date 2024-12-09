const R = require('ramda');
const {reverse} = require("ramda");

const disk = (input) => {
  const diskMap = input.split("").map(Number);
  return diskMap.reduce(({file,disk},curr,idx) => {
    return {file:!file,disk:[...disk,R.repeat(file?Math.floor(idx/2):".")(curr)]};
  }, {file:true,disk:[]}).disk.flat();
}
const solve = (input) => {
  const blocks = disk(input);
  const revBlocks = blocks.filter(x=>x!==".");
  const diskUse = revBlocks.length;
  return R.sum(blocks.reduce((acc,curr,idx) => {
    if(acc.length>=diskUse) return acc;
    if("." === curr) {
      return [...acc,revBlocks.pop()];
    }
    return [...acc,curr];
  },[]).map((val,idx) => val*idx));
};
const part2 = (input) => {
  const diskMap = input.split("").map(Number);
  const blocks = diskMap.reduce(({file,fid,disk},curr,idx) => {
    return {file:!file,fid:file?fid+1:fid,disk:[...disk,file?{[fid]:curr}:curr?{empty:curr}:null]};
  }, {file:true,fid:0,disk:[]}).disk.filter(Boolean).flat();
  const revBlocks = R.reverse(blocks.filter(({empty})=>!empty));
  return R.sum(revBlocks.reduce((acc,curr,idx) => {
    if(curr.empty) return acc;
    const [[fid,flen]] = Object.entries(curr);
    const emptyIdx = acc.map(({empty},idx)=>empty >= flen ? idx : null).find(Boolean);
    if(emptyIdx && emptyIdx < acc.map((f,idx) => f[fid] ? idx : null).find(Boolean)) {
      console.debug({emptyIdx,fid,flen,idx});
      return [...acc.slice(0,emptyIdx),curr,(acc[emptyIdx].empty > flen ? {empty:acc[emptyIdx].empty - flen} : null),...acc.slice(emptyIdx+1).map(f => f[fid] ? {empty:f[fid]} : f)].filter(Boolean)
    }
    return acc;
  },blocks).flatMap(f => {
    const [[fid,flen]] = Object.entries(f);
    return R.repeat(fid==="empty"?0:fid)(flen)
  }).map((val,idx) => val*idx));
  return revBlocks;
}
module.exports = {solve,part2}
