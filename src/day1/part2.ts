import * as fs from 'fs';

const NUMBERS = [
  { string: 'one', value: 1 },
  { string: 'two', value: 2 },
  { string: 'three', value: 3 },
  { string: 'four', value: 4 },
  { string: 'five', value: 5 },
  { string: 'six', value: 6 },
  { string: 'seven', value: 7 },
  { string: 'eight', value: 8 },
  { string: 'nine', value: 9 }
];

const allFileContents = fs.readFileSync('input.txt', 'utf-8');
let total = 0;
allFileContents.split(/\r?\n/).forEach((line: string) => {
  let firstIndex = Number.MAX_SAFE_INTEGER;
  let secondIndex = Number.MIN_SAFE_INTEGER;
  let firstNumber;
  let secondNumber;

  const stringArray = line.split('');

  firstIndex = stringArray.findIndex((char) => !isNaN(parseInt(char)));
  if (firstIndex !== -1) {
    firstNumber = parseInt(stringArray[firstIndex]);
  } else {
    firstIndex = Number.MAX_SAFE_INTEGER;
  }

  secondIndex =
    stringArray.findLastIndex((char) => !isNaN(parseInt(char))) ?? Number.MIN_SAFE_INTEGER;
  if (secondIndex !== -1) {
    secondNumber = parseInt(stringArray[secondIndex]);
  } else {
    secondIndex = Number.MIN_SAFE_INTEGER;
  }

  NUMBERS.forEach((number) => {
    let index = line.indexOf(number.string);
    if (index !== -1 && index < firstIndex) {
      firstIndex = index;
      firstNumber = number.value;
    }

    index = line.lastIndexOf(number.string);
    if (index !== -1 && index > secondIndex) {
      secondIndex = index;
      secondNumber = number.value;
    }
  });

  total += Number(String(firstNumber) + String(secondNumber));
});
console.log(total);
