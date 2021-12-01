const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const getSlidingWindowSumIncreaseCount = (input) => {
    let increaseCount = 0;
    let previousSum = Number.MAX_VALUE;
    for (let i = 0; i + 2 < input.length; i++) {
        let firstElement = parseInt(input[i]);
        let secondElement = parseInt(input[i + 1]);
        let thirdElement = parseInt(input[i + 2]);
        let currentSum = firstElement + secondElement + thirdElement;

        if (currentSum > previousSum) {
            increaseCount++;
        }

        previousSum = currentSum;
    }

    return increaseCount;
}

const slidingWindowIncreaseCount = getSlidingWindowSumIncreaseCount(input);
console.log(slidingWindowIncreaseCount);