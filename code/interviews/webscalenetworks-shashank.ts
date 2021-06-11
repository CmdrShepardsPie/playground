// Take a list of numbers, return number that is more frequently occurring

function mostCommon(numbers: number[]) {
  const numberCount: { [key: number]: number | undefined } = {};
  const largestCount: { number: number, count: number } = { number: 0, count: 0 };

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (numberCount[num] === undefined) {
      numberCount[num] = 0;
    }
    numberCount[num]! += 1;
    if (numberCount[num]! > largestCount.count! ||
      (numberCount[num] === largestCount.count && num > largestCount.number)) {
      largestCount.number = num;
      largestCount.count = numberCount[num]!;
    }
  }
  return largestCount.number;
}

const countMe = [1, 3, 2, 1, 5, 5, 5, 1, 1];

console.log('Most common is', mostCommon(countMe));

