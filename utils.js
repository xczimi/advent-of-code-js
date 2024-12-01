const fs = require('node:fs');
const path = require('node:path');
const HTMLParser = require('node-html-parser');

const fetchInput = async ({ YEAR, day }) => {
  const localFileName = path.join(YEAR,`day${day}`,"input.txt");
  if(!fs.existsSync(localFileName)) {
    const urlBase = `https://adventofcode.com/${YEAR}/day/${day}`;
    return await fetch(`${urlBase}/input`, {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.5",
        "cache-control": "max-age=0",
        "priority": "u=0, i",
        "upgrade-insecure-requests": "1",
        "cookie": `session=${process.env.AOC_SESSION}`,
        "Referer": urlBase,
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    }).then(response => response.text()).then(input  => {
      //console.debug(input);
      fs.mkdirSync(path.dirname(localFileName), { recursive: true });
      fs.writeFileSync(localFileName, input)
    });
  }
  return fs.readFileSync(localFileName, "utf8");
}
const fetchPuzzle = async ({ YEAR, day }) => {
  const localFileName = path.join(YEAR,`day${day}`,"puzzle.html");
  if(!fs.existsSync(localFileName)) {
    const urlBase = `https://adventofcode.com/${YEAR}/day/${day}`;
    return await fetch(`${urlBase}`, {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.5",
        "cache-control": "max-age=0",
        "priority": "u=0, i",
        "upgrade-insecure-requests": "1",
        "cookie": `session=${process.env.AOC_SESSION}`,
        "Referer": urlBase,
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    }).then(response => response.text()).then(puzzle  => {
      //console.debug(puzzle);
      fs.mkdirSync(path.dirname(localFileName), { recursive: true });
      fs.writeFileSync(localFileName, puzzle)
    });
  }
  return fs.readFileSync(localFileName, "utf8");
}
const fetchSample = async ({ YEAR, day, sample }) => {
  const sampleFileName = ({ sample }) => path.join(YEAR,`day${day}`,`sample${sample>1?sample:""}.txt`);
  if(!fs.existsSync(sampleFileName({sample}))) {
    const puzzle = await fetchPuzzle({YEAR, day});
    const sampleHTML = HTMLParser.parse(puzzle, {blockTextElements: {}});
    const sampleNodes = sampleHTML.querySelectorAll('pre');
    sampleNodes.forEach((code,idx) => {
      fs.writeFileSync(sampleFileName({sample:idx+1}),code.innerText);
    });
  }
  return fs.readFileSync(sampleFileName({sample}), "utf8");
}
module.exports = { fetchInput, fetchPuzzle, fetchSample };
