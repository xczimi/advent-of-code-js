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
  describe("day 2", () => {
    const day = "2";
    beforeAll(async () => await fetchSample({YEAR, day}));
    describe("part 1", () => {
      const sampleOutput = 2;
      const {solve} = require(`./day2.js`);
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result});
        expect(result).toBe(306);
      });
    })
    describe("part 2", () => {
      const sampleOutput = 4;
      const {part2:solve} = require(`./day2.js`);
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result})
        expect(result).toBe(366);
      });
    })
  })
  describe("day 3", () => {
    const day = "3";
    const dayCode = require(`./day3.js`);
    beforeAll(async () => await fetchSample({YEAR, day}));
    describe("part 1", () => {
      const sampleOutput = 161;
      const {solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result});
        expect(result).toBe(159892596);
      });
    })
    describe("part 2", () => {
      const sampleOutput = 48;
      const {part2:solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day, sample: 2});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result})
        expect(result).toBe(92626942);
      });
    })
  })
  describe("day 4", () => {
    const day = "4";
    const dayCode = require(`./day4.js`);
    beforeAll(async () => await fetchSample({YEAR, day}));
    describe("part 1", () => {
      const sampleOutput = 18;
      const {solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day, sample: 2});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result});
        expect(result).toBe(2545);
      });
    })
    describe("part 2", () => {
      const sampleOutput = 9;
      const {part2:solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day, sample: 5});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result})
        expect(result).toBe(1886);
      });
    })
  })
  describe("day 5", () => {
    const day = "5";
    const dayCode = require(`./day5.js`);
    beforeAll(async () => await fetchSample({YEAR, day}));
    describe("part 1", () => {
      const sampleOutput = 143;
      const {solve,part1} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
        expect(part1(input)).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result});
        expect(result).toBe(5588);
        expect(part1(input)).toBe(5588);
      });
    })
    describe("part 2", () => {
      const sampleOutput = 123;
      const {part2:solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result})
        expect(result).toBe(5331);
      });
    })
  })
  describe("day 6", () => {
    const day = "6";
    const dayCode = require(`./day6.js`);
    beforeAll(async () => await fetchSample({YEAR, day}));
    describe("part 1", () => {
      const sampleOutput = 41;
      const {solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result});
        expect(result).toBe(4789);
      });
    })
    describe("part 2", () => {
      const sampleOutput = 6;
      const {part2:solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test.skip('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result})
        expect(result).toBe("CORRECT");
      });
    })
  })

  describe("day 7", () => {
    const day = "7";
    const dayCode = require(`./day7.js`);
    beforeAll(async () => await fetchSample({YEAR, day}));
    describe("part 1", () => {
      const sampleOutput = 3749;
      const {solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result});
        expect(result).toBe(1260333054159);
      });
    })
    describe("part 2", () => {
      const sampleOutput = 11387;
      const {part2:solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result})
        expect(result).toBe(162042343638683);
      });
    })
  })

  describe("day 8", () => {
    const day = "8";
    const dayCode = require(`./day8.js`);
    beforeAll(async () => await fetchSample({YEAR, day}));
    describe("part 1", () => {
      const sampleOutput = 14;
      const {solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result});
        expect(result).toBe(308);
      });
    })
    describe("part 2", () => {
      const {part2:solve} = dayCode;
      test('should return expected output for sample input', async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(34);
      });
      test('should return expected output for sample input 6', async () => {
        const input = await fetchSample({YEAR, day, sample: 6});
        const result = solve(input);
        expect(result).toBe(9);
      });
      test('should solve the input', async () => {
        const input = await fetchInput({YEAR, day});
        const result = solve(input);
        console.debug({result})
        expect(result).toBe(1147);
      });
    })
  })

})
