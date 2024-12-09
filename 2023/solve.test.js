require("dotenv").config();
const { fetchInput, fetchSample } = require("../utils");

describe(`Year 2023`, () => {
  const YEAR = "2023";

  describe("Day 1", () => {
    const day = "1";
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("Part 1", () => {
      const { solve: day1Function } = require("./day1");

      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const expectedOutput = 142;
        const result = day1Function(input);
        expect(result).toBe(expectedOutput);
      });
      test("should solve the input ", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = day1Function(input);
        console.debug({ result });
      });
    });

    describe("part 2", () => {
      const { part2: day1Function } = require("./day1");

      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day, sample: 2 });
        const expectedOutput = 281;
        const result = day1Function(input);
        expect(result).toBe(expectedOutput);
      });
      test("should solve the input ", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = day1Function(input);
        console.debug({ result });
      });
    });
  });

  describe("day 2", () => {
    const day = "2";
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 8;
      const { solve } = require(`./day2.js`);
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
      });
    });
    describe("part 2", () => {
      const sampleOutput = 2286;
      const { part2: solve } = require(`./day2.js`);
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day, sample: 2 });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
      });
    });
  });

  describe("day 3", () => {
    const day = "3";
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 4361;
      const { solve } = require(`./day3.js`);
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(530495);
      });
    });
    describe("part 2", () => {
      const sampleOutput = 467835;
      const { part2: solve } = require(`./day3.js`);
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day, sample: 2 });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
      });
    });
  });

  describe("day 4", () => {
    const day = "4";
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 13;
      const { solve } = require(`./day4.js`);
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(24706);
      });
    });
    describe("part 2", () => {
      const sampleOutput = 30;
      const { part2: solve } = require(`./day4.js`);
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day, sample: 2 });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
      });
    });
  });

  describe("day 5", () => {
    const day = "5";
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 35;
      const { solve } = require(`./day5.js`);
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(24706);
      });
    });
    // describe("part 2", () => {
    //   const sampleOutput = 30;
    //   const {part2:solve} = require(`./day5.js`);
    //   test('should return expected output for sample input', async () => {
    //     const input = await fetchSample({YEAR, day, sample: 2});
    //     const result = solve(input);
    //     expect(result).toBe(sampleOutput);
    //   });
    //   test('should solve the input', async () => {
    //     const input = await fetchInput({YEAR, day});
    //     const result = solve(input);
    //     console.debug({result})
    //   });
    // })
  });
});
