const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n');

const getDepthIncreaseCount = (input) => {
    let increaseCount = 0;
    let previousDepth = Number.MAX_VALUE;
    for (let i = 0; i < input.length; i++) {
        let depth = parseInt(input[i]);
        if (depth > previousDepth) {
            increaseCount++;
        }

        previousDepth = depth;
    }

    return increaseCount;
}

const depthIncreaseCount = getDepthIncreaseCount(input);
console.log(depthIncreaseCount);