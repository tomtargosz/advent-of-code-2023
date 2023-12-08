import { log } from 'console';
import fs from 'fs';

const allFileContents = fs.readFileSync('input.txt', 'utf-8');
let total = 0;

const getCubeNumbers = (line: string) => {
  let cubeNumbers: Array<Object> = [];
  line.split('|').forEach((pull, index) => {
    const cubes = pull.replaceAll(', ', '|').split('|');
    let cubeResults = {};
    cubes.forEach((cube) => {
      const [number, color] = cube.split(' ');
      cubeResults = { ...cubeResults, [color]: parseInt(number) };
    });
    cubeNumbers.push(cubeResults);
  });
  return cubeNumbers;
};

allFileContents.split(/\r?\n/).forEach((line: string, index) => {
  const gameIdAndPullsTuple = line.split(': ');
  const id = parseInt(gameIdAndPullsTuple[0].split(' ')[1]);
  const pairs = gameIdAndPullsTuple[1].replaceAll('; ', '|');
  const cubeNumbers = getCubeNumbers(pairs);
  let lowestAmounts: Record<string, number> = {
    red: 1,
    green: 1,
    blue: 1
  };

  cubeNumbers.forEach((cubeNumber) => {
    Object.entries(cubeNumber).forEach(([color, number]) => {
      if (number > lowestAmounts[color]) {
        lowestAmounts[color] = number;
      }
    });
  });

  let nums: Array<number> = [];
  Object.entries(lowestAmounts).forEach((x) => {
    nums.push(x[1]);
  });

  total += nums.reduce((a, b) => a * b, 1);
});
console.log(total);
