const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n');

const calculateLanternFish = (input) => {
    let lanternFishes = input[0].split(',').map(fish => parseInt(fish));
    for (let i = 0; i < 80; i++) {
        let fishesAddCount = 0;

        for (let j = 0; j < lanternFishes.length; j++) {
            if (lanternFishes[j] === 0) {
                fishesAddCount++;
                lanternFishes[j] = 6;
            } else {
                lanternFishes[j]--;
            }
        }

        for (let j = 0; j < fishesAddCount; j++) {
            lanternFishes.push(8);
        }
    }

    return lanternFishes.length;
};

const lanternFishes = calculateLanternFish(input);
console.log(lanternFishes);