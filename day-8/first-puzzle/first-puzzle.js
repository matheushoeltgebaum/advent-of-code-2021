const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n');

const countUniqueDigitOutputs = (input) => {
    let count = 0;
    let validDisplayCounts = [2, 3, 4, 7];

    for (let i = 0; i < input.length; i++) {
        let currentLine = input[i];
        let outputPart = currentLine.split(' | ')[1];
        let values = outputPart.split(' ');
        count += values.filter(v => validDisplayCounts.includes(v.length)).length;
    }

    return count;
};

const count = countUniqueDigitOutputs(input);
console.log(count);