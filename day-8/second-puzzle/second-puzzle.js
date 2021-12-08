const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const getCorrectCombination = (values) => {
    let possibleCombinations = [];
    let processedLetters = [];

    let digitOneLetters = values.find(v => v.length === 2).split('');
    for (let i = 0; i < digitOneLetters.length; i++) {
        let digit = digitOneLetters[i];
        if (i === 0) {
            let nextDigit = digitOneLetters[i + 1];
            possibleCombinations.push({ [digit]: 'c', [nextDigit]: 'f' });
        } else {
            let prevDigit = digitOneLetters[i - 1];
            possibleCombinations.push({ [digit]: 'c', [prevDigit]: 'f' });
        }

        processedLetters.push(digit);
    }

    let digitSevenLetters = values.find(v => v.length === 3).split('').filter(l => !processedLetters.includes(l));
    for (let i = 0; i < digitSevenLetters.length; i++) {
        let digit = digitSevenLetters[i];
        for (let j = 0; j < possibleCombinations.length; j++) {
            possibleCombinations[j][digit] = 'a';
        }

        processedLetters.push(digit);
    }

    let combinationsLength = possibleCombinations.length;
    for (let i = 0; i < combinationsLength; i++) {
        possibleCombinations.push({...possibleCombinations[i]});
    }

    let digitFourLetters = values.find(v => v.length === 4).split('').filter(l => !processedLetters.includes(l));
    for (let i = 0; i < digitFourLetters.length; i++) {
        let digit = digitFourLetters[i];
        if (i === 0) {
            let nextDigit = digitFourLetters[i + 1];
            for (let j = 0; j < possibleCombinations.length / 2; j++) {
                possibleCombinations[j][digit] = 'b';
                possibleCombinations[j][nextDigit] = 'd';    
            }
        } else {
            let prevDigit = digitFourLetters[i - 1];
            for (let j = possibleCombinations.length / 2; j < possibleCombinations.length; j++) {
                possibleCombinations[j][digit] = 'b';
                possibleCombinations[j][prevDigit] = 'd';
            }
        }

        processedLetters.push(digit);
    }
    
    combinationsLength = possibleCombinations.length;
    for (let i = 0; i < combinationsLength; i++) {
        possibleCombinations.push({...possibleCombinations[i]});
    }

    let digitEightLetters = values.find(v => v.length === 7).split('').filter(l => !processedLetters.includes(l));
    for (let i = 0; i < digitEightLetters.length; i++) {
        let digit = digitEightLetters[i];
        if (i === 0) {
            let nextDigit = digitEightLetters[i + 1];
            for (let j = 0; j < possibleCombinations.length / 2; j++) {
                possibleCombinations[j][digit] = 'e';
                possibleCombinations[j][nextDigit] = 'g';    
            }
        } else {
            let prevDigit = digitEightLetters[i - 1];
            for (let j = possibleCombinations.length / 2; j < possibleCombinations.length; j++) {
                possibleCombinations[j][digit] = 'e';
                possibleCombinations[j][prevDigit] = 'g';
            }
        }

        processedLetters.push(digit);
    }

    let digitsToValidate = values.filter(v => v.length === 5 || v.length === 6);
    let digitsTable = ['abcefg', 'acdeg', 'acdfg', 'abdfg', 'abdefg', 'abcdfg'];
    let found = true;
    let correctCombination;

    for (let i = 0; i < possibleCombinations.length; i++) {
        found = true;
        let currentCombination = possibleCombinations[i];

        for (let j = 0; j < digitsToValidate.length; j++) {
            let digit = digitsToValidate[j];
            let correctedDigit = [];

            for (let k = 0; k < digit.length; k++) {
                correctedDigit.push(currentCombination[digit[k]]);
            }

            let sortedDigit = correctedDigit.sort().join('');
            if (!digitsTable.includes(sortedDigit)) {
                found = false;
                break;
            }
        }

        if (found) {
            correctCombination = currentCombination;
            break;
        }
    }

    return correctCombination;
};

const getOutputSum = (input) => {
    let sum = 0;
    let digitsTable = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];

    for (let i = 0; i < input.length; i++) {
        let currentLine = input[i];
        let lineParts = currentLine.split(' | ');
        let configPart = lineParts[0].split(' ');
        let outputPart = lineParts[1].split(' ');

        let combination = getCorrectCombination(configPart);
        let number = '';

        for (let i = 0; i < outputPart.length; i++) {
            let currentDigit = outputPart[i];
            let correctedDigit = [];

            for (let j = 0; j < currentDigit.length; j++) {
                correctedDigit.push(combination[currentDigit[j]]);
            }

            let sortedDigit = correctedDigit.sort().join('');
            let value = digitsTable.indexOf(sortedDigit);
            number += value;
        }

        sum += parseInt(number);
    }

    return sum;
};

const outputSum = getOutputSum(input);
console.log(outputSum);