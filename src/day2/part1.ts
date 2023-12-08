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

  const invalidGame = cubeNumbers.find((cubeNumber) => {
    let isInvalid = false;
    Object.entries(cubeNumber).forEach(([color, number]) => {
      switch (color) {
        case 'red':
          if (number > 12) isInvalid = true;
          break;
        case 'blue':
          if (number > 14) isInvalid = true;
          break;
        case 'green':
          if (number > 13) isInvalid = true;
          break;
      }
    });
    return isInvalid;
  });

  if (!invalidGame) {
    total += id;
  }
});
console.log(total);
