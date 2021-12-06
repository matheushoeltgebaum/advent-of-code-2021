const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const calculateLanternFish = (input) => {
    let lanternFishes = input[0].split(',').map(fish => parseInt(fish));
    let fishDays = new Array(9).fill(0);
    for (let i = 0; i < lanternFishes.length; i++) {
        fishDays[lanternFishes[i]]++;
    }

    for (let i = 0; i < 256; i++) {
        let parentFishes = fishDays.shift();
        fishDays = [...fishDays, parentFishes];
        fishDays[6] += parentFishes;
    }

    return fishDays.reduce((prevValue, curValue) => prevValue + curValue);
};

const lanternFishes = calculateLanternFish(input);
console.log(lanternFishes);