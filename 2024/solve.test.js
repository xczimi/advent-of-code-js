require('dotenv').config();
const fs = require('node:fs');
const {fetchInput, fetchPuzzle, fetchSample} = require("../utils");

describe(`Year 2024`, () => {
  const YEAR = "2024";

  describe("day 1", () => {
    const day = "1";
    beforeAll(async () => await fetchPuzzle({YEAR, day}));
    describe("part 1", () => {
      beforeAll(async () => await fetchSample({YEAR, day}));
      const sampleOutput = 11;
      const {solve} = require(`./day1.js`);
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result});
      });
    })
    describe("part 2", () => {
      beforeAll(async () => {
        await fetchSample({YEAR, day, sample: 2});
      });
      const sampleOutput = 31;
      const {part2:solve} = require(`./day1.js`);
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day, sample: 2});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result})
      });
    })
  })
})
