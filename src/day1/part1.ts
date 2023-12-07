import fs from 'fs';

const allFileContents = fs.readFileSync('input.txt', 'utf-8');
let total = 0;
allFileContents.split(/\r?\n/).forEach((line: string) => {
  const firstNumber = line.split('').find((char) => !isNaN(parseInt(char)));
  const secondNumber = line
    .split('')
    .reverse()
    .find((char) => !isNaN(parseInt(char)));

  total += Number(firstNumber! + secondNumber!);
});
console.log(total);
