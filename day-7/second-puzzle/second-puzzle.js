const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8');

const calculateFuelConsumption = (positions) => {
    let leastFuelConsumption = Number.MAX_VALUE;
    let maxPosition = Math.max(...positions.map(p => parseInt(p)));

    for (let i = 0; i < maxPosition; i++) {
        let current = i;
        let fuelConsumption = 0;

        for (let j = 0; j < positions.length; j++) {
            let other = parseInt(positions[j]);
            let diff = Math.abs(current - other);
            let currentFuelValue = 0;
            for (let k = diff; k > 0; k--) {
                currentFuelValue += k;
            }

            fuelConsumption += currentFuelValue;
        }

        if (fuelConsumption < leastFuelConsumption) {
            leastFuelConsumption = fuelConsumption;
        }
    }

    return leastFuelConsumption;
};

const fuelConsumption = calculateFuelConsumption(input.split(','));
console.log(fuelConsumption);