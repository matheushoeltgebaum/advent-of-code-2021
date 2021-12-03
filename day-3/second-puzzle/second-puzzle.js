const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const convertBinaryToDecimal = (value) => {
    let decimalValue = 0;

    for (let i = 0; i < value.length; i++) {
        let currentPositionValue = parseInt(value[value.length - 1 - i]);
        if (currentPositionValue === 1) {
            decimalValue += 2 ** i;
        }
    }

    return decimalValue;
}

const findOxygenRate = (input) => {
    let inputLength = input[0].length;
    let validValues = input;

    for (let i = 0; i < inputLength; i++) {
        let currentPositionValue = { zeroCount: 0, oneCount: 0 };

        for (let j = 0; j < validValues.length; j++) {
            let currentValue = validValues[j];
            let positionValue = parseInt(currentValue[i]);
            if (positionValue === 0) {
                currentPositionValue.zeroCount++;
            } else {
                currentPositionValue.oneCount++;
            }
        }

        if (currentPositionValue.zeroCount > currentPositionValue.oneCount) {
            validValues = validValues.filter(value => parseInt(value[i]) === 0);
        } else {
            validValues = validValues.filter(value => parseInt(value[i]) === 1);
        }
        
        if (validValues.length === 1) {
            break;
        }
    }

    return convertBinaryToDecimal(validValues[0]);
}

const findCO2Rate = (input) => {
    let inputLength = input[0].length;
    let validValues = input;

    for (let i = 0; i < inputLength; i++) {
        let currentPositionValue = { zeroCount: 0, oneCount: 0 };

        for (let j = 0; j < validValues.length; j++) {
            let currentValue = validValues[j];
            let positionValue = parseInt(currentValue[i]);
            if (positionValue === 0) {
                currentPositionValue.zeroCount++;
            } else {
                currentPositionValue.oneCount++;
            }
        }

        if (currentPositionValue.zeroCount <= currentPositionValue.oneCount) {
            validValues = validValues.filter(value => parseInt(value[i]) === 0);
        } else {
            validValues = validValues.filter(value => parseInt(value[i]) === 1);
        }
        
        if (validValues.length === 1) {
            break;
        }
    }

    return convertBinaryToDecimal(validValues[0]);
}

const oxygenRate = findOxygenRate(input);
const co2Rate = findCO2Rate(input);

console.log(oxygenRate * co2Rate);