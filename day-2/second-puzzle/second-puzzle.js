const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const getSubmarineFinalPosition = (input) => {
    let horizontalFinalPosition = 0;
    let finalDepth = 0;
    let aim = 0;

    for (let i = 0; i < input.length; i++) {
        let currentInstruction = input[i];
        if (currentInstruction.startsWith('forward')) {
            let value = parseInt(currentInstruction.replace(/forward /g, ''));
            horizontalFinalPosition += value;
            finalDepth += (aim * value);
        } else {
            if (currentInstruction.startsWith('up')) {
                let value = parseInt(currentInstruction.replace(/up /g, ''));
                aim -= value;
            } else {
                let value = parseInt(currentInstruction.replace(/down /g, ''));
                aim += value;
            }
        }
    }

    return [horizontalFinalPosition, finalDepth];
}

const submarineFinalPosition = getSubmarineFinalPosition(input);
console.log(submarineFinalPosition[0] * submarineFinalPosition[1]);