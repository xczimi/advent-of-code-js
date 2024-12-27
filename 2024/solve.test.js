require("dotenv").config();
const fs = require("node:fs");
const { fetchInput, fetchPuzzle, fetchSample } = require("../utils");

describe(`Year 2024`, () => {
  const YEAR = "2024";

  describe("day 1", () => {
    const day = "1";
    beforeAll(async () => await fetchPuzzle({ YEAR, day }));
    describe("part 1", () => {
      beforeAll(async () => await fetchSample({ YEAR, day }));
      const sampleOutput = 11;
      const { solve } = require(`./day1.js`);
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
      beforeAll(async () => {
        await fetchSample({ YEAR, day, sample: 2 });
      });
      const sampleOutput = 31;
      const { part2: solve } = require(`./day1.js`);
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
  describe("day 2", () => {
    const day = "2";
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 2;
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
        expect(result).toBe(306);
      });
    });
    describe("part 2", () => {
      const sampleOutput = 4;
      const { part2: solve } = require(`./day2.js`);
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(366);
      });
    });
  });
  describe("day 3", () => {
    const day = "3";
    const dayCode = require(`./day3.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 161;
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(159892596);
      });
    });
    describe("part 2", () => {
      const sampleOutput = 48;
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day, sample: 2 });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(92626942);
      });
    });
  });
  describe("day 4", () => {
    const day = "4";
    const dayCode = require(`./day4.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 18;
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day, sample: 2 });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(2545);
      });
    });
    describe("part 2", () => {
      const sampleOutput = 9;
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day, sample: 5 });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(1886);
      });
    });
  });
  describe("day 5", () => {
    const day = "5";
    const dayCode = require(`./day5.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 143;
      const { solve, part1 } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
        expect(part1(input)).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(5588);
        expect(part1(input)).toBe(5588);
      });
    });
    describe("part 2", () => {
      const sampleOutput = 123;
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(5331);
      });
    });
  });
  describe("day 6", () => {
    const day = "6";
    const dayCode = require(`./day6.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 41;
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(4789);
      });
    });
    describe("part 2", () => {
      const sampleOutput = 6;
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test.skip("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe("CORRECT");
      });
    });
  });
  describe("day 7", () => {
    const day = "7";
    const dayCode = require(`./day7.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 3749;
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(1260333054159);
      });
    });
    describe("part 2", () => {
      const sampleOutput = 11387;
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(162042343638683);
      });
    });
  });
  describe("day 8", () => {
    const day = "8";
    const dayCode = require(`./day8.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const sampleOutput = 14;
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(sampleOutput);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(308);
      });
    });
    describe("part 2", () => {
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(34);
      });
      test("should return expected output for sample input 6", async () => {
        const input = await fetchSample({ YEAR, day, sample: 6 });
        const result = solve(input);
        expect(result).toBe(12);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(1147);
      });
    });
  });
  describe("day 9", () => {
    const day = "9";
    const dayCode = require(`./day9.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(1928);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(6395800119709);
      });
    });
    describe("part 2", () => {
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(2858);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(6418529470362);
      });
    });
  });
  describe("day 10", () => {
    const day = "10";
    const dayCode = require(`./day10.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const { solve } = dayCode;
      test("should return expected output for sample input 2", async () => {
        const input = await fetchSample({ YEAR, day, sample: 2 });
        const result = solve(input);
        expect(result).toBe(2);
      });
      test("should return expected output for sample input 3", async () => {
        const input = await fetchSample({ YEAR, day, sample: 3 });
        const result = solve(input);
        expect(result).toBe(4);
      });
      test("should return expected output for sample input 4", async () => {
        const input = await fetchSample({ YEAR, day, sample: 4 });
        const result = solve(input);
        expect(result).toBe(3);
      });
      test("should return expected output for sample input 5", async () => {
        const input = await fetchSample({ YEAR, day, sample: 5 });
        const result = solve(input);
        expect(result).toBe(36);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(786);
      });
    });
    describe("part 2", () => {
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day, sample: 5 });
        const result = solve(input);
        expect(result).toBe(81);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(1722);
      });
    });
  });
  describe("day 11", () => {
    const day = "11";
    const dayCode = require(`./day11.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = "125 17"; //await fetchSample({ YEAR, day });
        const result = solve(input, 25);
        expect(result).toBe(55312);
      });
      test("should solve the input 25", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input, 25);
        console.debug({ result });
        expect(result).toBe(203228);
      });
    });
    describe("part 2", () => {
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = "125 17"; //await fetchSample({ YEAR, day });
        const result = solve(input, 25);
        expect(result).toBe(55312);
      });
      test("should solve the input 25", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input, 25);
        console.debug({ result });
        expect(result).toBe(203228);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input, 75);
        console.debug({ result });
        expect(result).toBe(240884656550923);
      });
    });
  });
  describe("day 12", () => {
    const day = "12";
    const dayCode = require(`./day12.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({YEAR, day});
        const result = solve(input);
        expect(result).toBe(140);
      });
      test("should return expected output for sample input 3", async () => {
        const input = await fetchSample({YEAR, day, sample: 3});
        const result = solve(input);
        expect(result).toBe(772);
      });
      test("should return expected output for sample input 4", async () => {
        const input = await fetchSample({YEAR, day, sample: 4});
        const result = solve(input);
        expect(result).toBe(1930);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(1359028);
      });
    });
    // describe("part 2", () => {
    //   const { part2: solve } = dayCode;
    //   test("should return expected output for sample input 5", async () => {
    //     const input = await fetchSample({ YEAR, day, sample: 5 });
    //     const result = solve(input);
    //     expect(result).toBe(80);
    //   });
    //   test("should return expected output for sample input 3", async () => {
    //     const input = await fetchSample({ YEAR, day, sample: 3 });
    //     const result = solve(input);
    //     expect(result).toBe(436);
    //   });
    //   test("should return expected output for sample input 4", async () => {
    //     const input = await fetchSample({ YEAR, day, sample: 4 });
    //     const result = solve(input);
    //     expect(result).toBe(1206);
    //   });
    //   test("should return expected output for sample input 6", async () => {
    //     const input = await fetchSample({ YEAR, day, sample: 6 });
    //     const result = solve(input);
    //     expect(result).toBe(236);
    //   });
    //   test("should return expected output for sample input 7", async () => {
    //     const input = await fetchSample({ YEAR, day, sample: 7 });
    //     const result = solve(input);
    //     expect(result).toBe(368);
    //   });
    //   test("should solve the input", async () => {
    //     const input = await fetchInput({ YEAR, day });
    //     const result = solve(input);
    //     console.debug({ result });
    //     expect(result).toBe("answer");
    //   });
    // });
  });
  describe("day 13", () => {
    const day = "13";
    const dayCode = require(`./day13.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({YEAR, day})
        const result = solve(input);
        expect(result).toBe(480);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(29388);
      });
    });
    describe("part 2", () => {
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(875318608908);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(99548032866004);
      });
    });
  });
  describe("day 14", () => {
    const day = "14";
    const dayCode = require(`./day14.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({YEAR, day})
        const result = solve(input);
        expect(result).toBe(12);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input, {xMax:101,yMax:103});
        console.debug({ result });
        expect(result).toBe(226236192);
      });
    });
    describe("part 2", () => {
      const { part2: solve } = dayCode;
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input, {xMax:101,yMax:103,steps:8168});
        console.debug({ result });
      });
    });
  });
  describe("day 15", () => {
    const day = "15";
    const dayCode = require(`./day15.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({YEAR, day})
        const result = solve(input);
        expect(result).toBe(10092);
      });
      test("should return expected output for sample input 2", async () => {
        const input = await fetchSample({YEAR, day, sample: 2});
        const result = solve(input);
        expect(result).toBe(2028);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(1437174);
      });
    });
    describe("part 2", () => {
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const output = await fetchSample({ YEAR, day, sample: 10 });
        const result = solve(input);
        expect(result).toBe(9021);
      });
      test("should return expected output for sample input 7", async () => {
        const input = await fetchSample({YEAR, day, sample: 7});
        const result = solve(input);
        expect(result).toBe(618);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(1437468);
      });
    });
  });

  describe("day 16", () => {
    const day = "16";
    const dayCode = require(`./day16.js`);
    beforeAll(async () => await fetchSample({ YEAR, day }));
    describe("part 1", () => {
      const { solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({YEAR, day})
        const result = solve(input);
        expect(result).toBe(7036);
      });
      test("should return expected output for sample input 2", async () => {
        const input = await fetchSample({YEAR, day, sample: 3});
        const result = solve(input);
        expect(result).toBe(11048);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(83444);
      });
    });
    describe("part 2", () => {
      const { part2: solve } = dayCode;
      test("should return expected output for sample input", async () => {
        const input = await fetchSample({ YEAR, day });
        const output = await fetchSample({ YEAR, day });
        const result = solve(input);
        expect(result).toBe(45);
      });
      test("should return expected output for sample input 7", async () => {
        const input = await fetchSample({YEAR, day, sample: 3});
        const result = solve(input);
        expect(result).toBe(64);
      });
      test("should solve the input", async () => {
        const input = await fetchInput({ YEAR, day });
        const result = solve(input);
        console.debug({ result });
        expect(result).toBe(483);
      });
    });
  });
});
