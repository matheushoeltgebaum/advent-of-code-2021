const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n');

const calculateGammaAndEpsilonRate = (input) => {
    let positionValues = [];
    let inputLength = input[0].length;
    for (let i = 0; i < inputLength; i++) {
        positionValues.push({ zeroCount: 0, oneCount: 0 });
    }

    for (let i = 0; i < input.length; i++) {
        let currentValue = input[i];
        for (let j = 0; j < currentValue.length; j++) {
            let positionValue = parseInt(currentValue[j]);
            if (positionValue === 0) {
                positionValues[j].zeroCount++;
            } else {
                positionValues[j].oneCount++;
            }
        }
    }

    let gammaRate = 0;
    let epsilonRate = 0;

    for (let i = 0; i < positionValues.length; i++) {
        let currentPositionValue = positionValues[positionValues.length - 1 - i];
        if (currentPositionValue.zeroCount > currentPositionValue.oneCount) {
            gammaRate += 0;
            epsilonRate += 2 ** i;
        } else {
            gammaRate += 2 ** i;
            epsilonRate += 0;
        }
    }

    return [gammaRate, epsilonRate];
}

const gammaAndEpsilonRate = calculateGammaAndEpsilonRate(input);
console.log(gammaAndEpsilonRate[0] * gammaAndEpsilonRate[1]);