const fs = require('node:fs');
const path = require('node:path');
const HTMLParser = require('node-html-parser');

const headers = {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.5",
  "cache-control": "max-age=0",
  "priority": "u=0, i",
  "upgrade-insecure-requests": "1",
  "cookie": `session=${process.env.AOC_SESSION}`,
  "Referer": "https://adventofcode.com",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}

const fetchPage = ({ YEAR, day }) => async ({ urlPath, fileName }) => {
  const localFileName = path.join("adventofcode.com",YEAR,`day${day}`,fileName);
  if(!fs.existsSync(localFileName) && process.env.AOC_SESSION) {
    const urlBase = `https://adventofcode.com/${YEAR}/day/${day}`;
    return await fetch(`${urlBase}${urlPath}`, {
      headers,
      "body": null,
      "method": "GET"
    }).then(response => response.text()).then(input  => {
      //console.debug(input);
      fs.mkdirSync(path.dirname(localFileName), { recursive: true });
      fs.writeFileSync(localFileName, input);
      return input;
    });
  }
  return fs.readFileSync(localFileName, "utf8") || "";
}

const fetchInput = ({ YEAR, day }) => fetchPage({ YEAR, day })({ urlPath: "/input", fileName: "input.txt" });
const fetchPuzzle = ({ YEAR, day, sample = "" }) => fetchPage({ YEAR, day })({ urlPath: "", fileName: `puzzle${sample}.html` });

const fetchSample = async ({ YEAR, day, sample }) => {
  const sampleFileName = ({ sample }) => path.join("adventofcode.com",YEAR,`day${day}`,`sample${sample>1?sample:""}.txt`);
  if(!fs.existsSync(sampleFileName({sample}))) {
    const puzzle = await fetchPuzzle({YEAR, day, sample});
    const sampleHTML = HTMLParser.parse(puzzle, {blockTextElements: {}});
    const sampleNodes = sampleHTML.querySelectorAll('pre');
    sampleNodes.forEach((code,idx) => {
      fs.writeFileSync(sampleFileName({sample:idx+1}),code.innerText);
    });
  }
  return fs.readFileSync(sampleFileName({sample}), "utf8") || "";
}
module.exports = { fetchInput, fetchPuzzle, fetchSample };
