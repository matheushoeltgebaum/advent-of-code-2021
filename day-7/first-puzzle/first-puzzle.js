const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8');

const calculateFuelConsumption = (positions) => {
    let calculatedPositions = [];
    let leastFuelConsumption = Number.MAX_VALUE;

    for (let i = 0; i < positions.length; i++) {
        let current = positions[i];

        if (!calculatedPositions.find(p => p === current)) {
            let fuelConsumption = 0;

            for (let j = 0; j < positions.length; j++) {
                let other = positions[j];
                fuelConsumption += Math.abs(current - other);
            }

            calculatedPositions.push(current);
            if (fuelConsumption < leastFuelConsumption) {
                leastFuelConsumption = fuelConsumption;
            }
        }
    }

    return leastFuelConsumption;
};

const fuelConsumption = calculateFuelConsumption(input.split(','));
console.log(fuelConsumption);